import Messange from "../Services/Messange";

export default class CreateMessege {
    private static instance: CreateMessege;

    public static getInstance(): CreateMessege {
        if (!this.instance) {
            this.instance = new CreateMessege();
        }
        return this.instance;
    }

    public joinRoom(idRoom: string): Messange{
        return new Messange(1, {idRoom: idRoom});
    }
}
