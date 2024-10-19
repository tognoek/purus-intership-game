import * as pc from 'playcanvas';

export function rotateAroundY(center: pc.Vec3, dx: number, dz: number, angle: number): pc.Vec3 {
    const theta = degToRad(angle);

    const cosTheta = Math.cos(theta);

    const sinTheta = Math.sin(theta);

    const x = center.x + dx * cosTheta - dz * sinTheta;

    const y = center.y;
    const z = center.z + dx * sinTheta + dz * cosTheta;

    return new pc.Vec3(x, y, z);
}
export function degToRad(deg: number) {
    return deg * (Math.PI / 180);
}


