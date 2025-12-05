type Range = [low: number, high: number];

function includes(range: Range, num: number) {
  return num >= range[0] && num <= range[1];
}


const first = (input: string) => {
  const [dbString, idsString] = input.split("\n\n");

  const db = dbString.split("\n").filter(Boolean).map((entity) => entity.split('-').map((number) => Number.parseInt(number))) as Range[];
  const ids = idsString.split("\n").filter(Boolean).map((number) => Number.parseInt(number));

  let sum = 0;

  for(const id of ids){
    // db lookup
    if(db.some((range) =>  includes(range, id))){
      sum++;
    }
  }

  return sum;
};

const expectedFirstSolution = '3';

function overlap(range1: Range, range2?: Range){
  if (range2
    && (includes(range1, range2[0])
    || includes(range1, range2[1])
    || includes(range2, range1[0])
    || includes(range2, range1[1])
    )
  )
    return [Math.min(range1[0], range2[0]), Math.max(range1[1], range2[1])] as Range;
}

const second = (input: string) => {
  const [dbString] = input.split("\n\n");
  const db = dbString.split("\n").filter(Boolean).map((entity) => entity.split('-').map((number) => Number.parseInt(number))) as Range[];
  let sum = 0;


  // convert to valid ranges
  // sort db by start
  db.sort((a, b) => a[0] - b[0]);

  // remove overlapping ranges
  const normalizedDb = db.reduce((acc, value) => {
      const combination = overlap(value, acc.at(-1));

      acc[acc.length - (combination ? 1 : 0)] = combination ?? value;

      return acc;
  }, [] as Range[])


  for(const [start, end] of normalizedDb){
    sum += (end - start) + 1;
  }

  return sum;
};

const expectedSecondSolution = 14;

export { expectedFirstSolution, expectedSecondSolution, first, second };
