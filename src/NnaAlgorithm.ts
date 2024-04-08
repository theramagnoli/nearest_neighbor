type NodeCoordinates = { id: number; x: number; y: number };

export class NnaAlgorithm {
  nodes: NodeCoordinates[];
  tspTour: NodeCoordinates[];
  constructor(nodes: NodeCoordinates[]) {
    this.nodes = nodes;
  }

  private resetTspTour() {
    this.tspTour = [];
  }

  public getTour() {
    this.resetTspTour();
    let shortestDistanceBetweenNodes = undefined;
    for (let i = 0; i < this.nodes.length - 1; i++) {
      const distanceBetweenNodes = this.getDistanceBetweenNodes(
        this.nodes[i],
        this.nodes[i + 1],
      );
      if (
        distanceBetweenNodes < shortestDistanceBetweenNodes ||
        !shortestDistanceBetweenNodes
      ) {
        shortestDistanceBetweenNodes = distanceBetweenNodes;
        this.resetTspTour();
        this.tspTour.push(this.nodes[i]);
        this.tspTour.push(this.nodes[i + 1]);
      }
    }

    while (this.tspTour.length < this.nodes.length) {
      const lastNode = this.tspTour[this.tspTour.length - 1];
      const nearestNeighbor = this.getNearestAvailableNeighborForNode(lastNode);
      this.tspTour.push(nearestNeighbor);
    }

    const firstNode = this.tspTour[0];
    this.tspTour.push(firstNode);

    return {
      tour: this.tspTour.map((node) => node.id),
      cost: this.getTourCost(),
    };
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

  private getTourCost() {
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
}
