export default class AttackManager {
    private attacks: Map<string, boolean>;
    readonly data: number[];

    constructor() {
        this.attacks = new Map();
        this.data = [800, 800, 800, 800];
    }
    public getAttack(idPlayer: string) {
        return this.attacks.get(idPlayer);
    }

    public setAttack(idPlayer: string, idChar: number) {
        if (this.getAttack(idPlayer)) {
            return false;
        } else {
            this.attacks.set(idPlayer, true);
            setTimeout(() => {
                this.attacks.delete(idPlayer);
            }, this.data[idChar]);
            return true;
        }
    }

    public getData(){
        // let result: Record<string, boolean>;
        return this.attacks;
    }
}
