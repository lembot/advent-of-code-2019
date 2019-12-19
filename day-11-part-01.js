class intcodeInterpreter {
  constructor(memory) {
    this.memory = memory.split(',').map(num => parseInt(num))
    this.modes = {first: 0, second: 0, third: 0}
    this.index = 0
    this.relativeBase = 0
    this.paused = false
    this.done = false
    this.input = []
    this.output = []
    this.operationParameters = []
    this.programLoop()
  }

  // Main program loop
  programLoop() {
    while (!this.paused && !this.done && this.memory[this.index] !== undefined) {
      let opcode = parseInt(this.memory[this.index].toString().split('').slice(-2).join(''))
      let [
        first = 0,
        second = 0,
        third = 0
       ] = this.memory[this.index].toString().split('').reverse().slice(2).map(num => parseInt(num))
      this.setModes(first, second, third)
      // Set the operation values
      switch (this.modes.first) {
        case 2:
          this.operationParameters[0] = this.memory[this.relativeBase + this.memory[this.index + 1]]
          break
        case 1:
          this.operationParameters[0] = this.memory[this.index + 1]
          break
        case 0:
          this.operationParameters[0] = this.memory[this.memory[this.index + 1]]
          break
        default:
          console.error(`Unknown mode: ${this.modes.first}`)
          break
      }
      switch (this.modes.second) {
        case 2:
          this.operationParameters[1] = this.memory[this.relativeBase + this.memory[this.index + 2]]
          break
        case 1:
          this.operationParameters[1] = this.memory[this.index + 2]
          break
        case 0:
          this.operationParameters[1] = this.memory[this.memory[this.index + 2]]
          break
        default:
          console.error(`Unknown mode: ${this.modes.second}`)
          break
      }
      switch (this.modes.third) {
        case 2:
          this.operationParameters[2] = this.relativeBase + this.memory[this.index + 3]
          break
        case 1:
          console.error(`Bad mode for insert: ${this.modes.third}. Defaulting to position mode.`)
          this.operationParameters[2] = this.memory[this.index + 3]
          break
        case 0:
          this.operationParameters[2] = this.memory[this.index + 3]
          break
        default:
          console.error(`Unknown mode: ${this.modes.third}`)
          break
      }
      // Day 9 - If accessing a num outside of assigned memory, default it to 0.
      this.operationParameters[0] = this.operationParameters[0] !== undefined
        ? this.operationParameters[0]
        : 0
      this.operationParameters[1] = this.operationParameters[1] !== undefined
        ? this.operationParameters[1]
        : 0
      this.operationParameters[2] = this.operationParameters[2] !== undefined
        ? this.operationParameters[2]
        : 0
      this.operations[opcode]()
    }
  }

  // Set the current index of the program loop
  setIndex(integer) {
    this.index = integer
  }

  // Set program loop modes
  setModes(first, second, third) {
    this.modes = {
      first,
      second,
      third
    }
  }

  // Increase or decrease the relative base by the amount provided
  adjustRelativeBase(integer) {
    this.relativeBase = this.relativeBase + integer
  }

  // Pause the program loop
  pause() {
    this.paused = true
  }
  
  // Unpause the program loop
  unpause() {
    if (!this.done) {
      this.paused = false
      this.programLoop()
    } else {
      console.error(`Program has finished.`)
    }
  }

  // Outside -> interpreter
  sendInput(data) {
    this.input.push(data)
    this.unpause()
  }

  // Interpreter -> output
  getOutput() {
    return this.output.splice(0, this.output.length)
  }

  // Get debug info
  getDebugInfo(){
    return {
      memory: this.memory,
      modes: this.modes,
      index: this.index,
      relativeBase: this.relativeBase,
      paused: this.paused,
      input: this.input,
      output: this.output,
      context: this
    }
  }
  
  operations = {
    // ADDITION
    1: () => {
      this.memory[this.operationParameters[2]] = this.operationParameters[0] + this.operationParameters[1]
      this.setIndex(this.index + 4)
    },
    // MULTIPLICATION
    2: () => {
      this.memory[this.operationParameters[2]] = this.operationParameters[0] * this.operationParameters[1]
      this.setIndex(this.index + 4)
    },
    // INSERT VALUE
    3: () => {
      switch (this.modes.first) {
        case 2:
          this.operationParameters[0] = this.relativeBase + this.memory[this.index + 1]
          break
        case 1:
          console.error(`Bad mode for insert: ${this.modes.first}. Defaulting to position mode.`)
          this.operationParameters[0] = this.memory[this.index + 1]
          break
        case 0:
          this.operationParameters[0] = this.memory[this.index + 1]
          break
        default:
          console.error(`Unknown mode: ${this.modes.first}`)
          break
      }
      // Day 9 - If accessing a num outside of assigned memory, default it to 0.
      this.operationParameters[0] = this.operationParameters[0] !== undefined
        ? this.operationParameters[0]
        : 0
      if (this.input.length !== 0) {
        this.memory[this.operationParameters[0]] = parseInt(this.input.splice(0, 1))
        this.setIndex(this.index + 2)
      } else {
        this.pause()
      }
    },
    // RETRIEVE VALUE
    4: () => {
      this.output.push(this.operationParameters[0])
      this.setIndex(this.index + 2)
    },
    // JUMP-IF-TRUE
    5: () => {
      let jump = this.operationParameters[0] !== 0
        ? this.operationParameters[1] - this.index
        : 3
      this.setIndex(this.index + jump)
    },
    // JUMP-IF-FALSE
    6: () => {
      let jump = this.operationParameters[0] === 0
        ? this.operationParameters[1] - this.index
        : 3
      this.setIndex(this.index + jump)
    },
    // LESS THAN
    7: () => {
      this.memory[this.operationParameters[2]] = this.operationParameters[0] < this.operationParameters[1]
        ? 1
        : 0
      this.setIndex(this.index + 4)
    },
    // EQUALS
    8: () => {
      this.memory[this.operationParameters[2]] = this.operationParameters[0] === this.operationParameters[1]
        ? 1
        : 0
      this.setIndex(this.index + 4)
    },
    // INCREASE RELATIVE BASE
    9: () => {
      this.relativeBase = this.relativeBase + this.operationParameters[0]
      this.setIndex(this.index + 2)
    },
    99: () => {
      console.log(`DONE!`)
      this.done = true
    }
  }
}

