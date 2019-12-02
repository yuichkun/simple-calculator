const { combineDigits } = require('./util')

describe('combineDigits', () => {
  it('14 + 25', () => {
    const tokens = ['1', '4', '+', '2', '5']   
    const actual = combineDigits(tokens)
    expect(actual).toEqual(['14', '+', '25'])
  })
})