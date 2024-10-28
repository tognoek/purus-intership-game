export default class Colum {
    private x: number;
    private y: number;
    private z: number;
    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public is(x: number, y: number, z: number) {
        return this.x == x && this.y == y && this.z == z;
    }
}
