const intcodeInterpreter = (memory) => {

  // In an object so we can manipulate the value elsewhere
  let relativeBase = {
    value: 0
  }

  // Program loop
  for (let i = 0;;) {

    // Set the opcode (last 2 digits)
    let opcode = parseInt(memory[i].toString().split('').slice(-2).join(''))

    // Set the modes (other digits, reversed)
    let [
      first = 0,
      second = 0,
      third = 0
    ] = memory[i].toString().split('').reverse().slice(2).map(num => parseInt(num))

    // Explode if invalid opcode
    if (!operations[opcode]) {
      throw(`Unknown operation ${opcode}`)
    }

    // Special opcode handling
    // Exit if done
    if (opcode === 99) {
      return memory
    }

    // Perform operation
    let step = operations[opcode]({
      modes: {
        first,
        second,
        third
      },
      index: i,
      relativeBase,
      memory
    })

    // Step forward in the index
    i = i + step
  }
}

const operations = {
  // Addition
  1: ({modes, index, memory, relativeBase}) => {
    let valFirst
    let valSecond
    let valThird
    switch (modes.first) {
      case 2:
        valFirst = memory[relativeBase.value + memory[index + 1]]
        break
      case 1:
        valFirst = memory[index + 1]
        break
      case 0:
        valFirst = memory[memory[index + 1]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    switch (modes.second) {
      case 2:
        valSecond = memory[relativeBase.value + memory[index + 2]]
        break
      case 1:
        valSecond = memory[index + 2]
        break
      case 0:
        valSecond = memory[memory[index + 2]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    switch (modes.third) {
      case 2:
        valThird = relativeBase.value + memory[index + 3]
        break
      case 1:
        console.error(`Bad mode for insert: ${modes.third}`)
        break
      case 0:
        valThird = memory[index + 3]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    memory[valThird] = valFirst + valSecond
    return 4
  },
  // Multiplication
  2: ({modes, index, memory, relativeBase}) => {
    let valFirst
    let valSecond
    let valThird
    switch (modes.first) {
      case 2:
        valFirst = memory[relativeBase.value + memory[index + 1]]
        break
      case 1:
        valFirst = memory[index + 1]
        break
      case 0:
        valFirst = memory[memory[index + 1]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    switch (modes.second) {
      case 2:
        valSecond = memory[relativeBase.value + memory[index + 2]]
        break
      case 1:
        valSecond = memory[index + 2]
        break
      case 0:
        valSecond = memory[memory[index + 2]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    switch (modes.third) {
      case 2:
        valThird = relativeBase.value + memory[index + 3]
        break
      case 1:
        console.error(`Bad mode for insert: ${modes.first}`)
        break
      case 0:
        valThird = memory[index + 3]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    memory[valThird] = valFirst * valSecond
    return 4
  },
  // Insert
  3: ({modes, index, memory, relativeBase}) => {
    let valFirst
    switch (modes.first) {
      case 2:
        valFirst = relativeBase.value + memory[index + 1]
        break
      case 1:
        console.error(`Bad mode for insert: ${modes.first}. Defaulting to position mode.`)
        valFirst = memory[index + 1]
        break
      case 0:
        valFirst = memory[index + 1]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    memory[valFirst] = prompt()
    return 2
  },
  // Retrieve
  4: ({modes, index, memory, relativeBase}) => {
    let valFirst
    switch (modes.first) {
      case 2:
        valFirst = memory[relativeBase.value + memory[index + 1]]
        break
      case 1:
        valFirst = memory[index + 1]
        break
      case 0:
        valFirst = memory[memory[index + 1]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    console.log(`OUTPUT: ${valFirst}`)
    return 2
  },
  // Jump-if-true
  5: ({modes, index, memory, relativeBase}) => {
    let valFirst
    let valSecond
    switch (modes.first) {
      case 2:
        valFirst = memory[relativeBase.value + memory[index + 1]]
        break
      case 1:
        valFirst = memory[index + 1]
        break
      case 0:
        valFirst = memory[memory[index + 1]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    switch (modes.second) {
      case 2:
        valSecond = memory[relativeBase.value + memory[index + 2]]
        break
      case 1:
        valSecond = memory[index + 2]
        break
      case 0:
        valSecond = memory[memory[index + 2]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    return valFirst !== 0
      ? valSecond - index
      : 3
  },
  // Jump-if-false
  6: ({modes, index, memory, relativeBase}) => {
    let valFirst
    let valSecond
    switch (modes.first) {
      case 2:
        valFirst = memory[relativeBase.value + memory[index + 1]]
        break
      case 1:
        valFirst = memory[index + 1]
        break
      case 0:
        valFirst = memory[memory[index + 1]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    switch (modes.second) {
      case 2:
        valSecond = memory[relativeBase.value + memory[index + 2]]
        break
      case 1:
        valSecond = memory[index + 2]
        break
      case 0:
        valSecond = memory[memory[index + 2]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    return valFirst === 0
      ? valSecond - index
      : 3
  },
  // Less than
  7: ({modes, index, memory, relativeBase}) => {
    let valFirst
    let valSecond
    let valThird
    switch (modes.first) {
      case 2:
        valFirst = memory[relativeBase.value + memory[index + 1]]
        break
      case 1:
        valFirst = memory[index + 1]
        break
      case 0:
        valFirst = memory[memory[index + 1]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    switch (modes.second) {
      case 2:
        valSecond = memory[relativeBase.value + memory[index + 2]]
        break
      case 1:
        valSecond = memory[index + 2]
        break
      case 0:
        valSecond = memory[memory[index + 2]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    switch (modes.third) {
      case 2:
        valThird = relativeBase.value + memory[index + 3]
        break
      case 1:
        console.error(`Bad mode for insert: ${modes.third}. Defaulting to position mode.`)
        valFirst = memory[index + 3]
        break
      case 0:
        valThird = memory[index + 3]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    memory[valThird] = valFirst < valSecond
      ? 1
      : 0
    return 4
  },
  // Equals
  8: ({modes, index, memory, relativeBase}) => {
    let valFirst
    let valSecond
    let valThird
    switch (modes.first) {
      case 2:
        valFirst = memory[relativeBase.value + memory[index + 1]]
        break
      case 1:
        valFirst = memory[index + 1]
        break
      case 0:
        valFirst = memory[memory[index + 1]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    switch (modes.second) {
      case 2:
        valSecond = memory[relativeBase.value + memory[index + 2]]
        break
      case 1:
        valSecond = memory[index + 2]
        break
      case 0:
        valSecond = memory[memory[index + 2]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    switch (modes.third) {
      case 2:
        valThird = relativeBase.value + memory[index + 3]
        break
      case 1:
        console.error(`Bad mode for insert: ${modes.third}. Defaulting to position mode.`)
        valFirst = memory[index + 3]
        break
      case 0:
        valThird = memory[index + 3]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    memory[valThird] = valFirst === valSecond
      ? 1
      : 0
    return 4
  },
  // Increase relative base
  9: ({modes, index, memory, relativeBase}) => {
    let valFirst
    switch (modes.first) {
      case 2:
        valFirst = memory[relativeBase.value + memory[index + 1]]
        break
      case 1:
        valFirst = memory[index + 1]
        break
      case 0:
        valFirst = memory[memory[index + 1]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    relativeBase.value = relativeBase.value + valFirst
    return 2
  },
  99: () => {
    return 'done'
  }
}

let tests = {}
// ADDITION
tests = {...tests, additionImmediate: intcodeInterpreter('1101,2,3,5,99,0'.split(',').map(num => parseInt(num))).toString() === '1101,2,3,5,99,5'}
tests = {...tests, additionPosition: intcodeInterpreter('1,2,3,5,99,0'.split(',').map(num => parseInt(num))).toString() === '1,2,3,5,99,8'}
tests = {...tests, additionRelative: intcodeInterpreter('209,4,2201,1,3,7,99,0'.split(',').map(num => parseInt(num))).toString() === '209,4,2201,1,3,7,99,102'}
// MULTIPLICATION
tests = {...tests, multiplicationImmediate: intcodeInterpreter('1102,2,3,5,99,0'.split(',').map(num => parseInt(num))).toString() === '1102,2,3,5,99,6'}
tests = {...tests, multiplicationPosition: intcodeInterpreter('2,2,3,5,99,0'.split(',').map(num => parseInt(num))).toString() === '2,2,3,5,99,15'}
tests = {...tests, multiplicationRelative: intcodeInterpreter('209,4,2202,1,3,7,99,0'.split(',').map(num => parseInt(num))).toString() === '209,4,2202,1,3,7,99,297'}
// INSERT
tests = {...tests, insertImmediate: intcodeInterpreter('103,1,99'.split(',').map(num => parseInt(num))).toString() === '103,1234,99'}
tests = {...tests, insertPosition: intcodeInterpreter('3,1,99'.split(',').map(num => parseInt(num))).toString() === '3,1234,99'}
tests = {...tests, insertRelative: intcodeInterpreter('209,3,203,1,99'.split(',').map(num => parseInt(num))).toString() === '209,3,1234,1,99'}
// RETRIEVE
// Should be 0
tests = {...tests, retrieveImmediate: intcodeInterpreter('104,0,99'.split(',').map(num => parseInt(num))).toString() === '104,0,99'}
// Should be 4
tests = {...tests, retrievePosition: intcodeInterpreter('4,0,99'.split(',').map(num => parseInt(num))).toString() === '4,0,99'}
// Should be 204
tests = {...tests, retrieveRelative: intcodeInterpreter('209,3,204,1,99'.split(',').map(num => parseInt(num))).toString() === '209,3,204,1,99'}

intcodeInterpreter('109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99'.split(',').map(num => parseInt(num)))
