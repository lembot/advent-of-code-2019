// MUST BE A NUMBER CONVERTED TO A STRING
// Determines if this number has adjacent repeated digits.
// Example: 112233 (GOOD!) or 123456 (BAD!)
const hasRepeatedAdjacent = num => {
  for (let i = 0; i < num.length - 1; i++) {
    if (num[i] === num[i + 1]) {
      return true
    }
  }
  return false
}

// MUST BE A NUMBER CONVERTED TO A STRING
// Determines if the digits (left to right) descend.
// Example: 123456 (GOOD!) or 222221 (BAD!)
const doesNotDescend = num => {
  for (let i = 0; i < num.length - 1; i++) {
    if (num[i] > num[i + 1]) {
      return false
    }
  }
  return true
}

// Brute force it!
const min = 138241
const max = 674034
let totalPasswords = 0

// Generate a number, make sure it meets the requirements, then mark
// if it's a valid password.
for (let i = min; i <= max; i++) {
  // Convert to string...
  let num = i.toString()
  if (doesNotDescend(num) && hasRepeatedAdjacent(num)) {
    totalPasswords++
  }
}

console.log(`${totalPasswords} different password options`)
