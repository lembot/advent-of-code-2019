const puzzleInput = '.#..#..#..#...#..#...###....##.#....,.#.........#.#....#...........####.#,#..##.##.#....#...#.#....#..........,......###..#.#...............#.....#,......#......#....#..##....##.......,....................#..............#,..#....##...#.....#..#..........#..#,..#.#.....#..#..#..#.#....#.###.##.#,.........##.#..#.......#.........#..,.##..#..##....#.#...#.#.####.....#..,.##....#.#....#.......#......##....#,..#...#.#...##......#####..#......#.,##..#...#.....#...###..#..........#.,......##..#.##..#.....#.......##..#.,#..##..#..#.....#.#.####........#.#.,#......#..........###...#..#....##..,.......#...#....#.##.#..##......#...,.............##.......#.#.#..#...##.,..#..##...#...............#..#......,##....#...#.#....#..#.....##..##....,.#...##...........#..#..............,.............#....###...#.##....#.#.,#..#.#..#...#....#.....#............,....#.###....##....##...............,....#..........#..#..#.......#.#....,#..#....##.....#............#..#....,...##.............#...#.....#..###..,...#.......#........###.##..#..##.##,.#.##.#...##..#.#........#.....#....,#......#....#......#....###.#.....#.,......#.##......#...#.#.##.##...#...,..#...#.#........#....#...........#.,......#.##..#..#.....#......##..#...,..##.........#......#..##.#.#.......,.#....#..#....###..#....##..........,..............#....##...#.####...##.'.split(',').map(row => row.split(''))

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

const scanAsteroids = puzzleInput => {
  let asteroidMap = findAsteroids(puzzleInput)
  let analyzedAsteroids = []
  asteroidMap.forEach(focus => {
    analyzedAsteroids.push({
      focus: focus,
      asteroidsInView: lineOfSight(focus, asteroidMap).size
    })
  })
  return analyzedAsteroids
}

scanAsteroids(puzzleInput).sort((a,b) => {
  return b.asteroidsInView - a.asteroidsInView
})
