import React from 'react'

const TABS = ['About', 'Currently...', 'So far'] as const

const PROMPTS: Record<typeof TABS[number], string> = {
    'About': '$ ',
    'Currently...': '$ ',
    'So far': '$ ',
}

type CommandEntry = { prompt: string; value: string }

const TerminalWindow = ({
    children,
    prompt,
    inputValue,
    onInputChange,
    onInputSubmit,
    onTerminalClick,
    inputRef,
    commandHistory,
}: {
    children: React.ReactNode
    prompt: string
    inputValue: string
    onInputChange: (value: string) => void
    onInputSubmit: () => void
    onTerminalClick: () => void
    inputRef: React.RefObject<HTMLInputElement>
    commandHistory: CommandEntry[]
}) => {
    return (
        <div className="flex flex-1 min-h-0 w-full flex-col bg-black rounded-b-lg overflow-hidden shadow-lg border border-t-0 border-white/10">
            <div
                className="flex flex-1 min-h-0 flex-col overflow-hidden p-4 py-3 cursor-text"
                onClick={onTerminalClick}
            >
                <div className="flex-1 min-h-0 overflow-y-auto">
                    <code className="block w-full text-left font-mono text-[0.8rem] leading-relaxed text-gray-200 whitespace-pre-wrap break-words">
                        {children}
                    </code>
                    {commandHistory.map((cmd, i) => (
                        <div className="flex flex-col text-left">
                            <code key={i} className="block w-full text-left font-mono text-[0.8rem] leading-relaxed text-gray-200 whitespace-pre-wrap break-words">
                                <span className="text-[var(--main-color)]">{cmd.prompt}</span>
                                <span className="break-all">{cmd.value}</span>
                            </code>
                            <code className="text-gray-400 pl-4">Command not found</code>
                        </div>
                    ))}
                </div>
                <div className="relative flex items-center gap-0 pt-1 font-mono text-[0.8rem] leading-relaxed text-gray-200 shrink-0">
                    <span className="text-[var(--main-color)] shrink-0 leading-[1.5]">{prompt}</span>
                    <span className={`${inputValue.length > 0 ? 'min-w-[1ch]' : ''} break-all ml-2 leading-[1.5]`}>{inputValue}</span>
                    <span className="inline-block w-[2px] h-[1em] shrink-0 self-center bg-[var(--main-color)] animate-pulse ml-0.5" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => onInputChange(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                onInputSubmit()
                            }
                        }}
                        className="absolute inset-0 cursor-text opacity-0 w-full"
                        aria-label="Terminal input"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck={false}
                    />
                </div>
            </div>
        </div>
    )
}

