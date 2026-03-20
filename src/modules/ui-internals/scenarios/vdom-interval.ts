import type { Scenario } from '../types'

const vdomPreview = `[["input", name, handle], ["div", "Hello, " + name + "!"], ["div", "Great job"]]`

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
    frames: [
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
                {
                    id: 'timer-1',
                    delayMs: 15,
                    callback: 'updateDOM',
                    active: true,
                },
            ],
            taskQueue: [],
            microtaskQueue: [],
            dom: { nodes: [{ tag: 'body', summary: 'empty' }] },
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
            webApis: [
                {
                    id: 'timer-1',
                    delayMs: 15,
                    callback: 'updateDOM',
                    active: true,
                },
            ],
            taskQueue: [{ label: 'updateDOM (from timer)' }],
            microtaskQueue: [],
            dom: { nodes: [{ tag: 'body', summary: 'empty' }] },
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
            webApis: [
                {
                    id: 'timer-1',
                    delayMs: 15,
                    callback: 'updateDOM',
                    active: true,
                },
            ],
            taskQueue: [],
            microtaskQueue: [],
            dom: { nodes: [{ tag: 'body', summary: 'empty' }] },
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
            webApis: [
                {
                    id: 'timer-1',
                    delayMs: 15,
                    callback: 'updateDOM',
                    active: true,
                },
            ],
            taskQueue: [],
            microtaskQueue: [],
            dom: { nodes: [{ tag: 'body', summary: 'empty' }] },
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
            webApis: [
                {
                    id: 'timer-1',
                    delayMs: 15,
                    callback: 'updateDOM',
                    active: true,
                },
            ],
            taskQueue: [],
            microtaskQueue: [],
            dom: { nodes: [{ tag: 'body', summary: 'empty' }] },
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
            webApis: [
                {
                    id: 'timer-1',
                    delayMs: 15,
                    callback: 'updateDOM',
                    active: true,
                },
            ],
            taskQueue: [],
            microtaskQueue: [],
            dom: { nodes: [{ tag: 'body', summary: 'empty' }] },
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
            webApis: [
                {
                    id: 'timer-1',
                    delayMs: 15,
                    callback: 'updateDOM',
                    active: true,
                },
            ],
            taskQueue: [],
            microtaskQueue: [],
            dom: { nodes: [{ tag: 'body', summary: 'empty' }] },
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
            webApis: [
                {
                    id: 'timer-1',
                    delayMs: 15,
                    callback: 'updateDOM',
                    active: true,
                },
            ],
            taskQueue: [],
            microtaskQueue: [],
            dom: { nodes: [{ tag: 'body', summary: 'empty' }] },
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
            webApis: [
                {
                    id: 'timer-1',
                    delayMs: 15,
                    callback: 'updateDOM',
                    active: true,
                },
            ],
            taskQueue: [],
            microtaskQueue: [],
            dom: { nodes: [{ tag: 'body', summary: 'empty' }] },
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
            webApis: [
                {
                    id: 'timer-1',
                    delayMs: 15,
                    callback: 'updateDOM',
                    active: true,
                },
            ],
            taskQueue: [],
            microtaskQueue: [],
            dom: { nodes: [{ tag: 'body', summary: 'empty' }] },
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
            webApis: [
                {
                    id: 'timer-1',
                    delayMs: 15,
                    callback: 'updateDOM',
                    active: true,
                },
            ],
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
            webApis: [
                {
                    id: 'timer-1',
                    delayMs: 15,
                    callback: 'updateDOM',
                    active: true,
                },
            ],
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
            webApis: [
                {
                    id: 'timer-1',
                    delayMs: 15,
                    callback: 'updateDOM',
                    active: true,
                },
            ],
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
        },
    ],
}
