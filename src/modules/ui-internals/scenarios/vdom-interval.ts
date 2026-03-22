import type {
    CppDomSnapshot,
    CppMemorySnapshot,
    Frame,
    RenderedPreview,
    Scenario,
} from '../types'

const vdomPreview = `[["input", name, handle], ["div", "Hello, " + name + "!"], ["div", "Great job"]]`

const rpEmpty = (): RenderedPreview => ({
    bodyEmpty: true,
    inputValue: '',
    greeting: '',
    footer: '',
})

const rpPainted = (): RenderedPreview => ({
    bodyEmpty: false,
    inputValue: '',
    greeting: 'Hello, !',
    footer: 'Great job',
})

const memGlobals = (): CppMemorySnapshot => ({
    lines: [
        'V8 heap — global object: slots for name → string "", vDOM → undefined, elems → undefined.',
        'No JSObject wrappers for DOM nodes yet; only JS bindings.',
    ],
})

const memTimer = (): CppMemorySnapshot => ({
    lines: [
        'Browser timer host: repeating timer registered; callback ref → updateDOM (function object in V8).',
        'V8: global slots unchanged; timer bookkeeping lives in browser scheduler (outside JS heap).',
    ],
})

const memTask = (): CppMemorySnapshot => ({
    lines: [
        'Task record allocated in browser: run updateDOM once when queue drains.',
        'V8 idle; macrotask entry points to the same updateDOM closure.',
    ],
})

const memStack = (): CppMemorySnapshot => ({
    lines: [
        'V8: execution context for updateDOM on stack; synchronous work ahead.',
        'C++ DOM unchanged until replaceChildren — still body with no JS-inserted children.',
    ],
})

const memCreateVdom = (): CppMemorySnapshot => ({
    lines: [
        'V8: createVDOM allocates a new Array + inner arrays (virtual nodes) on the JS heap.',
        'Still no new C++ Element nodes — this is pure JavaScript data.',
    ],
})

const memVdomSet = (): CppMemorySnapshot => ({
    lines: [
        'V8: global slot vDOM updated to reference the virtual array.',
        'C++ DOM: unchanged (virtual layer only).',
    ],
})

const memConvert = (phase: string): CppMemorySnapshot => ({
    lines: [
        `V8: ${phase}`,
        'Each convert allocates a JS wrapper; WebIDL calls createElement → new C++ Element in WebCore.',
    ],
})

const memElems = (): CppMemorySnapshot => ({
    lines: [
        'V8: elems is a fixed array of three wrapper objects pointing at C++ nodes.',
        'C++: three elements exist but may not be attached to body yet.',
    ],
})

const memReplace = (): CppMemorySnapshot => ({
    lines: [
        'WebIDL: replaceChildren crosses into WebCore — C++ tree updated in one batch.',
        'Layout / style may schedule work; compositor paints after this task completes.',
    ],
})

const memIdle = (): CppMemorySnapshot => ({
    lines: [
        'V8 stack empty; timer still armed for next 15ms tick.',
        'C++ DOM retains body subtree until next replaceChildren.',
    ],
})

const memNextTick = (): CppMemorySnapshot => ({
    lines: [
        'Same pattern: timer queues another updateDOM macrotask.',
        'Naive demo rebuilds vDOM each tick; diffing would reduce C++ churn.',
    ],
})

const cppBodyEmpty = (): CppDomSnapshot => ({
    lines: [
        'browser::Document* document',
        '  HTMLBodyElement* body',
        '    (no children inserted from JS yet)',
    ],
})

const cppBodyFull = (): CppDomSnapshot => ({
    lines: [
        'browser::Document* document',
        '  HTMLBodyElement* body',
        '    ├─ HTMLInputElement*    (value + listener slots in C++)',
        '    ├─ HTMLDivElement*      #text "Hello, !"',
        '    └─ HTMLDivElement*      #text "Great job"',
    ],
})

