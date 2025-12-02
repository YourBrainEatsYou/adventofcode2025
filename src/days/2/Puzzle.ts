const first = (input: string) => {
  const ranges = input.split(",").filter(Boolean);

  let sum = 0;

  for(const range of ranges){
    const [start, end] = range.split('-');

    for(let i = parseInt(start); i <= parseInt(end); i++){

      // check if is doubble
      const stringLength = i.toString().length;

      const first = i.toString().substring(0, (stringLength/2));
      const last = i.toString().substring((stringLength/2), stringLength);

      if(first === last){
        sum += i;
      }

    }
  }

  return sum;
};

const expectedFirstSolution = '1227775554';

function checkForPattern(data: number): boolean {
  const pattern = data.toString().split('');

  for(let gap = 1; gap <= Math.floor(pattern.length/2); gap++){

    if(pattern.length % gap !== 0){
      continue;
    }


    let allTheSame = true;
    for(let index = 0; index < pattern.length - gap; index++){
      if(pattern[index] !== pattern[index+gap]){
        allTheSame = false
        break;
      }
    }

    if(allTheSame){
      return true
    }
  }

  return false;
}

const second = (input: string) => {

  const ranges = input.split(",").filter(Boolean);

  let sum = 0;

  for(const range of ranges){
    const [start, end] = range.split('-');

    for(let i = parseInt(start); i <= parseInt(end); i++){
      if(checkForPattern(i)){
        sum += i;
      }
    }
  }

  return sum;
};

const expectedSecondSolution = '4174379265';

export { expectedFirstSolution, expectedSecondSolution, first, second };
