class MoonTracker{
  constructor(inputString){
    this.io = {
      X: inputString[0],
      Y: inputString[1],
      Z: inputString[2],
      velX: 0,
      velY: 0,
      velZ: 0
    }
    this.europa = {
      X: inputString[3],
      Y: inputString[4],
      Z: inputString[5],
      velX: 0,
      velY: 0,
      velZ: 0
    }
    this.ganymede = {
      X: inputString[6],
      Y: inputString[7],
      Z: inputString[8],
      velX: 0,
      velY: 0,
      velZ: 0
    }
    this.callisto = {
      X: inputString[9],
      Y: inputString[10],
      Z: inputString[11],
      velX: 0,
      velY: 0,
      velZ: 0
    }
  }

  // Set velocity for Io on the provided axis
  setIoVelocity(axis) {
    let modifier = 0
    if (this.io[axis] < this.europa[axis]) {
      modifier++
    }
    if (this.io[axis] > this.europa[axis]) {
      modifier--
    }
    if (this.io[axis] < this.ganymede[axis]) {
      modifier++
    }
    if (this.io[axis] > this.ganymede[axis]) {
      modifier--
    }
    if (this.io[axis] < this.callisto[axis]) {
      modifier++
    }
    if (this.io[axis] > this.callisto[axis]) {
      modifier--
    }
    this.io[`vel${axis}`] = this.io[`vel${axis}`] + modifier
  }

  // Set velocity for Europa on the provided axis
  setEuropaVelocity(axis) {
    let modifier = 0
    if (this.europa[axis] < this.io[axis]) {
      modifier++
    }
    if (this.europa[axis] > this.io[axis]) {
      modifier--
    }
    if (this.europa[axis] < this.ganymede[axis]) {
      modifier++
    }
    if (this.europa[axis] > this.ganymede[axis]) {
      modifier--
    }
    if (this.europa[axis] < this.callisto[axis]) {
      modifier++
    }
    if (this.europa[axis] > this.callisto[axis]) {
      modifier--
    }
    this.europa[`vel${axis}`] = this.europa[`vel${axis}`] + modifier
  }

  // Set velocity for Ganymede on the provided axis
  setGanymedeVelocity(axis) {
    let modifier = 0
    if (this.ganymede[axis] < this.io[axis]) {
      modifier++
    }
    if (this.ganymede[axis] > this.io[axis]) {
      modifier--
    }
    if (this.ganymede[axis] < this.europa[axis]) {
      modifier++
    }
    if (this.ganymede[axis] > this.europa[axis]) {
      modifier--
    }
    if (this.ganymede[axis] < this.callisto[axis]) {
      modifier++
    }
    if (this.ganymede[axis] > this.callisto[axis]) {
      modifier--
    }
    this.ganymede[`vel${axis}`] = this.ganymede[`vel${axis}`] + modifier
  }

  // Set velocity for Callisto on the provided axis
  setCallistoVelocity(axis) {
    let modifier = 0
    if (this.callisto[axis] < this.io[axis]) {
      modifier++
    }
    if (this.callisto[axis] > this.io[axis]) {
      modifier--
    }
    if (this.callisto[axis] < this.europa[axis]) {
      modifier++
    }
    if (this.callisto[axis] > this.europa[axis]) {
      modifier--
    }
    if (this.callisto[axis] < this.ganymede[axis]) {
      modifier++
    }
    if (this.callisto[axis] > this.ganymede[axis]) {
      modifier--
    }
    this.callisto[`vel${axis}`] = this.callisto[`vel${axis}`] + modifier
  }
  
  // Modify each position on the axis with the current velocity
  updatePositions() {
    this.io.X = this.io.X + this.io.velX
    this.io.Y = this.io.Y + this.io.velY
    this.io.Z = this.io.Z + this.io.velZ
    this.europa.X = this.europa.X + this.europa.velX
    this.europa.Y = this.europa.Y + this.europa.velY
    this.europa.Z = this.europa.Z + this.europa.velZ
    this.ganymede.X = this.ganymede.X + this.ganymede.velX
    this.ganymede.Y = this.ganymede.Y + this.ganymede.velY
    this.ganymede.Z = this.ganymede.Z + this.ganymede.velZ
    this.callisto.X = this.callisto.X + this.callisto.velX
    this.callisto.Y = this.callisto.Y + this.callisto.velY
    this.callisto.Z = this.callisto.Z + this.callisto.velZ
  }

  // Update velocity, then update positions
  takeStep() {
    ['X', 'Y', 'Z'].forEach(axis => {
      this.setIoVelocity(axis)
      this.setEuropaVelocity(axis)
      this.setGanymedeVelocity(axis)
      this.setCallistoVelocity(axis)
    })
    this.updatePositions()
  }

  // Take multiple steps at once
  takeSteps(int) {
    for(let i = 0; i < int; i++) {
      this.takeStep()
    }
  }

  getTotalEnergy() {
    let total = (Math.abs(this.io.X) + Math.abs(this.io.Y) + Math.abs(this.io.Z)) * (Math.abs(this.io.velX) + Math.abs(this.io.velY) + Math.abs(this.io.velZ)) +
      (Math.abs(this.europa.X) + Math.abs(this.europa.Y) + Math.abs(this.europa.Z)) * (Math.abs(this.europa.velX) + Math.abs(this.europa.velY) + Math.abs(this.europa.velZ)) +
      (Math.abs(this.ganymede.X) + Math.abs(this.ganymede.Y) + Math.abs(this.ganymede.Z)) * (Math.abs(this.ganymede.velX) + Math.abs(this.ganymede.velY) + Math.abs(this.ganymede.velZ)) +
      (Math.abs(this.callisto.X) + Math.abs(this.callisto.Y) + Math.abs(this.callisto.Z)) * (Math.abs(this.callisto.velX) + Math.abs(this.callisto.velY) + Math.abs(this.callisto.velZ))

    return total
  }
}

let tracker = new MoonTracker([10,15,7,15,10,0,20,12,3,0,-3,13])
tracker.takeSteps(1000)
tracker.getTotalEnergy()
