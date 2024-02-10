export function ChatSplit({
    leftPanel,
    rightPanel,
    leftPanelOnTop = false,
    isMobile = false
}){
    /**
     * Displayes two panels side by side on desktop
     * and stacked on mobile
     */
    return <div className="flex flex-row">
        <div className={`${isMobile ? (leftPanelOnTop ? "w-100": "w-0"): 'w-1/3'}`}>
            {leftPanel}
        </div>
        <div className={`${isMobile ? (leftPanelOnTop ? "w-0" : "w-100") : 'w-2/3'}`}>
            {rightPanel}
        </div>
    </div>
}