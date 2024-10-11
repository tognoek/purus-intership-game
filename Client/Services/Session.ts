import ISession from "./ISession";

class Session implements ISession {
    private conndcted = false;
    isConnected(): boolean {
        try {
            return this.conndcted;
        } catch (error) {
            throw new Error("Error get connected");
        }
    }
    connect(host: string, port: number): void {
        throw new Error("Method not implemented.");
    }
    send(data: object): void {
        throw new Error("Method not implemented.");
    }
    close(): void {
        throw new Error("Method not implemented.");
    }
    
}