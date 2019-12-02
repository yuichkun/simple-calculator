const { OPERATORS } = require('./constants')

const combineDigits = (tokens) => {
  let combined = []
  let cache = ''

  for (let token of tokens) {
    if (OPERATORS.includes(token)) {
      if (cache !== '') {
        combined.push(cache)
        combined.push(token)
      }
      cache = ''
    } else {
      cache += token
    }
  }

  if (cache !== '') {
    combined.push(cache)
  }
  return combined
}

module.exports = {
  combineDigits
}