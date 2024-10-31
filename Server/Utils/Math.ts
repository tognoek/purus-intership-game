export function rotateAroundY(
    center: { x: number; y: number; z: number },
    dx: number,
    dz: number,
    angle: number
): { x: number; y: number; z: number } {
    const theta = degToRad(angle);
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);

    const x = center.x + dx * cosTheta - dz * sinTheta;
    const y = center.y;
    const z = center.z + dx * sinTheta + dz * cosTheta;

    return { x: x, y: y, z: z };
}
export function degToRad(deg: number) {
    return deg * (Math.PI / 180);
}

export function generateUniqueRandomArray(size: number): number[] {
    const result: number[] = [];
    let availableNumbers = [];
    for (let number = 1; number <= size; number++) {
        availableNumbers.push(number);
    }

    while (result.length < size && availableNumbers.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        result.push(availableNumbers[randomIndex]);
        availableNumbers.splice(randomIndex, 1);
    }

    return result;
}

export function randonUnique(is: boolean[], size: number) {
    let result = Math.floor(Math.random() * size);
    while (is[result]) {
        result = Math.floor(Math.random() * size);
    }
    return result;
}

export default function generateSevenDigitNumber(): number {
    const firstDigit = Math.floor(Math.random() * 9) + 1;

    let remainingDigits = '';
    for (let i = 0; i < 6; i++) {
        remainingDigits += Math.floor(Math.random() * 10);
    }

    const sevenDigitNumber = parseInt(`${firstDigit}${remainingDigits}`, 10);
    // return sevenDigitNumber;
    return 1111111;
}
