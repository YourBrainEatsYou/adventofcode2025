const first = (input: string) => {
  const data = input.split("\n").filter(Boolean).map((row) => row.split(' ').filter(Boolean));
  const operations = data.pop()!;

  let sum = 0;

  for(let i = 0; i < (operations?.length ?? 0); i++){
    let sectionTotal = data.reduce((acc, row) => {
      switch(operations[i]){
        case '+':
          return acc + Number.parseInt(row[i]);
        case '*':
          return acc * Number.parseInt(row[i]);
        default:
          return 0;
      }
    }, operations[i] === '*' ? 1 : 0);
    sum += sectionTotal;
  }

  return sum;
};

const expectedFirstSolution = '4277556';

const second = (input: string) => {
  let sum = 0;

  const data = input.split("\n").filter(Boolean);
  const opLine = data.pop()!;

  const operations = opLine.matchAll(/\S/g).map(
    (match) => [match[0], match.index] as ['+' | '*', number],
  ).toArray();

  let startIndex = opLine.length - 1;

  for(let column = (operations.length - 1); column >= 0; column--) {
    const operator = operations[column];
    const endIndex = operator[1];

    let sectionTotal = operator[0] === '*' ? 1 : 0;

    // loop through the lines
    for(let index = startIndex; index >= endIndex; index--){
      let num = '';

      for(const line of data){
        num += line[index];
      }

      switch(operator[0]){
        case '+':
          sectionTotal += Number.parseInt(num);
          break;
        case '*':
          sectionTotal *= Number.parseInt(num);
          break;
      }
    }

    startIndex = endIndex - 2;

    sum += sectionTotal;
  }
  return sum;
};

const expectedSecondSolution = '3263827';

export { expectedFirstSolution, expectedSecondSolution, first, second };
