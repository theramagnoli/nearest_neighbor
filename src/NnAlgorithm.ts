type NodeCoordinates = { id: number; x: number; y: number };
type nnAlgorithmConfig = { improvedStart: boolean };

export class NnAlgorithm {
  nodes: NodeCoordinates[];
  tspTour: NodeCoordinates[];
  config: nnAlgorithmConfig;
  private extras = { minArcDistance: undefined };
  constructor(
    nodes: NodeCoordinates[],
    config: nnAlgorithmConfig = { improvedStart: false },
  ) {
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
  private getDistanceBetweenNodes(a: NodeCoordinates, b: NodeCoordinates) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }
  public getTourCost() {
    let cost = 0;
    for (let i = 0; i < this.tspTour.length - 1; i++) {
      cost += this.getDistanceBetweenNodes(
        this.tspTour[i],
        this.tspTour[i + 1],
      );
    }
    return cost;
  }
  public getTourString() {
    return this.tspTour.map((node) => node.id).join(' -> ');
  }
  printSummary() {
    console.log(`# of nodes: ${this.nodes.length}`);
    console.log(
      `Improved start: ${this.config.improvedStart} | Min arc distance: ${this.extras.minArcDistance}`,
    );
    console.log(`Tour: ${this.getTourString()}`);
    console.log(`Cost: ${this.getTourCost()}\n`);
  }
}
