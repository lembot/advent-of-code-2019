const puzzleInput = '.#..#..#..#...#..#...###....##.#....,.#.........#.#....#...........####.#,#..##.##.#....#...#.#....#..........,......###..#.#...............#.....#,......#......#....#..##....##.......,....................#..............#,..#....##...#.....#..#..........#..#,..#.#.....#..#..#..#.#....#.###.##.#,.........##.#..#.......#.........#..,.##..#..##....#.#...#.#.####.....#..,.##....#.#....#.......#......##....#,..#...#.#...##......#####..#......#.,##..#...#.....#...###..#..........#.,......##..#.##..#.....#.......##..#.,#..##..#..#.....#.#.####........#.#.,#......#..........###...#..#....##..,.......#...#....#.##.#..##......#...,.............##.......#.#.#..#...##.,..#..##...#...............#..#......,##....#...#.#....#..#.....##..##....,.#...##...........#..#..............,.............#....###...#.##....#.#.,#..#.#..#...#....#.....#............,....#.###....##....##...............,....#..........#..#..#.......#.#....,#..#....##.....#............#..#....,...##.............#...#.....#..###..,...#.......#........###.##..#..##.##,.#.##.#...##..#.#........#.....#....,#......#....#......#....###.#.....#.,......#.##......#...#.#.##.##...#...,..#...#.#........#....#...........#.,......#.##..#..#.....#......##..#...,..##.........#......#..##.#.#.......,.#....#..#....###..#....##..........,..............#....##...#.####...##.'.split(',').map(row => row.split(''))
// 11,13 with 210 detected
//const puzzleInput = '.#..##.###...#######,##.############..##.,.#.######.########.#,.###.#######.####.#.,#####.##.#.##.###.##,..#####..#.#########,####################,#.####....###.#.#.##,##.#################,#####.##.###..####..,..######..##.#######,####.##.####...##..#,.#####..#.######.###,##...#.##########...,#.##########.#######,.####.#.###.###.#.##,....##.##.###..#####,.#.#.###########.###,#.#.#.#####.####.###,###.##.####.##.#..##'.split(',').map(row => row.split(''))

// Returns an array containing coordinates as an object
const findAsteroids = asteroidMap => {
  let asteroids = []
  for (let i = 0; i < asteroidMap.length; i++) {
    for (let u = 0; u < asteroidMap[0].length; u++) {
      if (asteroidMap[i][u] === '#') {
        asteroids.push({
          x: u,
          y: i
        })
      }
    }
  }
  return asteroids
}

const lineOfSight = (focus, asteroidList) => {
  let arctans = new Set()
  for (let i = 0; i < asteroidList.length; i++) {
    let arctan = Math.atan2((asteroidList[i].y - focus.y),(asteroidList[i].x - focus.x))
    if (!isNaN(arctan)) {
      arctans.add(arctan)
    }
  }
  return arctans
}

// Coords are 17, 22
let station = {x: 17, y: 22}
let angles = Array.from(lineOfSight(station, findAsteroids(puzzleInput)))
let indexFirstToDestroy = angles.findIndex(num => num === Math.PI / 2)

// Start at "top" (remember instructions were upside down)
// -PI / 2 to Zero
// Zero to PI
// -PI to -PI / 2
let neg_half_pi_to_zero = angles.filter(num => {
  return num >= -Math.PI / 2 && num < 0
}).sort((a,b) => a - b)
let zero_to_pi = angles.filter(num => {
  return num >= 0 && num <= Math.PI
}).sort((a,b) => a - b)
let neg_pi_to_neg_half_pi = angles.filter(num => {
  return num >= -Math.PI && num < -Math.PI / 2
}).sort((a,b) => a - b)

let sortedAngles = [
  ...neg_half_pi_to_zero,
  ...zero_to_pi,
  ...neg_pi_to_neg_half_pi
]

const getCoordsFromAngle = (focus, asteroidList, angle) => {
  let allCoords = []
  asteroidList.forEach(asteroid => {
    if(Math.atan2((asteroid.y - focus.y),(asteroid.x - focus.x)) === angle) {
      allCoords.push({x: asteroid.x, y: asteroid.y})
    }
  })
  return allCoords
}

let luckyAsteroid = getCoordsFromAngle(station, findAsteroids(puzzleInput), sortedAngles[199])
