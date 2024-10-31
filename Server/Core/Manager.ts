import AttackManager from '../Manager/AttackManager';
import RoomManager from '../Manager/RoomManager';
import WorldManager from '../Manager/WorldManager';
import generateSevenDigitNumber from '../Utils/Math';

export default class Manager {
    public static instance: Manager;

    private roomManager: RoomManager;
    private worldManager: WorldManager;
    private attackManager: AttackManager;

    private constructor() {
        this.roomManager = new RoomManager();
        this.worldManager = new WorldManager();
        this.attackManager = new AttackManager();
    }

    public static gI(): Manager {
        if (!Manager.instance) {
            Manager.instance = new Manager();
        }
        return Manager.instance;
    }

    public newRoom(idUser: string) {
        let idRoomRand = generateSevenDigitNumber().toString();
        while (this.roomManager.checkRoom(idRoomRand)) {
            idRoomRand = generateSevenDigitNumber().toString();
        }
        this.roomManager.newRoom(idRoomRand);
        this.worldManager.newWorld(idRoomRand);
        this.joinRoom(idRoomRand, idUser);
    }

    public joinRoom(idRoom: string, idPlayer: string) {
        if (this.roomManager.addPlayer(idRoom, idPlayer)) {
            this.worldManager.addPlayer(idRoom, idPlayer);
        }
    }

    public getIdRoomByIdPlayer(idPlayer: string) {
        return this.roomManager.getIdRoomByIdPlayer(idPlayer);
    }

    public removePlayer(idPlayer: string) {
        const idRoom = this.roomManager.getIdRoomByIdPlayer(idPlayer);
        this.roomManager.removePlayer(idPlayer);
        this.worldManager.removePlayer(idRoom!, idPlayer);
    }

    public applyForce(idPlayer: string, force: { x: number; y: number; z: number }) {
        let idRoom = this.roomManager.getIdRoomByIdPlayer(idPlayer);
        if (!idRoom) {
            return;
        }
        if (this.attackManager.getAttack(idPlayer)) {
            return;
        }
        if (this.roomManager.getStatus(idRoom) != 'play') {
            return;
        }
        this.worldManager.getWorld(idRoom)?.applyForce(idPlayer, force);
    }

    public applyVelocity(
        idPlayer: string,
        velocity: { x: number; y: number; z: number },
        angle: number
    ) {
        let idRoom = this.roomManager.getIdRoomByIdPlayer(idPlayer);
        if (!idRoom) {
            return;
        }
        if (this.attackManager.getAttack(idPlayer)) {
            return;
        }
        if (this.roomManager.getStatus(idRoom) != 'play') {
            return;
        }
        this.worldManager.getWorld(idRoom)?.applyVelocity(idPlayer, velocity, angle);
    }

    public attack(idPlayer: string) {
        let idRoom = this.roomManager.getIdRoomByIdPlayer(idPlayer);
        if (!idRoom) {
            return;
        }
        if (this.roomManager.getStatus(idRoom) != 'play') {
            return;
        }
        const idChar = this.roomManager.getPlayer(idPlayer)!.getChar();
        if (this.attackManager.setAttack(idPlayer, idChar)) {
            this.worldManager.addProjectile(idRoom, idPlayer, idChar);
        }
    }

    public getStatus(id: string){
        return this.roomManager.getStatus(id);
    }

    public updateWord() {
        this.worldManager.update();
        this.roomManager.update();
        const dataAttack = this.worldManager.getCollisonProjectile();
        dataAttack.forEach((data) => {
            this.roomManager.updateAttack(data);
        });
        const playerDies = this.roomManager.getPlayerDies();
        for (const idRoom in playerDies){
            const dataPlayerDies = playerDies[idRoom];
            dataPlayerDies.forEach(idPlayer => {
                this.worldManager.resetPlayer(idRoom, idPlayer);
                this.roomManager.revivePlayer(idPlayer);
            })
        }
        const roomDie = this.roomManager.getRoomEnd();
        roomDie.forEach(idRoom => {
            this.roomManager.removeRoom(idRoom);
            this.worldManager.removeWorld(idRoom);
        })
    }

    public getSizeMax(): number{
        return this.roomManager.maxSize;
    }

    public getDataPositionAll(): Record<string, any> {
        return this.worldManager.getPositions();
    }

    public getAnyAll(): Record<string, any> {
        return this.worldManager.getAnys();
    }

    public getDataCharAll(): Record<string, any> {
        return this.roomManager.getDataChars();
    }
    public getDataForceAll(): Record<string, any> {
        return this.worldManager.getForces();
    }
    public getDataCollisionAll(): Record<string, any> {
        return this.worldManager.getCollisions();
    }

    public getDataAttackAll() {
        return this.attackManager.getData();
    }

    public getDataProjectileAll() {
        return this.worldManager.getProjectiles();
    }

    public getDataPlayerAll() {
        return this.roomManager.getAllDataPlayer();
    }
    public getDataTimeAll(){
        return this.roomManager.getAllDataTime();
    }
    public getDataScoreAll() {
        return this.roomManager.getAllDataScore();
    }
    public getDataNamePlayerAll(){
        return this.roomManager.getDataNamePlayer();
    }
    public getDataSizeRoomAll() {
        return this.roomManager.getDataSizeRooms();
    }
}
