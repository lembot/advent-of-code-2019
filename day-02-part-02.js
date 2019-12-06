/**
 * Takes initial memory and performs actions based on the provided
 * instructions.
 * @param {string} input Comma delimited list representing initial memory
 *                       for the program.
 */
const intcodeProgram = input => {
  let memory = input.split(',').map(num => {
    return parseInt(num)
  })

  // Instructions are 4 digits long
  // Digit 1 - Operation to perform.
  // Digit 2 - Parameter. What position to pull the number from.
  // Digit 3 - Parameter. What position to pull the number from.
  // Digit 4 - Target position to store computed number in
  for (let i = 0; memory[i] !== 99; i = i + 4) {
    let instruction = memory[i]
    let paramVal1 = memory[memory[i + 1]]
    let paramVal2 = memory[memory[i + 2]]
    let paramTarget = memory[i + 3]

    switch(instruction) {

      // Addition of params 2 and 3
      case 1:
        memory[paramTarget] = paramVal1 + paramVal2
        break

      // Multiplication of params 2 and 3
      case 2:
        memory[paramTarget] = paramVal1 * paramVal2
        break

      // Something went wrong...
      default:
        return(`UNKNOWN INSTRUCTION AT POSITION ${i}`)
    }
  }
  return memory
}


// Replace initial digits at position 2 and position 3 with (0-99) and get the computed answer in position 0.
// We need to find what noun (pos 2) and verb (pos 3) give us 19690720 in pos 0.
(function(){
  for (let noun = 0; noun <= 99; noun++) {
  for (let verb = 0; verb <= 99; verb++) {
    let memory = `1,${noun},${verb},3,1,1,2,3,1,3,4,3,1,5,0,3,2,9,1,19,1,19,5,23,1,9,23,27,2,27,6,31,1,5,31,35,2,9,35,39,2,6,39,43,2,43,13,47,2,13,47,51,1,10,51,55,1,9,55,59,1,6,59,63,2,63,9,67,1,67,6,71,1,71,13,75,1,6,75,79,1,9,79,83,2,9,83,87,1,87,6,91,1,91,13,95,2,6,95,99,1,10,99,103,2,103,9,107,1,6,107,111,1,10,111,115,2,6,115,119,1,5,119,123,1,123,13,127,1,127,5,131,1,6,131,135,2,135,13,139,1,139,2,143,1,143,10,0,99,2,0,14,0`
    if (intcodeProgram(memory)[0] === 19690720) {
      console.log(`Answer: ${(100 * noun) + verb}`)
    }
  }
}})()