const frames: Frame[] = [
    {
        caption:
            'Global code runs: declare name, vDOM, elems in the JS heap. Nothing is on the call stack yet.',
        highlightLines: [1],
        stack: [],
        heap: [
            { key: 'name', value: "''" },
            { key: 'vDOM', value: 'undefined' },
            { key: 'elems', value: 'undefined' },
        ],
        webApis: [],
        taskQueue: [],
        microtaskQueue: [],
        dom: { nodes: [{ tag: 'body', summary: 'empty (children not yet replaced)' }] },
        cppMemory: memGlobals(),
        cppDom: cppBodyEmpty(),
        renderedPreview: rpEmpty(),
    },
    {
        caption:
            'setInterval is invoked: register a repeating timer in Web APIs with callback updateDOM every 15ms.',
        highlightLines: [25],
        stack: [{ name: 'global', detail: 'setInterval(updateDOM, 15)' }],
        heap: [
            { key: 'name', value: "''" },
            { key: 'vDOM', value: 'undefined' },
            { key: 'elems', value: 'undefined' },
        ],
        webApis: [
            { id: 'timer-1', delayMs: 15, callback: 'updateDOM', active: true },
        ],
        taskQueue: [],
        microtaskQueue: [],
        dom: { nodes: [{ tag: 'body', summary: 'empty' }] },
        cppMemory: memTimer(),
        cppDom: cppBodyEmpty(),
        renderedPreview: rpEmpty(),
    },
    {
        caption:
            'Timer fires (first tick): the engine schedules one macrotask — run updateDOM — on the task queue.',
        highlightLines: [25],
        stack: [],
        heap: [
            { key: 'name', value: "''" },
            { key: 'vDOM', value: 'undefined' },
            { key: 'elems', value: 'undefined' },
        ],
        webApis: [{ id: 'timer-1', delayMs: 15, callback: 'updateDOM', active: true }],
        taskQueue: [{ label: 'updateDOM (from timer)' }],
        microtaskQueue: [],
        dom: { nodes: [{ tag: 'body', summary: 'empty' }] },
        cppMemory: memTask(),
        cppDom: cppBodyEmpty(),
        renderedPreview: rpEmpty(),
    },
    {
        caption:
            'Event loop takes the task: push updateDOM onto the call stack and start synchronous execution.',
        highlightLines: [11],
        stack: [{ name: 'updateDOM' }],
        heap: [
            { key: 'name', value: "''" },
            { key: 'vDOM', value: 'undefined' },
            { key: 'elems', value: 'undefined' },
        ],
        webApis: [{ id: 'timer-1', delayMs: 15, callback: 'updateDOM', active: true }],
        taskQueue: [],
        microtaskQueue: [],
        dom: { nodes: [{ tag: 'body', summary: 'empty' }] },
        cppMemory: memStack(),
        cppDom: cppBodyEmpty(),
        renderedPreview: rpEmpty(),
    },
    {
        caption: 'Call createVDOM from updateDOM: new stack frame; build the virtual description in JS.',
        highlightLines: [12],
        stack: [
            { name: 'updateDOM' },
            { name: 'createVDOM', detail: 'return vDOM array' },
        ],
        heap: [
            { key: 'name', value: "''" },
            { key: 'vDOM', value: 'undefined (not assigned yet)' },
            { key: 'elems', value: 'undefined' },
        ],
        webApis: [{ id: 'timer-1', delayMs: 15, callback: 'updateDOM', active: true }],
        taskQueue: [],
        microtaskQueue: [],
        dom: { nodes: [{ tag: 'body', summary: 'empty' }] },
        cppMemory: memCreateVdom(),
        cppDom: cppBodyEmpty(),
        renderedPreview: rpEmpty(),
    },
    {
        caption:
            'createVDOM returns: assign vDOM in the heap to the array of virtual nodes (input + two divs).',
        highlightLines: [3, 4, 5, 6, 7],
        stack: [{ name: 'updateDOM' }],
        heap: [
            { key: 'name', value: "''" },
            { key: 'vDOM', value: vdomPreview },
            { key: 'elems', value: 'undefined' },
        ],
        webApis: [{ id: 'timer-1', delayMs: 15, callback: 'updateDOM', active: true }],
        taskQueue: [],
        microtaskQueue: [],
        dom: { nodes: [{ tag: 'body', summary: 'empty' }] },
        cppMemory: memVdomSet(),
        cppDom: cppBodyEmpty(),
        renderedPreview: rpEmpty(),
    },
    {
        caption:
            'vDOM.map(convert): for each virtual node, synchronously call convert (first: input).',
        highlightLines: [13],
        stack: [
            { name: 'updateDOM' },
            { name: 'convert', detail: 'node ["input", …]' },
        ],
        heap: [
            { key: 'name', value: "''" },
            { key: 'vDOM', value: vdomPreview },
            { key: 'elems', value: 'mapping…' },
        ],
        webApis: [{ id: 'timer-1', delayMs: 15, callback: 'updateDOM', active: true }],
        taskQueue: [],
        microtaskQueue: [],
        dom: { nodes: [{ tag: 'body', summary: 'empty' }] },
        cppMemory: memConvert('convert → HTMLInputElement + bindings'),
        cppDom: {
            lines: [
                'browser::Document* document',
                '  HTMLBodyElement* body',
                '    (input element allocated in C++; not yet child of body)',
            ],
        },
        renderedPreview: rpEmpty(),
    },
    {
        caption:
            'Inside convert: createElement, set textContent/value/oninput, return a real DOM node (input).',
        highlightLines: [17, 18, 19, 20, 21, 22],
        stack: [
            { name: 'updateDOM' },
            { name: 'convert', detail: 'input' },
        ],
        heap: [
            { key: 'name', value: "''" },
            { key: 'vDOM', value: vdomPreview },
            { key: 'elems', value: 'mapping…' },
        ],
        webApis: [{ id: 'timer-1', delayMs: 15, callback: 'updateDOM', active: true }],
        taskQueue: [],
        microtaskQueue: [],
        dom: { nodes: [{ tag: 'body', summary: 'empty' }] },
        cppMemory: memConvert('oninput handler stored; C++ stores listener ref'),
        cppDom: {
            lines: [
                'browser::Document* document',
                '  HTMLBodyElement* body',
                '    (input: listener table updated in C++)',
            ],
        },
        renderedPreview: rpEmpty(),
    },
    {
        caption: 'map continues: convert second virtual node (greeting div).',
        highlightLines: [13],
        stack: [
            { name: 'updateDOM' },
            { name: 'convert', detail: 'div (Hello)' },
        ],
        heap: [
            { key: 'name', value: "''" },
            { key: 'vDOM', value: vdomPreview },
            { key: 'elems', value: 'mapping…' },
        ],
        webApis: [{ id: 'timer-1', delayMs: 15, callback: 'updateDOM', active: true }],
        taskQueue: [],
        microtaskQueue: [],
        dom: { nodes: [{ tag: 'body', summary: 'empty' }] },
        cppMemory: memConvert('second Element + text node allocation'),
        cppDom: cppBodyEmpty(),
        renderedPreview: rpEmpty(),
    },
    {
        caption: 'map continues: convert third virtual node (static div).',
        highlightLines: [13],
        stack: [
            { name: 'updateDOM' },
            { name: 'convert', detail: 'div (Great job)' },
        ],
        heap: [
            { key: 'name', value: "''" },
            { key: 'vDOM', value: vdomPreview },
            { key: 'elems', value: 'mapping…' },
        ],
        webApis: [{ id: 'timer-1', delayMs: 15, callback: 'updateDOM', active: true }],
        taskQueue: [],
        microtaskQueue: [],
        dom: { nodes: [{ tag: 'body', summary: 'empty' }] },
        cppMemory: memConvert('third Element + text node allocation'),
        cppDom: cppBodyEmpty(),
        renderedPreview: rpEmpty(),
    },
    {
        caption: 'map completes: elems is an array of three real DOM nodes in the heap.',
        highlightLines: [13],
        stack: [{ name: 'updateDOM' }],
        heap: [
            { key: 'name', value: "''" },
            { key: 'vDOM', value: vdomPreview },
            { key: 'elems', value: '[Element, Element, Element] (length 3)' },
        ],
        webApis: [{ id: 'timer-1', delayMs: 15, callback: 'updateDOM', active: true }],
        taskQueue: [],
        microtaskQueue: [],
        dom: { nodes: [{ tag: 'body', summary: 'empty' }] },
        cppMemory: memElems(),
        cppDom: {
            lines: [
                'browser::Document* document',
                '  HTMLBodyElement* body',
                '    (three elements exist; still detached until replaceChildren)',
            ],
        },
        renderedPreview: rpEmpty(),
    },
    {
        caption:
            'document.body.replaceChildren(...elems): bridge to the browser DOM tree (C++/WebIDL); body now shows input + divs.',
        highlightLines: [14],
        stack: [{ name: 'updateDOM', detail: 'replaceChildren' }],
        heap: [
            { key: 'name', value: "''" },
            { key: 'vDOM', value: vdomPreview },
            { key: 'elems', value: '[Element, Element, Element]' },
        ],
        webApis: [{ id: 'timer-1', delayMs: 15, callback: 'updateDOM', active: true }],
        taskQueue: [],
        microtaskQueue: [],
        dom: {
            operation: 'document.body.replaceChildren(...elems)',
            nodes: [
                { tag: 'input', summary: 'value "", oninput → handle' },
                { tag: 'div', summary: 'Hello, !' },
                { tag: 'div', summary: 'Great job' },
            ],
        },
        cppMemory: memReplace(),
        cppDom: cppBodyFull(),
        renderedPreview: rpPainted(),
    },
    {
        caption:
            'updateDOM finishes: pop stack. Task queue empty until the next timer tick (~15ms later).',
        highlightLines: [11, 15],
        stack: [],
        heap: [
            { key: 'name', value: "''" },
            { key: 'vDOM', value: vdomPreview },
            { key: 'elems', value: '[Element, Element, Element]' },
        ],
        webApis: [{ id: 'timer-1', delayMs: 15, callback: 'updateDOM', active: true }],
        taskQueue: [],
        microtaskQueue: [],
        dom: {
            operation: 'replaceChildren applied',
            nodes: [
                { tag: 'input', summary: 'value "", oninput → handle' },
                { tag: 'div', summary: 'Hello, !' },
                { tag: 'div', summary: 'Great job' },
            ],
        },
        cppMemory: memIdle(),
        cppDom: cppBodyFull(),
        renderedPreview: rpPainted(),
    },
    {
        caption:
            'Cycle repeats: every 15ms the timer queues updateDOM again; the whole tree is rebuilt (naive demo). In production, diffing avoids unnecessary DOM work.',
        highlightLines: [25],
        stack: [],
        heap: [
            { key: 'name', value: "''" },
            { key: 'vDOM', value: vdomPreview },
            { key: 'elems', value: '[Element, Element, Element]' },
        ],
        webApis: [{ id: 'timer-1', delayMs: 15, callback: 'updateDOM', active: true }],
        taskQueue: [{ label: 'updateDOM (next tick)' }],
        microtaskQueue: [],
        dom: {
            operation: 'replaceChildren applied',
            nodes: [
                { tag: 'input', summary: 'value "", oninput → handle' },
                { tag: 'div', summary: 'Hello, !' },
                { tag: 'div', summary: 'Great job' },
            ],
        },
        cppMemory: memNextTick(),
        cppDom: cppBodyFull(),
        renderedPreview: rpPainted(),
    },
]

