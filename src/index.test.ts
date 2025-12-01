import { readdirSync } from 'node:fs';
import { describe, it, type TestContext } from 'node:test';
import type { Puzzle } from './types/Puzzle.ts';
import readFile from './utils/readFile.ts';

describe('AoC test runner', () => {
  const dirs = readdirSync('./src/days', { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const day of dirs) {
    it(`Tests day ${day} 1`, async (t: TestContext) => {
      let exampleOneInput = '';
      const puzzleName = day;

      try {
        const puzzlePath = `src/days/${puzzleName}`;
        exampleOneInput = await readFile(`${puzzlePath}/example-test-1.txt`);
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
      const {
        first,
        expectedFirstSolution,
      }: Puzzle = await import(`./days/${puzzleName}/Puzzle.ts`);

      t.assert.deepStrictEqual(
        first(exampleOneInput).toString(),
        expectedFirstSolution.toString()
      );
    });
    it(`Tests day ${day} 2`, async (t: TestContext) => {
      let exampleTwoInput = '';
      const puzzleName = day;

      try {
        const puzzlePath = `src/days/${puzzleName}`;
        exampleTwoInput = await readFile(`${puzzlePath}/example-test-2.txt`);
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
      const {
        second,
        expectedSecondSolution,
      }: Puzzle = await import(`./days/${puzzleName}/Puzzle.ts`);

      t.assert.deepStrictEqual(
        second(exampleTwoInput).toString(),
        expectedSecondSolution.toString()
      );
    });
  }
});
