import { WebSocket } from 'ws';

import Messenger from './Messenger'

export default interface IHandlerMessenger{
    onConnect(id: string | null): void;
    onConnectFail(): void;
    onMessage(client: WebSocket, msg: Messenger | null): void;
    onDisconnect(): void;
}