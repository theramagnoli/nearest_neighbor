import { describe, expect, test } from 'bun:test';
import { NodeFileParser } from '../src/NodeFileParser';
import { readFileSync } from 'fs';
import { CheapestInsertionAlgorithm } from '../src/CheapestInsertionAlgorithm';
import * as path from 'path';

const DATA_DIR = path.join(__dirname, 'data');

describe('Cheapest Insertion Algorithm Implementation', () => {
  test('Gets a complete TSP tour for 5 nodes', () => {
    const FILE_PATH = path.join(DATA_DIR, 'NODES_5.txt');
    const nodes = NodeFileParser.parse(readFileSync(FILE_PATH, 'utf-8'));
    const cia = new CheapestInsertionAlgorithm(nodes, { startingNode: 0 });
    expect(cia.tspTour).toHaveLength(6);
    cia.printSummary();
  });

  test('Gets a complete TSP tour for 48 nodes', () => {
    const FILE_PATH = path.join(DATA_DIR, 'NODES_48.txt');
    const nodes = NodeFileParser.parse(readFileSync(FILE_PATH, 'utf-8'));
    const cia = new CheapestInsertionAlgorithm(nodes, { startingNode: 0 });
    expect(cia.tspTour).toHaveLength(49);
    cia.printSummary();
  });

  test('Gets a complete TSP tour for 101 nodes', () => {
    const FILE_PATH = path.join(DATA_DIR, 'NODES_101.txt');
    const nodes = NodeFileParser.parse(readFileSync(FILE_PATH, 'utf-8'));
    const cia = new CheapestInsertionAlgorithm(nodes, { startingNode: 0 });
    expect(cia.tspTour).toHaveLength(102);
    cia.printSummary();
  });
});
