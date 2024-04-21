import { describe, expect, test } from 'bun:test';
import { NodeFileParser } from '../src/NodeFileParser';
import { readFileSync } from 'fs';
import { NearestNeighborAlgorithm } from '../src/NearestNeighborAlgorithm';
import * as path from 'path';

const DATA_DIR = path.join(__dirname, 'data');

describe('Nearest Neighbor Algorithm Implementation', () => {
  test('Gets a complete TSP tour for 5 nodes', () => {
    const FILE_PATH = path.join(DATA_DIR, 'NODES_5.txt');
    const nodes = NodeFileParser.parse(readFileSync(FILE_PATH, 'utf-8'));
    const nna = new NearestNeighborAlgorithm(nodes, {
      improvedStart: true,
    });
    expect(nna.tspTour).toHaveLength(6);
    nna.printSummary();
  });

  test('Gets a complete TSP tour for 48 nodes', () => {
    const FILE_PATH = path.join(DATA_DIR, 'NODES_48.txt');
    const nodes = NodeFileParser.parse(readFileSync(FILE_PATH, 'utf-8'));
    const nna = new NearestNeighborAlgorithm(nodes, {
      improvedStart: true,
    });
    expect(nna.tspTour).toHaveLength(49);
    nna.printSummary();
  });

  test('Gets a complete TSP tour for 101 nodes', () => {
    const FILE_PATH = path.join(DATA_DIR, 'NODES_101.txt');
    const nodes = NodeFileParser.parse(readFileSync(FILE_PATH, 'utf-8'));
    const nna = new NearestNeighborAlgorithm(nodes, {
      improvedStart: true,
    });
    expect(nna.tspTour).toHaveLength(102);
    nna.printSummary();
  });
});
