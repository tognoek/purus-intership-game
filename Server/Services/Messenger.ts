export default class Messenger {
    private id: number;
    private data: object;
    private idUser: string | null;
    constructor(id: number, data: object = {}) {
        this.id = id;
        this.data = data;
        this.idUser = null;
    }
    public getId(): number {
        return this.id;
    }
    public getData(): object {
        return this.data;
    }
    public updateData(data: object){
        this.data = {...this.data, ...data}
    }
    public setUser(id: string | undefined) {
        this.idUser = id ?? null;
    }
    public getUser() {
        return this.idUser;
    }
    public toString(): string {
        return `id: ${this.id}, data: ${JSON.stringify(this.data)}`;
    }
    public static fromString(str: string): Messenger | null {
        const parts = str.split(', data: ');

        if (parts.length === 2) {
            const idPart = parts[0].replace('id: ', '').trim();
            const dataPart = parts[1].trim();
            const id = parseInt(idPart);
            const data = JSON.parse(dataPart);

            return new Messenger(id, data);
        }

        return null;
    }
}
