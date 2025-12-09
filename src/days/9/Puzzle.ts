type Point = [x: number, y: number];

function getArea(p1: Point, p2: Point){
  const length = Math.abs(p2[0] - p1[0]) + 1;
  const height = Math.abs(p2[1] - p1[1]) + 1;

  return length * height;
}

function parseInput(input: string){
return input.split("\n")
  .filter(Boolean)
  .map((line) => line.split(',').map((point) => Number.parseInt(point)) as Point);
}




const first = (input: string) => {
  const points = parseInput(input);

  let area = 0;

  for(let pointIndex = 0; pointIndex < points.length; pointIndex++){
    for(let pointToCheck = pointIndex + 1; pointToCheck < points.length; pointToCheck++){
      const size = getArea(points[pointIndex], points[pointToCheck]);
      area = Math.max(size, area);
    }
  }

  return area;
};

const expectedFirstSolution = '50';


function inRange(a1: number, a2: number, b1: number, b2: number){
  return !(
    a1 <= b1 && a1 <= b2 &&
    a2 <= b1 && a2 <= b2
  )
  && !(
    a1 >= b1 && a1 >= b2 &&
    a2 >= b1 && a2 >= b2
  );
}

const second = (input: string) => {
  const points = parseInput(input);

  const sides = points
  .map(
    (point, pIndex) => [
      point,
      points[
        pIndex + 1 == points.length ?
        0 : pIndex + 1
      ]
    ] as [point: Point, point: Point]
  );


  const intersectSide = (p1: Point, p2: Point) => {
    return sides.some(
      ([sP1, sP2]) => inRange(sP1[0], sP2[0], p1[0], p2[0])
      && inRange(sP1[1], sP2[1], p1[1], p2[1])
    )
  }

  let area = 0;

  for(let pointIndex = 0; pointIndex < points.length; pointIndex++){
    for(let pointToCheck = pointIndex + 1; pointToCheck < points.length; pointToCheck++){
      // if square does not intersect a side, its a valid square
      if(!intersectSide(points[pointIndex], points[pointToCheck])){
 const size = getArea(points[pointIndex], points[pointToCheck]);
      area = Math.max(size, area);
      }
    }
  }

  return area;
};

const expectedSecondSolution = '24';

export { expectedFirstSolution, expectedSecondSolution, first, second };
