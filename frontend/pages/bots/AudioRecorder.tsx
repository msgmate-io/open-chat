import toWav from 'audiobuffer-to-wav';
import { useEffect, useRef, useState } from 'react';

export const AudioRecorder = ({ intervalMs = 1000 }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioURLs, setAudioURLs] = useState([]);
    const [concatenatedAudioURL, setConcatenatedAudioURL] = useState(null);
    const audioContextRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const intervalIdRef = useRef(null);

    useEffect(() => {
        if (isRecording) {
            startRecording();
        } else {
            stopRecording();
        }

        return () => {
            stopRecording();
        };
    }, [isRecording]);

    const startRecording = async () => {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = async () => {
            const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            audioChunksRef.current = [];
            const url = URL.createObjectURL(blob);
            setAudioURLs((prev) => [...prev, url]);
        };

        mediaRecorder.start();

        intervalIdRef.current = setInterval(() => {
            mediaRecorder.stop();
            mediaRecorder.start();
        }, intervalMs);

        mediaRecorderRef.current = mediaRecorder;
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
        }
    };

    const concatenateAudio = async () => {
        const audioBuffers = await Promise.all(
            audioURLs.map(url => fetch(url).then(response => response.arrayBuffer()).then(data => audioContextRef.current.decodeAudioData(data)))
        );

        const numberOfChannels = Math.max(...audioBuffers.map(buffer => buffer.numberOfChannels));
        const length = audioBuffers.reduce((sum, buffer) => sum + buffer.length, 0);
        const sampleRate = audioBuffers[0].sampleRate;
        const concatenatedBuffer = audioContextRef.current.createBuffer(numberOfChannels, length, sampleRate);

        let offset = 0;
        for (const buffer of audioBuffers) {
            for (let channel = 0; channel < numberOfChannels; channel++) {
                concatenatedBuffer.getChannelData(channel).set(buffer.getChannelData(channel), offset);
            }
            offset += buffer.length;
        }

        const wavData = toWav(concatenatedBuffer);
        const blob = new Blob([wavData], { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setConcatenatedAudioURL(url);
    };

    return (
        <div>
            <button onClick={() => setIsRecording((prev) => !prev)}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            <div>
                {audioURLs.map((url, index) => (
                    <div key={index}>
                        <a href={url} download={`audio_segment_${index + 1}.wav`}>Download Segment {index + 1}</a>
                    </div>
                ))}
            </div>
            <button onClick={concatenateAudio} disabled={audioURLs.length === 0}>Download Concatenated Audio</button>
            {concatenatedAudioURL && (
                <div>
                    <a href={concatenatedAudioURL} download="concatenated_audio.wav">Download Concatenated Audio</a>
                </div>
            )}
        </div>
    );
};