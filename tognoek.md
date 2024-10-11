# Áp dụng mẫu thiết kế vào game bắn súng mạng LAN 4 người chơi

Khi phát triển một game bắn súng `mạng LAN` với 4 người chơi, bạn có thể áp dụng các mẫu thiết kế vào nhiều vị trí khác nhau trong game. Dưới đây là một số gợi ý cụ thể về cách sử dụng từng mẫu thiết kế trong bối cảnh của trò chơi:

## 1. Observer
**Vị trí áp dụng**: Quản lý trạng thái của người chơi và môi trường.

- **Mô tả**: Bạn có thể sử dụng mẫu `Observer` để thông báo cho các người chơi (`observers`) về sự thay đổi trạng thái trong game, chẳng hạn như:
  - Thay đổi vị trí của nhân vật.
  - Thay đổi trạng thái của một item (như hồi máu).
  - Cập nhật điểm số khi một người chơi tiêu diệt được một đối thủ.
  
- **Cách thực hiện**: Khi một người chơi thực hiện hành động (như bắn súng), đối tượng `GameState` (subject) sẽ thông báo cho tất cả các người chơi khác về sự kiện này.

## 2. Singleton
**Vị trí áp dụng**: Quản lý trạng thái chung của game.

- **Mô tả**: Bạn có thể sử dụng mẫu `Singleton` để quản lý trạng thái của game (như điểm số, thời gian, số lượng người chơi) và đảm bảo rằng chỉ có một instance của đối tượng này trong suốt trò chơi.
  
- **Cách thực hiện**: Tạo một class `GameManager` sử dụng mẫu `Singleton` để lưu trữ thông tin game và quản lý các sự kiện trong trò chơi.

## 3. Command
**Vị trí áp dụng**: Quản lý các hành động của người chơi.

- **Mô tả**: Bạn có thể sử dụng mẫu `Command` để encapsulate các hành động của người chơi như di chuyển, bắn, hoặc sử dụng item. Điều này sẽ giúp bạn dễ dàng thực hiện các hành động không đồng bộ hoặc hủy bỏ hành động (undo).
  
- **Cách thực hiện**: Tạo các lệnh cụ thể như `MoveCommand`, `ShootCommand`, `UseItemCommand`, và một đối tượng `InputHandler` để xử lý các lệnh khi người chơi nhấn nút.

## 4. Flyweight
**Vị trí áp dụng**: Quản lý các đối tượng giống nhau trong game.

- **Mô tả**: Mẫu `Flyweight` có thể được sử dụng để quản lý các đối tượng giống nhau, như đạn, nhân vật, hoặc các item trong game. Điều này sẽ giúp tiết kiệm bộ nhớ khi có nhiều đối tượng giống nhau được tạo ra.
  
- **Cách thực hiện**: Tạo một `BulletFactory` để quản lý các đối tượng đạn. Nếu có đạn giống nhau được tạo ra, chỉ cần lấy lại instance đã tồn tại thay vì tạo mới.

## 5. State
**Vị trí áp dụng**: Quản lý trạng thái của nhân vật.

- **Mô tả**: Bạn có thể sử dụng mẫu `State` để quản lý các trạng thái của nhân vật trong game, như đang di chuyển, bắn, hồi phục, hoặc chết. Mỗi trạng thái có thể có hành vi riêng.
  
- **Cách thực hiện**: Tạo các trạng thái khác nhau cho nhân vật như `IdleState`, `ShootingState`, `ReloadingState`, và cho phép nhân vật chuyển đổi giữa các trạng thái này dựa trên hành động của người chơi.

## 6. Prototype
**Vị trí áp dụng**: Tạo các đối tượng nhân vật.

- **Mô tả**: Nếu bạn có nhiều nhân vật có các thuộc tính tương tự nhưng có sự khác biệt nhỏ, bạn có thể sử dụng mẫu `Prototype` để clone các đối tượng mà không cần tạo mới từ đầu.
  
- **Cách thực hiện**: Tạo một class `CharacterPrototype` với phương thức `clone()`, và từ đó tạo ra các nhân vật mới với thuộc tính đã định nghĩa sẵn.

## Tóm tắt

Mỗi mẫu thiết kế có thể giúp bạn tổ chức mã của mình tốt hơn và tạo ra một trò chơi hiệu quả hơn. Bằng cách áp dụng các mẫu này một cách hợp lý, bạn có thể dễ dàng quản lý trạng thái, hành động và các đối tượng trong game, từ đó cải thiện hiệu suất và khả năng mở rộng của game.

## 1. Observer
### Ví dụ cụ thể: Cập nhật điểm số
- **Mô tả**: Khi một người chơi tiêu diệt một đối thủ, điểm số của người chơi đó sẽ được cập nhật, và tất cả người chơi khác sẽ được thông báo để cập nhật giao diện người dùng của họ.
- **Cách thực hiện**:

