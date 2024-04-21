import { NodeCoordinates } from './types/NodeCoordinates';

export class TravelingSalesmanAlgorithm {
  tspTour: NodeCoordinates[];
  nodes: NodeCoordinates[];
  public getDistanceBetweenNodes(a: NodeCoordinates, b: NodeCoordinates) {
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
    console.log(`Tour: ${this.getTourString()}`);
    console.log(`Cost: ${this.getTourCost()}\n`);
  }
}
