function parseInput(input: string){
  const data = input.trim().split("\n\n");
  const trees = data.pop()!;

  return {
    packages: data.map((pkg) => {
      const shape = pkg.split("\n").toSpliced(0, 1).map((row) => row.split('').map<number>((val) => val === '#' ? 1 : 0));
      const area = shape.reduce((acc, val) => acc + val.reduce((rowAcc, innerVal) => rowAcc + innerVal, 0), 0);

      return {
        shape,
        area,
      }
    }),

    trees: trees.split('\n').map((tree) => {
      const treeData = tree.split(': ');
      const area = treeData.shift()?.split('x').reduce((acc, val) => acc * Number.parseInt(val), 1);

      const packages = treeData.flatMap((tree) => tree.split(' ').map((val) => Number.parseInt(val)));

      return {
        area,
        packages
      };
  }),
  }
}

const first = (input: string) => {
  const data = parseInput(input);

  let sum = 0;

  for(const tree of data.trees){

    const packageSum = tree.packages.reduce((acc, pkgCount, pkgIndex) => acc + (pkgCount * data.packages[pkgIndex].area), 0);


    if((tree.area || 0) >= packageSum){
      sum++;
    }
  }

  // why tho.... eventually if the square get too big, there is no need for micro management?
  return sum;
};

const expectedFirstSolution = '2';

const second = (input: string) => {
  return 'free';
};

const expectedSecondSolution = 'free';

export { expectedFirstSolution, expectedSecondSolution, first, second };
