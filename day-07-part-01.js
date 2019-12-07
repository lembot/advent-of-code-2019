/**
 * Takes initial memory and performs actions based on the provided
 * instructions.
 * @param {string} memory Comma delimited list representing initial memory
 *                       for the program.
 */
const intcodeProgram = (memory, codes) => {
  memory = memory.split(',').map(num => {
    return parseInt(num)
  })
  let output = 0
  let codeReadCount = 0
  
  for (let i = 0; memory[i] !== 99;) {
    let instruction = memory[i].toString()
    // There are also potential modes that are important, but not always provided...
    let modes = instruction.split('').reverse().join('').slice(2, instruction.length)
    let [
      p1Mode = 0,
      p2Mode = 0
    ] = [...modes].map(numAsString => {
      return parseInt(numAsString)
    })
    let val1 = p1Mode ? memory[i + 1] : memory[memory[i + 1]]
    let val2 = p2Mode ? memory[i + 2] : memory[memory[i + 2]]
    // The opcode CAN be given as 01, in which case it needs to be trimmed to just 1
    let opCode = parseInt(instruction.slice(instruction.length - 2, instruction.length))

    // Operations
    switch (opCode) {

      // Addition
      case 1:
        memory[memory[i + 3]] = val1 + val2
        if (i !== memory[i + 3]) {
          i = i + 4
        }
        break

      // Multiplication
      case 2:
        memory[memory[i + 3]] = val1 * val2
        if (i !== memory[i + 3]) {
          i = i + 4
        }
        break

      // Store value
      case 3:
        memory[memory[i + 1]] = codes[codeReadCount]
        codeReadCount++
        i = i + 2
        break
      
      // Retrieve value
      case 4:
        output = p1Mode ? memory[i + 1] : memory[memory[i + 1]]
        i = i + 2
        break

      // jump-if-true
      case 5:
        val1 !== 0 ? i = val2 : i = i + 3
        break

      // jump-if-false
      case 6:
        val1 === 0 ? i = val2 : i = i + 3
        break

      // Param1 less than param2
      case 7:
        val1 < val2 ? memory[memory[i + 3]] = 1 : memory[memory[i + 3]] = 0
        if (i !== memory[i + 3]) {
          i = i + 4
        }
        break

      // Param1 equals param2
      case 8:
        val1 === val2 ? memory[memory[i + 3]] = 1 : memory[memory[i + 3]] = 0
        if (i !== memory[i + 3]) {
          i = i + 4
        }
        break
      
      // Finish
      case 99:
        return(output)

      // Problem :()
      default:
        console.error('IDK')
        return(output)
    }
  }
  return output
}

const input = '3,8,1001,8,10,8,105,1,0,0,21,42,59,76,85,106,187,268,349,430,99999,3,9,102,3,9,9,1001,9,2,9,1002,9,3,9,1001,9,3,9,4,9,99,3,9,102,3,9,9,101,3,9,9,1002,9,2,9,4,9,99,3,9,102,3,9,9,1001,9,4,9,1002,9,5,9,4,9,99,3,9,102,2,9,9,4,9,99,3,9,101,3,9,9,1002,9,2,9,1001,9,4,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99'

// Borrowed from https://stackoverflow.com/questions/9960908/permutations-in-javascript
// because trying to determine how to get permutations was really annoying.
const permutator = (inputArr) => {
  let result = []
  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice()
        let next = curr.splice(i, 1)
        permute(curr.slice(), m.concat(next))
     }
   }
 }
 permute(inputArr)
 return result
}


// Test all of the permutations and save the highest output...
let highest = 0
permutator([0, 1, 2, 3, 4]).forEach(permutation => {
  let total = 0
  let code = 0
  permutation.forEach(num => {
    code = intcodeProgram(input, [num, code])
    total = code
  })
  highest = total > highest
    ? total
    : highest
})

// What's the highest output?
console.log(highest)
