/**
 * Takes initial memory and performs actions based on the provided
 * instructions.
 * @param {string} input Comma delimited list representing initial memory
 *                       for the program.
 */
const intcodeProgram = input => {
  let instructions = input.split(',').map(num => {
    return parseInt(num)
  })

  // Instructions are 4 digits long
  // Digit 1 - Operation to perform.
  // Digit 2 - Parameter. What position to pull the number from.
  // Digit 3 - Parameter. What position to pull the number from.
  // Digit 4 - Target position to store computed number in
  for (let i = 0; instructions[i] !== 99; i = i + 4) {
    let val1 = instructions[instructions[i + 1]]
    let val2 = instructions[instructions[i + 2]]
    let targetPos = instructions[i + 3]

    switch(instructions[i]) {

      // Addition of params 2 and 3
      case 1:
        instructions[targetPos] = val1 + val2
        break

      // Multiplication of params 2 and 3
      case 2:
        instructions[targetPos] = val1 * val2
        break

      // Something went wrong...
      default:
        return(`UNKNOWN INSTRUCTION AT POSITION ${i}`)
    }
  }
  return instructions
}

const instructions = '1,12,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,9,1,19,1,19,5,23,1,9,23,27,2,27,6,31,1,5,31,35,2,9,35,39,2,6,39,43,2,43,13,47,2,13,47,51,1,10,51,55,1,9,55,59,1,6,59,63,2,63,9,67,1,67,6,71,1,71,13,75,1,6,75,79,1,9,79,83,2,9,83,87,1,87,6,91,1,91,13,95,2,6,95,99,1,10,99,103,2,103,9,107,1,6,107,111,1,10,111,115,2,6,115,119,1,5,119,123,1,123,13,127,1,127,5,131,1,6,131,135,2,135,13,139,1,139,2,143,1,143,10,0,99,2,0,14,0'

console.log(`${intcodeProgram(instructions)[0]}`)
