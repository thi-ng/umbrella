import { SYSTEM, pickRandom } from '@thi.ng/random'
import { downloadCanvas, canvasRecorder } from '@thi.ng/dl-asset'
import { group, text, rect } from '@thi.ng/geom'
import { draw } from '@thi.ng/hiccup-canvas'
import { div, button } from "@thi.ng/hiccup-html";
import { $compile } from "@thi.ng/rdom";

import {type AlterDefinition, type State} from './api'
import { palettes } from './palettes'
import { sentences} from './sentences'
import { symbols } from './symbols'

let state : State

const { floor } = Math,
    // Where canvas will be inserted
    root = document.getElementById('app'),
    // Choose a random sentence at launch if you refresh, it mights change
    sentence = pickRandom(sentences),
    // Same thing for symbols
    symbol = pickRandom(symbols),
    // Again but for color
    palette = pickRandom(palettes),
    // Detect mobile screen to upscale the canvas
    dpr = window.devicePixelRatio || 1,
    // Initialize a canvas to send to hiccup-canvas
    canvas = document.createElement('canvas'),
    // UI
    ui = document.createElement('div'),
    fps = 12,
    // initialize the recorder
    recorder = canvasRecorder(canvas, 'undetermined-type-grid', { fps }),
    ctx = canvas.getContext('2d'),
    doUpdate = true

let timer = 0,
    frame = 0,
    // A list of characters from which the program will draw at each loop
    chars = [] as string[],
    // Same thing but for color
    colors = [] as string[],
    // An object that is updated with each loop, allowing you to define a change to the grid
    alterDef: AlterDefinition = { 
        dir: true, 
        sel: 'x',
        x: 1,
        y: -1,
        char: '|',
        color: 'white' 
    },
    // Loop count used to trigger change
    loop = 0, 
    // A boolean to ensures that an alteration has already been applied before creating a new one
    altering = false,
    recording = false

canvas.width = window.innerWidth * dpr
canvas.height = (window.innerHeight-50) * dpr
canvas.captureStream()

// A function for updating the grid, pushing in new elements 
// and removing excess ones 
// (the grid must always have the same number of characters)
const alter = (def: AlterDefinition) => {
    if (altering) return
    const {dir, x, y, char, color} = def
    const letter = char.length > 1 ? char[loop % char.length] : char
    const { cols, rows } = state
    altering = true
    if (x >= 0) {
        if (dir) {
            // push top
            chars.splice(x * rows, 0, letter)
            chars.splice(x * rows + rows, 1)
            colors.splice(x * rows, 0, color)
            colors.splice(x * rows + rows, 1)
        } else {
            // push bottom
            chars.splice(x * rows + rows, 0, letter)
            chars.splice(x * rows, 1)
            colors.splice(x * rows + rows, 0, color)
            colors.splice(x * rows, 1)
        }
    } else if (y >= 0) {
        if (dir) {
            // push left
            for (let x = cols; x >= 0; x--) {
                chars[x * rows + y] = chars[(x - 1) * rows + y]
                colors[x * rows + y] = colors[(x - 1) * rows + y]
            }
            chars[y] = letter
            colors[y] = color
        } else {
            // push right
            for (let x = 0; x < cols; x++) {
                chars[x * rows + y] = chars[(x + 1) * rows + y]
                colors[x * rows + y] = colors[(x + 1) * rows + y]
            }
            chars[rows * (cols - 1) + y] = letter
            colors[rows * (cols - 1) + y] = color
        }
    }
    // remove elements if array is larger than needed
    chars.splice(cols * rows, chars.length - cols * rows)
    altering = false
}

// Kind of p5 setup, setting constant and launch the first loop
const init = () => {
    cancelAnimationFrame(timer)
    // Define the grid 
    const margin = SYSTEM.minmaxInt(20, 100),
        cellSize = SYSTEM.minmaxInt(24, 72),
        bounds = [canvas.width - margin * 2, canvas.height - margin * 2],
        cols = floor(bounds[0] / cellSize),
        rows = floor(bounds[1] / cellSize),
        remains = [bounds[0] - cols * cellSize, bounds[1] - rows * cellSize]

    // Empty the two arrays (in case they are already set) 
    chars = []
    colors = []
    // Fill two arrays (chars & cols) to initialize the grid
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            chars.push(sentence[(x * rows * y) % sentence.length])
            colors.push('white')
        }
    }

    // Let's define the animation constants
    state = {
        cellSize,
        cols,
        rows,
        margin: remains.map((v) => v / 2 + margin)
    }
    update()
}

// draw loop
const update = () => {
    const { cellSize, cols, rows, margin } = state

    // You can also record the sketch programatically,
    // when a specific number of frame is reached stop the recorder
    if (loop === fps * 120) recorder.stop()
    
    // trigger change at each interval 
    if (loop % 600 === 0) {
        alterDef.char = sentence.join()
        alterDef.color = 'white'
    }

    if (loop % 250 === 0) {
        alterDef.sel = alterDef.sel === 'x' ? 'y' : 'x'
        alterDef.color = pickRandom(palette)
    }

    if (loop % 400 === 0) {
        if (SYSTEM.float() > 0.5) {
            alterDef.char = pickRandom(symbol)
            alterDef.color = pickRandom(palette)
        } else {
            if (symbol.includes(alterDef.char) || sentence.join() === alterDef.char) {
                alterDef.char = SYSTEM.float() > 0.5 ? '_' : '|'
            } else {
                alterDef.char = alterDef.char === '_' ? '|' : '_'
            }
        }
    }
    if (loop % 450 === 0 && SYSTEM.float() > 0.5) {
        alterDef.dir = !alterDef.dir
        alterDef.color = pickRandom(palette)
    }
    
    loop++
    alterDef.x = alterDef.sel === 'x' ? SYSTEM.minmaxInt(0, cols) : -1,
    alterDef.y = alterDef.sel === 'y' ? SYSTEM.minmaxInt(0, rows) : -1,
        
    alter(alterDef)

    // Draw the array of chars
    const textTable = []
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            textTable.push(
                text(
                    [
                        margin[0] + cellSize * x + cellSize * 0.5,
                        margin[1] + cellSize * y + cellSize * 0.5
                    ],
                    chars[x * rows + y],
                    { fill: colors[x * rows + y] }
                )
            )
        }
    }
    ctx !== null && draw(
        ctx,
        group({}, [
            rect([canvas.width, canvas.height], { fill: '#111' }),
            group(
                {
                    font: `${cellSize}px monospace`,
                    align: 'center',
                    baseline: 'middle'
                },
                textTable
            )
        ])
    )
    frame++
    doUpdate && (timer = requestAnimationFrame(update))
}

root?.appendChild(canvas)
root?.appendChild(ui)
init()


root !== null && $compile(
    div(
        null,
        button({ 
            title: 'Record',
            onclick: () => {
                recorder.start()
                console.log('%c Record started ', 'background: tomato; color: white')
            }
        }, "⏺️ Record"),
        button({
            title: 'Stop',
            onclick: () => {
                recorder.stop()
                console.log('%c Record stopped ', 'background: limegreen; color: black')
            },
        },
        "⏹️ Stop and download"
        )
    )
).mount(ui)

window.onresize = () => {
    canvas.width = window.innerWidth * dpr
    canvas.height = (window.innerHeight - 50) * dpr
    init()
}