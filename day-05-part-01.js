const intcodeProgram = input => {
  let memory = input.split(',').map(num => {
    return parseInt(num)
  })
  
    for (let i = 0; memory[i] !== 99;) {
      let instruction = memory[i].toString()
      let opCodeLen = instruction.length
      let opCode = parseInt(instruction.slice(instruction.length - 2, instruction.length))

      let modes = instruction.split('').reverse().join('').slice(2, instruction.length)
      let p1Mode = modes[0] ? parseInt(modes[0]) : 0
      let p2Mode = modes[1] ? parseInt(modes[1]) : 0
      let p3Mode = modes[2] ? parseInt(modes[2]) : 0
      let val1 = ''
      let val2 = ''

    switch (opCode) {
      case 1:
        val1 = p1Mode ? memory[i + 1] : memory[memory[i + 1]]
        val2 = p2Mode ? memory[i + 2] : memory[memory[i + 2]]
        memory[memory[i + 3]] = val1 + val2
        i = i + 4
        break
      case 2:
        val1 = p1Mode ? memory[i + 1] : memory[memory[i + 1]]
        val2 = p2Mode ? memory[i + 2] : memory[memory[i + 2]]
        memory[memory[i + 3]] = val1 * val2
        i = i + 4
        break
      case 3:
        memory[memory[i + 1]] = parseInt(prompt())
        i = i + 2
        break
      case 4:
        console.log(p1Mode ? memory[i + 1] : memory[memory[i + 1]])
        i = i + 2
        break
      case 99:
        return(1)
        break
      default:
        console.error('IDK')
        return(0)
        break
    }
  }
  return memory
}
