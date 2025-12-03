
function findHighestNumInArray(arr: number[], rightPadding = 0){
  const sliceEnd = rightPadding ? rightPadding * -1 : undefined;

  return Math.max(...arr.slice(0, sliceEnd));
}

function sliceArrayAtFirstNumber(num: number, arr: number[]){
  return arr.slice(arr.indexOf(num) + 1);
}



const first = (input: string) => {
  const NUM_OF_BATTERIES = 2;
  const banks = input.split("\n").filter(Boolean);

  let sum = 0;

  for(const bank of banks){
    let bankArray = bank.split('').map((battery) => Number.parseInt(battery));

    let out: number[] = [];

    for(let i = NUM_OF_BATTERIES - 1; i >= 0; i--){
      const maxInt = findHighestNumInArray(bankArray, i);
      bankArray = sliceArrayAtFirstNumber(maxInt, bankArray);

      out.push(maxInt);
    }

    sum += Number.parseInt(out.join(''));
  }

  return sum;
};

const expectedFirstSolution = '357';


const second = (input: string) => {
  const NUM_OF_BATTERIES = 12;
  const banks = input.split("\n").filter(Boolean);

  let sum = 0;

  for(const bank of banks){
    let bankArray = bank.split('').map((battery) => Number.parseInt(battery));

    let out: number[] = [];

    for(let i = NUM_OF_BATTERIES - 1; i >= 0; i--){
      const maxInt = findHighestNumInArray(bankArray, i);
      bankArray = sliceArrayAtFirstNumber(maxInt, bankArray);

      out.push(maxInt);
    }

    sum += Number.parseInt(out.join(''));
  }

  return sum;
};

const expectedSecondSolution = '3121910778619';

export { expectedFirstSolution, expectedSecondSolution, first, second };
