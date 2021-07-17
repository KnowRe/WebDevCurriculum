const repeatString = (str, n) => {
  return [...Array(n)].reduce((acc) => acc + str, '');
}

const getLine = (n, i) => {
  return repeatString(' ', n - i - 1) + repeatString('*', (i * 2) + 1);
}
const execute = (n) => {
  return  [...Array(n).keys()]
    .map(i => getLine(n, i))
    .join('\n');
}

const n = Number(prompt());
console.log(execute(n));
