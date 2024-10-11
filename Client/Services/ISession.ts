export default interface ISession {
    isConnected(): boolean;
    connect(host: string, port: number): void;
    send(data: object): void;
    close(): void;
}
