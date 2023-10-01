// Each random element (chosen when the program is launched) 
// is saved here, so that all these choices can be displayed
// when debugging the program or saving it 
// (but this is not the case here).
export interface State {
    cellSize: number
    cols: number
    rows: number
    margin: number[]
}

// An object that defines the changes made in each loop
export interface AlterDefinition {
    dir: boolean // go forward or backward
    sel: 'x' | 'y' // axis of the alteration
    x: number // how many time box to fill on x (-1 none) 
    y: number // same for y
    char: string // the item to push on the grid
    color: string // the color applyed to the char
}