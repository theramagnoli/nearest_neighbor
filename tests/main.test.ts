import { expect, test } from 'bun:test';
import { NodeFileParser } from '../src/NodeFileParser';
import { readFileSync } from 'fs';
import { NnaAlgorithm } from '../src/NnaAlgorithm';
import * as path from 'path';

const DATA_DIR = path.join(__dirname, 'data');

test('Gets a complete TSP tour for 5 nodes', () => {
  const FILE_PATH = path.join(DATA_DIR, 'NODES_5.txt');
  const nodes = NodeFileParser.parse(readFileSync(FILE_PATH, 'utf-8'));

  const nnaAlgorithm = new NnaAlgorithm(nodes);
  const solution = nnaAlgorithm.getTour();

  expect(solution.tour).toHaveLength(6);
  console.log(solution);
});

test('Gets a complete TSP tour for 48 nodes', () => {
  const FILE_PATH = path.join(DATA_DIR, 'NODES_48.txt');
  const nodes = NodeFileParser.parse(readFileSync(FILE_PATH, 'utf-8'));

  const nnaAlgorithm = new NnaAlgorithm(nodes);
  const solution = nnaAlgorithm.getTour();

  expect(solution.tour).toHaveLength(49);
  console.log(solution);
});

test('Gets a complete TSP tour for 101 nodes', () => {
  const FILE_PATH = path.join(DATA_DIR, 'NODES_101.txt');
  const nodes = NodeFileParser.parse(readFileSync(FILE_PATH, 'utf-8'));

  const nnaAlgorithm = new NnaAlgorithm(nodes);
  const solution = nnaAlgorithm.getTour();

  expect(solution.tour).toHaveLength(102);
  console.log(solution);
});
