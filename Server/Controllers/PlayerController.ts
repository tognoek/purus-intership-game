export function handlerStatus(collision: string[], force: { x: number; y: number; z: number }) {
    let result = 'idle';
    let isJump = true;
    const maxDis = 1;
    collision.forEach((item) => {
        if (item == 'ground') {
            isJump = false;
            if (Math.abs(force.x) >= maxDis || Math.abs(force.z) >= maxDis) {
                result = 'walk';
            } else {
                result = 'idle';
            }
        }
    });
    if (isJump) {
        result = 'jump';
    }
    return result;
}
