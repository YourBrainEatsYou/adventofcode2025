import { init } from "z3-solver";

type Machine = {
  indicatorLights: boolean[],
  buttons: number[][],
  joltage: number[],
}

type Combination<T> =  {
  buttonPresses: number[],
  state: T[],
  valid: boolean;
}

function convertDataToMachines(data: string): Machine[]{
return data.split("\n").filter(Boolean).map((line) => {
    const matches = /\[(?<indicatorLights>.+)\]\s(?<buttons>\(.+\))\s\{(?<joltage>.+)\}/.exec(line);

    return {
      indicatorLights: matches?.groups!.indicatorLights.split('').map((light) => light === '#'),
      buttons: matches?.groups!.buttons.replaceAll(/[()]/gi, '').split(' ').map((btnGroup) => btnGroup.split(',').map((btnNum) => Number.parseInt(btnNum))),
      joltage: matches?.groups!.joltage.split(',').map((joltage) => Number.parseInt(joltage)),
    } as Machine;
  });
}

function pressBtnGroup(state: boolean[], btnGroup: number[]){
  const newState = [...state];

  for(const btn of btnGroup){
    newState[btn] = !newState[btn];
  }

  return newState;
}

function checkState(expectation: boolean[], state: boolean[]){
  return JSON.stringify(expectation) === JSON.stringify(state);
}

const first = (input: string) => {
  const machines = convertDataToMachines(input);

  let sum = 0;

  for(const machine of machines){
    let foundSolution = false;

    let combinations: Combination<boolean>[] = [];

    const initialState = new Array(machine.indicatorLights.length).fill(false);

    for(let btnIndex = 0; btnIndex < machine.buttons.length; btnIndex++){
      const state = pressBtnGroup(initialState, machine.buttons[btnIndex]);
      const valid = checkState(machine.indicatorLights, state);

      combinations.push({buttonPresses: [btnIndex], state, valid});

      if(valid){
        foundSolution = true;
        break;
      }
    }

    while(!foundSolution){
      let newCombinations: Combination<boolean>[] = [];

      for(const combination of combinations){
        for(let btnIndex = 0; btnIndex < machine.buttons.length; btnIndex++){
          const state = pressBtnGroup(combination.state, machine.buttons[btnIndex]);
          const valid = checkState(machine.indicatorLights, state);

          newCombinations.push({buttonPresses: [...combination.buttonPresses, btnIndex], state, valid});

          if(valid){
            foundSolution = true;
            break;
          }
        }

        if(foundSolution){
          break;
        }
      }

      combinations = newCombinations;
    }

    const validSolution = combinations.find((solution) => solution.valid);

    sum += validSolution?.buttonPresses.length ?? 0;
  }


  return sum;
};

const expectedFirstSolution = '7';

function sumSafe(Int: any, terms: any[]) {
  let acc = Int.val(0);
  for (const t of terms) {
    acc = acc.add(t);
  }
  return acc;
}

async function solveMachine(buttons: number[][], targetJoltages: number[]) {
  const { Context } = await init();

  // @ts-expect-error
  const { Optimize, Int } = new Context("main");
  const opt = new Optimize();

  // Each Button has to be pressed >= 0 times
  const presses = buttons.map((_, index) => Int.const(`p_${index}`));
  presses.forEach(press => opt.add(press.ge(0)));


  // add each btn for each joltage to terms
  for (let joltageIndex = 0; joltageIndex < targetJoltages.length; joltageIndex++) {
    const terms = [];

    for (let buttonIndex = 0; buttonIndex < buttons.length; buttonIndex++) {
      if (buttons[buttonIndex].includes(joltageIndex)) {
        terms.push(presses[buttonIndex]);
      }
    }

    const expr = sumSafe(Int, terms);

    opt.add(expr.eq(targetJoltages[joltageIndex]));
  }

  const total = sumSafe(Int, presses);
  opt.minimize(total);

  if (await opt.check() !== "sat") {
    throw new Error("UNSAT");
  }

  const model = opt.model();
  const values = presses.map(p => Number(model.get(p).value()));

  return {
    cost: values.reduce((a, b) => a + b, 0),
    presses: values
  };
}

const second = async (input: string) => {
  const machines = convertDataToMachines(input);

  let sum = 0;

  for(const machine of machines){
    const result1 = await solveMachine(machine.buttons, machine.joltage);
    sum += result1.cost;
  }

  return sum;
};

const expectedSecondSolution = 33;

export { expectedFirstSolution, expectedSecondSolution, first, second };
