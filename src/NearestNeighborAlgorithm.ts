import { NodeCoordinates } from './types/NodeCoordinates';
import { TravelingSalesmanAlgorithm } from './TravelingSalesmanAlgorithm';

type NNAConfig = { improvedStart: boolean };

export class NearestNeighborAlgorithm extends TravelingSalesmanAlgorithm {
  config: NNAConfig;
  private extras = { minArcDistance: undefined };
  constructor(
    nodes: NodeCoordinates[],
    config: NNAConfig = { improvedStart: false },
  ) {
    super();
    this.nodes = nodes;
    this.config = config;
    this.tspTour = [];
    let shortestDistanceBetweenNodes = undefined;
    if (this.config.improvedStart) {
      for (let i = 0; i < this.nodes.length - 1; i++) {
        for (let j = i + 1; j < this.nodes.length; j++) {
          const distanceBetweenCurrentNodes = this.getDistanceBetweenNodes(
            this.nodes[i],
            this.nodes[j],
          );
          if (
            distanceBetweenCurrentNodes < shortestDistanceBetweenNodes ||
            !shortestDistanceBetweenNodes
          ) {
            shortestDistanceBetweenNodes = distanceBetweenCurrentNodes;
            this.tspTour = [];
            this.tspTour.push(this.nodes[i]);
            this.tspTour.push(this.nodes[i + 1]);
          }
        }
      }
      this.extras.minArcDistance = shortestDistanceBetweenNodes;
    }
    let startingNode = undefined;
    if (!this.config.improvedStart) {
      startingNode = this.nodes.find((node) => node.id === 1);
      this.tspTour.push(startingNode);
    }
    while (this.tspTour.length < this.nodes.length) {
      const lastNode = this.tspTour[this.tspTour.length - 1] || startingNode;
      const nearestNeighbor = this.getNearestAvailableNeighborForNode(lastNode);
      this.tspTour.push(nearestNeighbor);
    }
    const firstNode = this.tspTour[0];
    this.tspTour.push(firstNode);
  }
  private getNearestAvailableNeighborForNode(node: NodeCoordinates) {
    let nearestNeighbor = undefined;
    let shortestDistance = undefined;
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i] === node || this.tspTour.includes(this.nodes[i]))
        continue;
      const distance = this.getDistanceBetweenNodes(node, this.nodes[i]);
      if (distance < shortestDistance || !shortestDistance) {
        shortestDistance = distance;
        nearestNeighbor = this.nodes[i];
      }
    }
    return nearestNeighbor;
  }
}
