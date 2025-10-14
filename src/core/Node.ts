export class Node {
  public x: number;
  public y: number;
  public custoTerreno: number;
  public g: number = 0;
  public h: number = 0;
  public f: number = 0;
  public pai: Node | null = null;

  constructor(x: number, y: number, custoTerreno: number) {
    this.x = x;
    this.y = y;
    this.custoTerreno = custoTerreno;
  }

  public iguais(outroNode: Node): boolean {
    return this.x === outroNode.x && this.y === outroNode.y;
  }
}
