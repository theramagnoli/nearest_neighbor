import { expect, test } from 'bun:test';
import { NodeFileParser } from '../src/NodeFileParser';
import { readFileSync } from 'fs';
import { NnAlgorithm } from '../src/NnAlgorithm';
import * as path from 'path';

const DATA_DIR = path.join(__dirname, 'data');

test('Gets a complete TSP tour for 5 nodes', () => {
  const FILE_PATH = path.join(DATA_DIR, 'NODES_5.txt');
  const nodes = NodeFileParser.parse(readFileSync(FILE_PATH, 'utf-8'));

  const improvedNnAlgorithm = new NnAlgorithm(nodes, { improvedStart: true });
  const unimprovedNnAlgorithm = new NnAlgorithm(nodes);

  expect(improvedNnAlgorithm.tspTour).toHaveLength(6);
  expect(unimprovedNnAlgorithm.tspTour).toHaveLength(6);

  improvedNnAlgorithm.printSummary();
  unimprovedNnAlgorithm.printSummary();
});

test('Gets a complete TSP tour for 48 nodes', () => {
  const FILE_PATH = path.join(DATA_DIR, 'NODES_48.txt');
  const nodes = NodeFileParser.parse(readFileSync(FILE_PATH, 'utf-8'));

  const improvedNnAlgorithm = new NnAlgorithm(nodes, { improvedStart: true });
  const unimprovedNnAlgorithm = new NnAlgorithm(nodes);

  expect(improvedNnAlgorithm.tspTour).toHaveLength(49);
  expect(unimprovedNnAlgorithm.tspTour).toHaveLength(49);

  improvedNnAlgorithm.printSummary();
  unimprovedNnAlgorithm.printSummary();
});

test('Gets a complete TSP tour for 101 nodes', () => {
  const FILE_PATH = path.join(DATA_DIR, 'NODES_101.txt');
  const nodes = NodeFileParser.parse(readFileSync(FILE_PATH, 'utf-8'));

  const improvedNnAlgorithm = new NnAlgorithm(nodes, { improvedStart: true });
  const unimprovedNnAlgorithm = new NnAlgorithm(nodes);

  expect(improvedNnAlgorithm.tspTour).toHaveLength(102);
  expect(unimprovedNnAlgorithm.tspTour).toHaveLength(102);

  improvedNnAlgorithm.printSummary();
  unimprovedNnAlgorithm.printSummary();
});
