let moons = [
  [10, 15, 7, 0, 0, 0],
  [15, 10, 0, 0, 0, 0],
  [20, 12, 3, 0, 0, 0],
  [0, -3, 13, 0, 0, 0]
]

// Set velocity for all moons on the specified axis
const setVelocity = (axis, moons) => {
  const index = axis === 'x'
    ? 3
    : axis === 'y'
      ? 4
      : 5

  for (let i = 0; i < moons.length; i++) {
    let moonToUpdate = moons.shift()
    let modifier = 0
    moons.forEach(moon => {
      if (moonToUpdate[index - 3] < moon[index - 3]) {
        modifier++
      } else if (moonToUpdate[index - 3] > moon[index - 3]) {
        modifier--
      } else {
        // They're equal. Do nothing!
      }
    })
    moonToUpdate[index] = moonToUpdate[index] + modifier
    moons.push(moonToUpdate)
  }
}

// Using current velocity data, update positions of the moons on specified axis
const updatePositions = (axis, moons) => {
  const index = axis === 'x'
    ? 3
    : axis === 'y'
      ? 4
      : 5

  moons.forEach(moon => {
    moon[index - 3] = moon[index - 3] + moon[index]
  })
}

// Get potential, kinetic, then total energy of the system
const getTotalEnergy = moons => {
  return moons.reduce((sum, moon) => {
    let potential = Math.abs(moon[0]) + Math.abs(moon[1]) + Math.abs(moon[2])
    let kinetic = Math.abs(moon[3]) + Math.abs(moon[4]) + Math.abs(moon[5])
    let total = potential * kinetic
    return sum + total
  }, 0)
}

for (let i = 0; i < 1000; i++) {
  setVelocity('x', moons)
  setVelocity('y', moons)
  setVelocity('z', moons)
  updatePositions('x', moons)
  updatePositions('y', moons)
  updatePositions('z', moons)
}

getTotalEnergy(moons)
