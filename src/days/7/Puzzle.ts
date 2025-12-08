const first = (input: string) => {
  const data = input.split("\n").filter(Boolean).map((line) => line.split('') as ['.'| 'S'| '^'| '|']);

  let sum = 0;

  for(let y=1; y < data.length; y++) {
    for(let x=0; x < data[y].length; x++){
      // watch previous row
      switch(data[y - 1][x]){
        case 'S': {
          data[y][x] = '|'
          break;
        }
        case '|': {
          // split
          if(data[y][x] === '^'){
            data[y][x - 1] = '|';
            data[y][x + 1] = '|';

            sum++;
          }else{
            data[y][x] = '|';
          }
          break;
        }
      }
    }
  }

  return sum;
};

const expectedFirstSolution = '21';

const second = (input: string) => {
  const data = input.split("\n").filter(Boolean).map((line) => (line.split('')).map((entity) => [entity, 0] as ['.'| 'S'| '^'| '|', number]));

  for(let y=1; y < data.length; y++) {
    for(let x=0; x < data[y].length; x++){
      // watch previous row
      switch(data[y - 1][x][0]){
        case 'S': {
          data[y][x][0] = '|'
          data[y][x][1] += 1;
          break;
        }

        case '|': {
          const beamCount = data[y - 1][x][1];

          // split
          if(data[y][x][0] === '^'){
            // add left
            data[y][x - 1][0] = '|';
            data[y][x - 1][1] += beamCount

            data[y][x + 1][0] = '|';
            data[y][x + 1][1] += beamCount
          }else{
            data[y][x][0] = '|';
            data[y][x][1] += beamCount;
          }
          break;
        }
      }
    }
  }

   // count last line
  const lastLine = data.pop()!;

  return lastLine.reduce((acc, item) => acc + item[1], 0);
};

const expectedSecondSolution = '40';

export { expectedFirstSolution, expectedSecondSolution, first, second };
