export function rotateAroundY(center: {x: number, y: number, z: number}, dx: number, dz: number, angle: number): {x: number, y: number, z: number} {
    const theta = degToRad(angle);
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);

    const x = center.x + dx * cosTheta - dz * sinTheta;
    const y = center.y; 
    const z = center.z + dx * sinTheta + dz * cosTheta;

    return {x: x, y: y, z: z};
}
export function degToRad(deg: number) {
    return deg * (Math.PI / 180);
}
