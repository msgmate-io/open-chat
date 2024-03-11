export default function CenterDiv({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`flex justify-center content-center items-center w-screen ${className}`}>
            {children}
        </div>
    );
}
