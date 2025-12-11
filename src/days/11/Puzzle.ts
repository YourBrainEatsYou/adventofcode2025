
type Node = {
  node: string;
  children: string[];
}

function parseInput(input: string){
  return input
    .split("\n")
    .filter(Boolean)
    .map(
      (line) => {
        const [node, children] = line.split(': ') as [node: string, children: string];

        return {
          node,
          children: children.split(' '),
        } as Node
      }
    );
}

// Depth First Search (DFS)
const cache1 = {};

function dfs(src: number, dest: number, graph: number[][], path: number[], allPaths: number[][]){
  // add current position to path
  path.push(src);

  if(src === dest){
    // reached destination
    allPaths.push([...path]);

  }else{
    for(let child of graph[src]){
      dfs(child, dest, graph, path, allPaths);
    }
  }

  path.pop();
}

function buildGraph(nodesCount: number, edges: [from: number, to: number][]){
  const graph = Array.from({length: nodesCount}, () => [] as number[]);

  for(const edge of edges){
    graph[edge[0]].push(edge[1]);
  }

  return graph;
}

function findPaths(nodesCount: number, edges: [from: number, to: number][], src: number, dest: number){
  const graph = buildGraph(nodesCount, edges);

  const path: number[] = [];
  const allPaths: number[][] = [];

  // recursive dfs call
  dfs(src, dest, graph, path, allPaths);

  return allPaths;
}

const first = (input: string) => {
  const data = parseInput(input);

  // used to translate index to node name
  const nodeSet = [...new Set([...data.map((node) => node.node), ...data.flatMap((node) => node.children)])];

  const src = nodeSet.indexOf('you');
  const dest = nodeSet.indexOf('out');

  // convert to edges
  const edges: [from: number, to: number][] = [];

  for(const node of data){
    const nodeIndex = nodeSet.indexOf(node.node);
    for(const child of node.children){
      edges.push([nodeIndex, nodeSet.indexOf(child)])
    }
  }

  const paths = findPaths(nodeSet.length, edges, src, dest);

  return paths.length;
};

const expectedFirstSolution = '5';

// DFS implementation with caching and just counts the paths to a specific node.
function dfsCount(src: number, dest: number, via: [key: number, visited: boolean][], graph: number[][], cache: Map<string, number>){
  via = via.map(([key, visited]) => [key, visited || src === key]);

  if(src === dest){
    // return 1 when all vias are visited
    return via.some(([,visited]) => !visited) ? 0 : 1;
  }

  const key = [src, ...via.map(([,visited]) => visited)].join('|');

  if(cache.has(key)){
    return cache.get(key);
  }

  let count = 0;

  for(let child of graph[src]){
    count += dfsCount(child, dest, via, graph, cache) || 0;
  }

  cache.set(key, count);

  return count;
}

const second = (input: string) => {
  const data = parseInput(input);

  // used to translate index to node name
  const nodeSet = [...new Set([...data.map((node) => node.node), ...data.flatMap((node) => node.children)])];

  const src = nodeSet.indexOf('svr');
  const dac = nodeSet.indexOf('dac');
  const fft = nodeSet.indexOf('fft');
  const dest = nodeSet.indexOf('out');

  // convert to edges
  const edges: [from: number, to: number][] = [];

  for(const node of data){
    const nodeIndex = nodeSet.indexOf(node.node);
    for(const child of node.children){
      edges.push([nodeIndex, nodeSet.indexOf(child)])
    }
  }

  const graph = buildGraph(nodeSet.length, edges);

  const cache = new Map<string, number>();

  return dfsCount(src, dest, [[dac, false], [fft, false]], graph, cache);
};

const expectedSecondSolution = '2';

export { expectedFirstSolution, expectedSecondSolution, first, second };
