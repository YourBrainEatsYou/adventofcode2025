type Point = {
  x: number;
  y: number;
}

function createArrayFromInput(input: string): boolean[][] {
  return input.split("\n").filter(Boolean).map((row) => row.split('').map((item) => item === '@'));
}

function getCoordinatesAroundPoint(point: Point, array: boolean[][]){
  const points: Point[] = [];

  for(let y = -1; y <= 1; y++){

    const yToCheck = point.y + y;

    // out of y bound | top
    if(yToCheck < 0){
      continue;
    }
    // out of y bound | bottom
    if(yToCheck >= array.length){
      break;
    }

    for(let x = -1; x <= 1; x++){
      const xToCheck = point.x + x;

      // its the current point 0 & 0
      if(!y && !x){
        continue;
      }

      // out of x bound --- <
      if(point.x + x < 0){
        continue;
      }

      // out of x bound --- >
      if(point.x + x >= array[point.y].length){
        break;
      }

      points.push({y: yToCheck, x: xToCheck});
    }
  }

  return points;
}

function checkForOccupiedSpotsAroundPoint(point: Point, array: boolean[][], threshold = 0){
  let occupied = 0;

  for(let y = -1; y <= 1; y++){

    const yToCheck = point.y + y;

    // out of y bound | top
    if(yToCheck < 0){
      continue;
    }
    // out of y bound | bottom
    if(yToCheck >= array.length){
      break;
    }

    for(let x = -1; x <= 1; x++){
      const xToCheck = point.x + x;

      // its the current point 0 & 0
      if(!y && !x){
        continue;
      }

      // out of x bound --- <
      if(point.x + x < 0){
        continue;
      }

      // out of x bound --- >
      if(point.x + x >= array[point.y].length){
        break;
      }

      // checkPosition
      occupied += array[yToCheck][xToCheck] ? 1 : 0;

      if(threshold && occupied >= threshold){
        return occupied;
      }
    }
  }

  return occupied;
}


const first = (input: string) => {
  const data = createArrayFromInput(input);

  let sum = 0;

  for(let y = 0; y < data.length; y++){
    for(let x = 0; x < data[y].length; x++){
      if(data[y][x]){
        sum += (checkForOccupiedSpotsAroundPoint({x, y}, data, 0) >= 4 ? 0 : 1);
      }
    }
  }

  return sum;
};

const expectedFirstSolution = '13';

const second = (input: string) => {
  let rolesRemoved = 0;
  let pointsToCheck: Point[] = [];
  let data = createArrayFromInput(input);

  for(let y = 0; y < data.length; y++){
    for(let x = 0; x < data[y].length; x++){
      if(data[y][x]){
        pointsToCheck.push({x, y});
      }
    }
  }

  while(pointsToCheck.length){

    const pointsToCheckSet: Set<string> = new Set();

    const pointsToRemove: Point[] = [];

    for(const point of pointsToCheck){
      if(checkForOccupiedSpotsAroundPoint(point, data, 4) < 4){
        // point remove point
        if(data[point.y][point.x]){
          // do not check non role points
          pointsToRemove.push(point);
        }
      }
    }

    // remove roles
    for(const pointToRemove of pointsToRemove){
      // justCheck points around removed point next time
      const points = getCoordinatesAroundPoint(pointToRemove, data);

      data[pointToRemove.y][pointToRemove.x] = false;

      for(const pointToAdd of points){
        if(data[pointToAdd.y][pointToAdd.x]){
           pointsToCheckSet.add(`${pointToAdd.y}-${pointToAdd.x}`);
        }
      }
    }

    rolesRemoved += pointsToRemove.length;

    pointsToCheck = [...pointsToCheckSet].map((item) => {
      const [y, x] = item.split('-');
      return {
        x: Number.parseInt(x),
        y: Number.parseInt(y)
      } as Point;
    });
  }

  return rolesRemoved;
};

const expectedSecondSolution = '43';

export { expectedFirstSolution, expectedSecondSolution, first, second };