```typescript
interface Observer {
    update(state: string): void;
}

class Player implements Observer {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public update(state: string): void {
        console.log(`${this.name} nhận được thông báo: Trạng thái người chơi thay đổi thành "${state}".`);
    }
}

class Game {
    private observers: Observer[] = [];
    private state: string;

    public addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    public removeObserver(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    public setState(state: string): void {
        this.state = state;
        this.notifyObservers();
    }

    private notifyObservers(): void {
        this.observers.forEach(observer => observer.update(this.state));
    }
}

const game = new Game();
const player1 = new Player("Người chơi 1");
const player2 = new Player("Người chơi 2");

game.addObserver(player1);
game.addObserver(player2);

game.setState("đang chơi"); 
```
## 2. Singleton
### Ví dụ cụ thể: Quản lý game
- **Mô tả**: Một `GameManager` sẽ đảm nhiệm việc theo dõi trạng thái toàn cục của game, bao gồm điểm số, thời gian, và các sự kiện khác.
- **Cách thực hiện**:
``` typescript
class GameManager {
    private static instance: GameManager;
    private score: number = 0;

    private constructor() {}

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    public getScore(): number {
        return this.score;
    }

    public incrementScore(): void {
        this.score += 1;
    }
}

const gameManager = GameManager.getInstance();
gameManager.incrementScore();
console.log(gameManager.getScore());

```
## 3. Command
### Ví dụ cụ thể: Hành động của người chơi
- **Mô tả**: Tạo các lệnh cho các hành động như di chuyển, bắn, và sử dụng item.
- **Cách thực hiện**:

```typescript
interface Command {
    execute(): void;
}

class MoveCommand implements Command {
    private character: Character;
    private direction: string;

    constructor(character: Character, direction: string) {
        this.character = character;
        this.direction = direction;
    }

    public execute(): void {
        this.character.move(this.direction);
    }
}

class ShootCommand implements Command {
    private character: Character;

    constructor(character: Character) {
        this.character = character;
    }

    public execute(): void {
        this.character.shoot();
    }
}

class InputHandler {
    private commands: { [key: string]: Command } = {};

    public setCommand(key: string, command: Command): void {
        this.commands[key] = command;
    }

    public pressKey(key: string): void {
        if (this.commands[key]) {
            this.commands[key].execute();
        }
    }
}

const character = new Character();
const inputHandler = new InputHandler();

inputHandler.setCommand('ArrowUp', new MoveCommand(character, 'up'));
inputHandler.setCommand('Space', new ShootCommand(character));

inputHandler.pressKey('ArrowUp');
inputHandler.pressKey('Space');
```
## 4. Flyweight
### Ví dụ cụ thể: Quản lý đạn
- **Mô tả**: Sử dụng mẫu `Flyweight` để quản lý các đối tượng đạn, tiết kiệm bộ nhớ khi có nhiều đạn giống nhau.
- **Cách thực hiện**:

```typescript
class Bullet {
    private type: string;

    constructor(type: string) {
        this.type = type;
    }

    public shoot(): void {
        console.log(`Shooting a ${this.type} bullet.`);
    }
}

class BulletFactory {
    private bullets: { [key: string]: Bullet } = {};

    public getBullet(type: string): Bullet {
        if (!this.bullets[type]) {
            this.bullets[type] = new Bullet(type);
        }
        return this.bullets[type];
    }
}

const bulletFactory = new BulletFactory();
const bullet1 = bulletFactory.getBullet('explosive');
bullet1.shoot();

const bullet2 = bulletFactory.getBullet('explosive');
bullet2.shoot(); 
```
## 5. State
### Ví dụ cụ thể: Quản lý trạng thái nhân vật
- **Mô tả**: Quản lý các trạng thái khác nhau của nhân vật trong game.
- **Cách thực hiện**:

```typescript
class Character {
    private state: CharacterState;

    constructor() {
        this.state = new IdleState(this);
    }

    public setState(state: CharacterState): void {
        this.state = state;
    }

    public move(): void {
        this.state.move();
    }

    public shoot(): void {
        this.state.shoot();
    }
}

interface CharacterState {
    move(): void;
    shoot(): void;
}

class IdleState implements CharacterState {
    private character: Character;

    constructor(character: Character) {
        this.character = character;
    }

    public move(): void {
        console.log("Character is moving...");
        this.character.setState(new MovingState(this.character));
    }

    public shoot(): void {
        console.log("Character cannot shoot while idle.");
    }
}

class MovingState implements CharacterState {
    private character: Character;

    constructor(character: Character) {
        this.character = character;
    }

    public move(): void {
        console.log("Character is already moving...");
    }

    public shoot(): void {
        console.log("Character shoots while moving!");
        this.character.setState(new IdleState(this.character));
    }
}

const character = new Character();
character.move(); 
character.shoot(); 
```
## 6. Prototype
### Ví dụ cụ thể: Tạo nhân vật
- **Mô tả**: Theo dõi và thông báo cho các đối tượng khác khi trạng thái của người chơi thay đổi.
- **Cách thực hiện**:

```typescript
class CharacterPrototype {
    constructor(public name: string, public health: number) {}

    public clone(): CharacterPrototype {
        return new CharacterPrototype(this.name, this.health);
    }
}

// Sử dụng Prototype
const baseCharacter = new CharacterPrototype("Hero", 100);
const clonedCharacter = baseCharacter.clone();

console.log(clonedCharacter.name); // Hero
console.log(clonedCharacter.health); // 100

```