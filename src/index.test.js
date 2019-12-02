const { tokenizer, parser, traverser, calculator } = require('./')
const { ProgramTypes } = require('./constants')

describe('tokenizer', () => {

  describe('with spaces', () => {
    const input = '1 + 6'
    const tokens = tokenizer(input)
    it('has valid length', () => {
      expect(tokens.length).toBe(3)
    }) 
    it('has proper tokens', () => {
      expect(tokens).toEqual(['1', '+', '6'])
    })
  })

  describe('without space', () => {
    const input = '1+6'
    const tokens = tokenizer(input)
    it('has valid length', () => {
      expect(tokens.length).toBe(3)
    }) 
    it('has proper tokens', () => {
      expect(tokens).toEqual(['1', '+', '6'])
    })
  })

  describe('multi degits', () => {
    const input = '1+60'
    const tokens = tokenizer(input)
    expect(tokens).toEqual(['1', '+', '60'])
  })

})

describe('parser', () => {

  it('creates ast', () => {
    const tokens = ['1', '+', '6']
    const ast = parser(tokens, {})
    expect(ast).toEqual({
      type: ProgramTypes.EXPRESSION,
      left: {
        type: ProgramTypes.LITERAL,
        value: '1'
      },
      operator: '+',
      right: {
        type: ProgramTypes.LITERAL,
        value: '6'
      }
    })
  })
  it('returns empty ast', () => {
    expect(parser([], {})).toEqual({})
  })
})


describe('traverser', () => {
  it('traverses', () => {
    const ast = {
      type: ProgramTypes.EXPRESSION,
      left: {
        type: ProgramTypes.LITERAL,
        value: '1'
      },
      operator: '+',
      right: {
        type: ProgramTypes.LITERAL,
        value: '6'
      }
    }
    expect(traverser(ast)).toBe(7)
  })
})

describe('calculator', () => {
  it('1 + 6', () => {
    expect(calculator('1 + 6')).toEqual(7)
  })
  it('3 * 8', () => {
    expect(calculator('3 * 8')).toEqual(24)
  })
  it('2 + 3 * 11', () => {
    expect(calculator('2 + 3 * 11')).toEqual(35)
  })
})