const General = () => {
    const [activeTab, setActiveTab] = React.useState<typeof TABS[number]>('About')
    const [inputValue, setInputValue] = React.useState('')
    const [commandHistoryByTab, setCommandHistoryByTab] = React.useState<
        Record<typeof TABS[number], CommandEntry[]>
    >({
        'About': [],
        'Currently...': [],
        'So far': [],
    })
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleTerminalClick = React.useCallback(() => {
        inputRef.current?.focus()
    }, [])

    const handleInputSubmit = React.useCallback(() => {
        setCommandHistoryByTab((prev) => ({
            ...prev,
            [activeTab]: [
                ...prev[activeTab],
                { prompt: PROMPTS[activeTab], value: inputValue },
            ],
        }))
        setInputValue('')
    }, [activeTab, inputValue])

    return (
        <div className="flex flex-1 min-h-0 flex-col items-start gap-0 p-4 text-sm">
            {/* Tab bar */}
            <div className="flex gap-0 rounded-t-lg overflow-hidden border border-b-0 border-white/10 bg-gradient-to-b from-[#3a3a3a] to-[#2d2d2d]">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 font-sans text-xs transition-colors ${activeTab === tab
                            ? 'bg-black/50 text-[var(--main-color)] border-b-2 border-[var(--main-color)] -mb-px'
                            : 'text-gray-400 hover:text-gray-200 hover:bg-black/30'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <TerminalWindow
                prompt={PROMPTS[activeTab]}
                inputValue={inputValue}
                onInputChange={setInputValue}
                onInputSubmit={handleInputSubmit}
                onTerminalClick={handleTerminalClick}
                inputRef={inputRef}
                commandHistory={commandHistoryByTab[activeTab]}
            >
                {activeTab === 'About' && (
                    <>
                        <span className="text-[var(--main-color)] block mb-1"># giwoogustavolee @ Giwoo-MacBook-Pro in ~</span>
                        <span className="text-[var(--main-color)] mr-1">$ [What do I do]</span>I&#39;m overseeing full application
                        release cycles involving: TypeScript, React, Redux,
                        Underscore/Lodash, Jest / Mocha / Jasmine / Sinon, Handlebars,
                        Webpack, Node.js, MongoDB, DynamoDB, AWS S3, AWS ECS, AWS EKS,
                        responsive, cross-browser compatibility, and mobile first
                        approaches. I developed apps that works in the financial,
                        management, entertainment, and healthcare industry mainly using
                        the MERN stack and other minor extensions such as Lambda, API
                        Gateway, AngularJS, WordPress, and SAP UI5. I love to create
                        applications that bring real impact to users.
                        <br />
                        <span className="text-[var(--main-color)] mr-1">$ [Code + Unit Testing === Good Quality Code]</span>I
                        believe JavaScript unit testing is important and that adding
                        quality controls to workflows (like ESLint & stylelint) helps
                        teams learn/grow as well as helps to ensure that websites/apps
                        work well across a myriad of browser, platforms, and devices.
                        <br />
                        <span className="text-[var(--main-color)] mr-1">$ [DRY w/ Design Patterns]</span>I believe that applying
                        design patterns and practices to the entire development stack
                        and operational processes helps big teams working on large
                        codebases to be able to secure, maintain and extend code.
                        <br />
                        <span className="text-[var(--main-color)] mr-1">$ [Mentor]</span>I enjoy mentoring others, setting
                        direction for best practices, digging into new tech, and
                        exploring ways to make B2C applications with better UX.
                    </>
                )}
                {activeTab === 'Currently...' && (
                    <>
                        <span className="text-[var(--main-color)] block mb-1"># giwoogustavolee @ Giwoo-MacBook-Pro in ~</span>
                        <span className="text-[var(--main-color)] mr-1">$</span>python
                        <br />
                        <span className="text-[var(--main-color)] block mb-1">Python 2.7.10 (default, Oct 6 2017, 22:29:07)</span>
                        <span className="block mb-1">
                            [GCC 4.2.1 Compatible Apple LLVM 9.0.0 (clang-900.0.31)] on darwin
                        </span>
                        <span className="block mb-1">
                            Type &quot;help&quot;, &quot;copyright&quot;, &quot;credits&quot; or &quot;license&quot; for more information.
                        </span>
                        <span className="text-[var(--main-color)] mr-1">&gt;&gt;&gt; </span>
                        <span>import activities_doing from general</span>
                        <br />
                        <span className="text-[var(--main-color)] mr-1">&gt;&gt;&gt; </span>
                        <span>print(activities_doing.currently)</span>
                        <br />
                        <span className="block mb-1">
                            A Cloud Architect &amp; Web Development Enthusiast. Working as a Full Stack Developer.
                        </span>
                        <br />
                        <span className="text-[var(--main-color)] mr-1">$</span> echo &quot;This is not really a terminal (It&apos;s just HTML+CSS)&quot;
                    </>
                )}
                {activeTab === 'So far' && (
                    <>
                        <span className="text-[var(--main-color)] block mb-1"># giwoogustavolee @ Giwoo-MacBook-Pro in ~</span>
                        <span className="text-[var(--main-color)] block mb-1">$ [Web Development]</span> 8+ years advancing in the IT
                        industry. Shaped products as a Data Engineer with BI, with
                        Mainframes (batch processing), and Web/Mobile development.
                        Experienced in developing internal web platforms for the
                        entertainment and financial industries and also with B2C
                        customer facing applications. Actively contributed on UI/UX,
                        software specification, and project management in parallel with
                        web development.
                    </>
                )}
            </TerminalWindow>
        </div>
    )
}

export default General
