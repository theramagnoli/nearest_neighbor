import { NodeCoordinates } from './types/NodeCoordinates';
import { TravelingSalesmanAlgorithm } from './TravelingSalesmanAlgorithm';

type CIAConfig = {
  // The index of the node to start the tour from, starting from 0
  startingNode: number;
};

export class CheapestInsertionAlgorithm extends TravelingSalesmanAlgorithm {
  constructor(nodes: NodeCoordinates[], config: CIAConfig) {
    super();
    this.nodes = nodes;
    this.tspTour = [];

    // Step 1. Start with a sub-graph consisting of node i only.
    const startingNode = this.nodes[config.startingNode];
    this.tspTour.push(startingNode);

    // Step 2. Find node r such that cir is minimal and form sub-tour i-r-i.
    let cheapestNode = undefined;
    let cheapestDistance = undefined;
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i] === startingNode) continue;
      const distance = this.getDistanceBetweenNodes(
        startingNode,
        this.nodes[i],
      );
      if (distance < cheapestDistance || !cheapestDistance) {
        cheapestDistance = distance;
        cheapestNode = this.nodes[i];
      }
    }
    this.tspTour.push(cheapestNode);
    this.tspTour.push(startingNode);

    // Step 3. Find (i, j) in sub-tour and r not, such that cir + crj - cij is minimal. Insert r between i and j.
    // Step 3. Find (i, j) in sub-tour and r not in the tour, such that cir + crj - cij is minimal. Insert r between i and j.
    while (this.tspTour.length < this.nodes.length + 1) {
      let minInsertionCost = Infinity;
      let minInsertionNode = null;
      let minInsertionIndex = null;

      for (let r = 0; r < this.nodes.length; r++) {
        if (this.tspTour.includes(this.nodes[r])) continue;
        for (let i = 0; i < this.tspTour.length - 1; i++) {
          const costBeforeInsertion = this.getDistanceBetweenNodes(
            this.tspTour[i],
            this.tspTour[i + 1],
          );
          const costAfterInsertion =
            this.getDistanceBetweenNodes(this.tspTour[i], this.nodes[r]) +
            this.getDistanceBetweenNodes(this.nodes[r], this.tspTour[i + 1]);
          const insertionCost = costAfterInsertion - costBeforeInsertion;
          if (insertionCost < minInsertionCost) {
            minInsertionCost = insertionCost;
            minInsertionNode = this.nodes[r];
            minInsertionIndex = i + 1;
          }
        }
      }
      this.tspTour.splice(minInsertionIndex, 0, minInsertionNode);
    }
  }
}
