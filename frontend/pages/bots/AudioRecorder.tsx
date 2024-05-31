import { buildMessage } from "#open-chat-ui/atoms/WebsocketBridge";
import toWav from 'audiobuffer-to-wav';
import { useEffect, useRef, useState } from 'react';


export const AudioRecorder = ({
    intervalMs = 1000,
    sendMessage = (text) => { console.log("SEND", text) },
    chatId = "",
    recipientId = ""
}) => {
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

    const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    const startRecording = async () => {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = async () => {
            const audioBuffer = await audioContextRef.current.decodeAudioData(await new Response(new Blob(audioChunksRef.current)).arrayBuffer());
            const wavData = toWav(audioBuffer);
            const blob = new Blob([wavData], { type: 'audio/wav' });

            audioChunksRef.current = [];
            const url = URL.createObjectURL(blob);
            setAudioURLs((prev) => [...prev, url]);

            const base64EncodedAudio = await blobToBase64(blob);
            const sizeInMB = blob.size / (1024 * 1024);
            console.log(`Audio segment size: ${sizeInMB.toFixed(2)} MB`);
            sendMessage(buildMessage({
                chat_id: chatId,
                recipient_id: recipientId,
                text: `audio:${base64EncodedAudio}`
            }, 'partial_message'))
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

    const onStartRecording = () => {
        if (!isRecording) {
            sendMessage(buildMessage({
                chat_id: chatId,
                recipient_id: recipientId,
                text: `/start_audio_recording`
            }, 'send_message'))
        } else {
            sendMessage(buildMessage({
                chat_id: chatId,
                recipient_id: recipientId,
                text: `STOP`
            }, 'send_message'))
        }
        setIsRecording((prev) => !prev)
    }

    return (
        <div>
            <button onClick={onStartRecording}>
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