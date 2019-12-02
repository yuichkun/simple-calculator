const debug = require('debug')
const { combineDigits } = require('./util')
const { OPERATORS, ProgramTypes } = require('./constants')


const tokenizer = (input) => {
  const tokens = input.split('').filter(t => t !== ' ');
  return combineDigits(tokens)
}

const parserLog = debug('parser')
const parser = (tokens, ast) => {
  if (tokens.length === 0) return ast

  const token = tokens[0]
  const rest = tokens.slice(1)

  let node = {}
  if (OPERATORS.includes(token)) {
    node.type = ProgramTypes.EXPRESSION
    node.operator = token
    node.left = ast
    node.right = parser(rest, node)
    parserLog('expression', node)
    return node
  } else {
    node.type = ProgramTypes.LITERAL
    node.value = token
    parserLog('literal', node)
    return parser(rest, node)
  }
}

const traverser = (ast) => {
  if (ast.type === ProgramTypes.EXPRESSION) {
    switch (ast.operator) {
      case '+': {
        return traverser(ast.left) + traverser(ast.right)
      }
      case '-': {
        return traverser(ast.left) - traverser(ast.right)
      }
      case '*': {
        return traverser(ast.left) * traverser(ast.right)
      }
      case '/': {
        return traverser(ast.left) / traverser(ast.right)
      }
      default:
        throw new Error('unexpected operator')
    }
  }
  if (ast.type === ProgramTypes.LITERAL) {
    return Number(ast.value)
  }

  throw new Error('should not reach here')
}

const calcLog = debug('calculator')
const calculator = (input) => {
  const tokens = tokenizer(input)
  calcLog('tokens', tokens)
  const ast = parser(tokens, {})
  calcLog('ast', ast)
  const result = traverser(ast)
  return result
}


module.exports = { 
  tokenizer,
  parser,
  traverser,
  calculator
}