const painter = puzzleInput => {
  let grid = []
  let x = 0
  let y = 0
  let direction = 'up'
  let paintedPanels = new Set()

  let brain = new intcodeInterpreter(puzzleInput)

  while (!brain.done) {
    
    // Create places in the grid if they don't already exist
    if (grid[x] === undefined) {
      grid[x] = new Array()
    }
    if (grid[x][y] === undefined) {
      grid[x][y] = '.'
    }
    // Send current panel color to brain
    if (grid[x][y] === '.') {
      brain.sendInput(0)
    } else {
      brain.sendInput(1)
    }

    // Get the color to paint on the panel
    let colorToPaint = brain.output.splice(0, 1)[0]
    // Get the direction to turn
    let directionToTurn = brain.output.splice(0, 1)[0]

    // Paint the grid
    grid[x][y] = colorToPaint === 0
      ? '.'
      : '#'
    // Record the panel
    paintedPanels.add(`${x},${y}`)

    // Rotate
    if (directionToTurn === 0) {
      if (direction === 'up') {
        direction = 'left'
      } else if (direction === 'left') {
        direction = 'down'
      } else if (direction === 'down') {
        direction = 'right'
      } else {
        direction = 'up'
      }
    }
    if (directionToTurn === 1) {
      if (direction === 'up') {
        direction = 'right'
      } else if (direction === 'right') {
        direction = 'down'
      } else if (direction === 'down') {
        direction = 'left'
      } else {
        direction = 'up'
      }
    }

    // Step forward
    switch (direction) {
      case 'up':
        y++
        break
      case 'left':
        x--
        break
      case 'down':
        y--
        break
      case 'right':
        x++
        break
    }
  }
  console.log(paintedPanels.size)
  return grid
}

const puzzleInput = '3,8,1005,8,311,1106,0,11,0,0,0,104,1,104,0,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,102,1,8,28,1,1104,0,10,1006,0,71,2,1002,5,10,2,1008,5,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,0,10,4,10,102,1,8,66,3,8,1002,8,-1,10,101,1,10,10,4,10,108,1,8,10,4,10,102,1,8,87,1006,0,97,2,1002,6,10,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,102,1,8,116,1006,0,95,1,1009,10,10,3,8,102,-1,8,10,101,1,10,10,4,10,108,1,8,10,4,10,102,1,8,145,1,1002,19,10,2,1109,7,10,1006,0,18,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,1001,8,0,179,3,8,102,-1,8,10,101,1,10,10,4,10,108,0,8,10,4,10,102,1,8,200,1,1105,14,10,1,1109,14,10,2,1109,11,10,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,1,10,4,10,102,1,8,235,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,1002,8,1,257,2,101,9,10,3,8,1002,8,-1,10,101,1,10,10,4,10,108,0,8,10,4,10,101,0,8,282,2,1109,19,10,1,105,0,10,101,1,9,9,1007,9,1033,10,1005,10,15,99,109,633,104,0,104,1,21102,937268368140,1,1,21102,328,1,0,1106,0,432,21102,1,932700599052,1,21101,0,339,0,1105,1,432,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21101,0,209421601831,1,21102,1,386,0,1106,0,432,21102,235173604443,1,1,21102,1,397,0,1106,0,432,3,10,104,0,104,0,3,10,104,0,104,0,21101,825439855372,0,1,21102,1,420,0,1106,0,432,21101,0,988220907880,1,21102,431,1,0,1106,0,432,99,109,2,22101,0,-1,1,21101,40,0,2,21102,1,463,3,21102,453,1,0,1106,0,496,109,-2,2105,1,0,0,1,0,0,1,109,2,3,10,204,-1,1001,458,459,474,4,0,1001,458,1,458,108,4,458,10,1006,10,490,1102,1,0,458,109,-2,2106,0,0,0,109,4,2102,1,-1,495,1207,-3,0,10,1006,10,513,21102,0,1,-3,22102,1,-3,1,21202,-2,1,2,21102,1,1,3,21101,532,0,0,1105,1,537,109,-4,2105,1,0,109,5,1207,-3,1,10,1006,10,560,2207,-4,-2,10,1006,10,560,21201,-4,0,-4,1106,0,628,22102,1,-4,1,21201,-3,-1,2,21202,-2,2,3,21102,1,579,0,1106,0,537,21202,1,1,-4,21102,1,1,-1,2207,-4,-2,10,1006,10,598,21101,0,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,620,21201,-1,0,1,21102,1,620,0,105,1,495,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0'

painter(puzzleInput)
