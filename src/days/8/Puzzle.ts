type Point = [x: number, y: number, z: number];
type Distance = {from: number, to: number, distance: number, fromCoords: Point, toCoords: Point};

function euclideanDistance(p1: Point, p2: Point){

 return Math.sqrt(
  ((p1[0] - p2[0])**2) +
  ((p1[1] - p2[1])**2) +
  ((p1[2] - p2[2])**2)
 );
}

function createDistances(data: Point[]){
  const distances: Distance[] = []

  const everyDistance: [junctionIndex: number, distance: number][][] = [];

  for(let junction = 0; junction < data.length; junction++){
    everyDistance[junction] = [[0,0]];

    for(let junction2 = junction + 1; junction2 < data.length; junction2++){
      const distance = euclideanDistance(data[junction], data[junction2])

      distances.push({
        from: junction,
        fromCoords: data[junction],
        to: junction2,
        toCoords: data[junction2],
        distance,
      });

      everyDistance[junction].push([junction2, distance] as [number, number]);
    }
  }

  // sort distances
  distances.sort((a,b) => a.distance - b.distance);

  return distances;
}

function addConnectionToCircuits(connection: ReturnType<typeof createDistances>[number], circuits: Set<number>[]){
    const from = connection.from;
    const to = connection.to;

    const fromExists = circuits.findIndex((circuit) => circuit.has(from));
    const toExists = circuits.findIndex((circuit) => circuit.has(to));

    if(fromExists === -1 && toExists === -1){
      circuits.push(new Set([from, to]));
      return circuits;
    }

    if(fromExists !== toExists && fromExists >= 0 && toExists >= 0){
      // combine from and to
      circuits[fromExists] = new Set([...circuits[fromExists], ...circuits[toExists]])

      // remove to index
      circuits.splice(toExists, 1);
      return circuits;
    }

    const addToIndex = Math.max(fromExists, toExists);
    circuits[addToIndex] = new Set([...circuits[addToIndex], from, to]);
    return circuits;
}

const first = (input: string) => {
  const data = input.split("\n").filter(Boolean).map(
    (line) => line.split(',').map((entry) => Number.parseInt(entry)) as Point,
  );

  const distances = createDistances(data);

  // 10 connections
  const CONNECTION_COUNT = data.length === 20 ? 10 : 1000;
  const CIRCUITS_COUNT = 3;

  let circuits: Set<number>[] = [];

  for(let connection = 0; connection < CONNECTION_COUNT; connection++){
    circuits = addConnectionToCircuits(distances[connection], circuits);
  }

  const sum = circuits.map((nodes) => nodes.size).sort((a, b) => b - a).slice(0, CIRCUITS_COUNT).reduce((acc, val) => acc * val, 1);

  // calculate euclidean dinstances
  return sum;
};

const expectedFirstSolution = 40;

const second = (input: string) => {
  const data = input.split("\n").filter(Boolean).map(
    (line) => line.split(',').map((entry) => Number.parseInt(entry)) as Point,
  );

  const distances = createDistances(data);

  // 10 connections
  const CONNECTION_COUNT = data.length === 20 ? 10 : 1000;

  let circuits: Set<number>[] = [];

  for(let connection = 0; connection < CONNECTION_COUNT; connection++){
    circuits = addConnectionToCircuits(distances[connection], circuits);
  }

  // add one connection after another until only one circuit exists
  let distance: Distance | undefined = undefined;

  for(let index = CONNECTION_COUNT; index < distances.length; index++){
    circuits = addConnectionToCircuits(distances[index], circuits);

    if(circuits.length === 1 && circuits[0].size === data.length){
      distance = distances[index]
     break;
    }
  }

  return distance ? distance.fromCoords[0] * distance.toCoords[0] : 0;
};

const expectedSecondSolution = '25272';

export { expectedFirstSolution, expectedSecondSolution, first, second };
