const DIAL_MIN = 0;
const DIAL_MAX = 99;
const DIAL_POSITIONS = DIAL_MAX + 1;

function getMovement(input: string){
  const matches = /(?<direction>[L,R])(?<distance>\d+)/gm.exec(input);
  const direction = matches?.groups?.direction;
  const distance = matches?.groups?.distance;

  if(!direction || !distance){
    return 0;
  }

  const multiplier = direction === "L" ? -1 : 1;

  return Number.parseInt(distance) * multiplier;
}

const first = (input: string) => {
  const rotations = input.split("\n").filter(Boolean);

  let zeroHits = 0;
  let pointer = 50;

  for(const rotation of rotations){
    pointer = (pointer + getMovement(rotation)) % DIAL_POSITIONS;

    if(pointer === DIAL_MIN){
      zeroHits++;
    }
  };

  return zeroHits;
};

const expectedFirstSolution = '3';

const second = (input: string) => {
  const rotations = input.split("\n").filter(Boolean);

  let zeroHits = 0;
  let pointer = 50;

  for(const rotation of rotations){
    const modifier = getMovement(rotation) < 0 ? -1 : 1;

    for(let i = 0; i < Math.abs(getMovement(rotation)); i++){
      pointer += modifier;

      if(pointer == DIAL_MIN - 1){
        pointer = DIAL_MAX;
      }
      if(pointer == DIAL_MAX + 1){
        pointer = DIAL_MIN
      }

      if(pointer === DIAL_MIN){
        zeroHits++
      }
    }
  }

  return zeroHits;
};

// 4680 low
// 6380 high

const expectedSecondSolution = '6';

export { expectedFirstSolution, expectedSecondSolution, first, second };
