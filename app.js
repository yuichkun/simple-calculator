const { calculator } = require('./src')
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.prompt('>')
rl.on('line', function(line){
  const res = calculator(line)
  console.log(`A: ${res}`);
  rl.prompt('>')
})