export const vdomIntervalScenario: Scenario = {
    id: 'vdom-setinterval',
    title: 'Virtual DOM + setInterval',
    subtitle: 'Pedagogical model of the event loop (not live engine introspection)',
    intro:
        'JavaScript keeps data in the heap. The browser schedules timers in Web APIs; macrotasks land in the task queue. The call stack runs one synchronous chunk at a time. This walkthrough mirrors the whiteboard model from UI courses such as Frontend Masters’ Hard Parts of UI Development.',
    sourceLines: [
        "let name = ''; let vDOM; let elems",
        '',
        'function createVDOM (){',
        '  return [["input", name, handle],',
        '          ["div", `Hello, ${name}!`],',
        '          ["div", "Great job"]]',
        '}',
        '',
        'function handle (e){name = e.target.value}',
        '',
        'function updateDOM() {',
        '  vDOM = createVDOM()',
        '  elems = vDOM.map(convert)',
        '  document.body.replaceChildren(...elems)',
        '}',
        '',
        'function convert(node){',
        '  const elem = document.createElement(node[0])',
        '  elem.textContent = node[1]',
        '  elem.value = node[1]',
        '  elem.oninput = node[2]',
        '  return elem',
        '}',
        '',
        'setInterval(updateDOM, 15)',
    ],
    frames,
}
