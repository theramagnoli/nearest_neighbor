export class NodeFileParser {
  public static parse(file: string) {
    return file.split('\n').map((node) => {
      const [id, x, y] = node.split(' ').map(Number);
      return { id, x, y };
    });
  }
}
