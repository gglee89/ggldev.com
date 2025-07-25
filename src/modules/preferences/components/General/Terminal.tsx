interface TerminalProps {
    title: string
    text: React.ReactNode
}

const Terminal: React.FC<TerminalProps> = ({ title, text }) => {
    return (
        <div className="flex flex-col text-sm">
            <h5 className="font-bold text-lg text-secondary-foreground">
                {title}
            </h5>
            <p className="bg-stone-800 px-1 text-stone-200">{text}</p>
        </div>
    )
}

export default Terminal
