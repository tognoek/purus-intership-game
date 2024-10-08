import * as pc from 'playcanvas';

// Thiết lập canvas và ứng dụng
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const app = new pc.Application(canvas);
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);
window.onresize = () => app.resizeCanvas();
(async () => {
    pc.WasmModule.setConfig('Ammo', {
        glueUrl: './lib/ammo/ammo.wasm.js',
        wasmUrl: './lib/ammo/ammo.wasm.wasm',
        fallbackUrl: './lib/ammo/ammo.js',
    });

    await new Promise((resolve) => {
        pc.WasmModule.getInstance('Ammo', () => resolve());
    });
    app.start();
    const assets = {
        charModelAsset: new pc.Asset('Character', 'model', {
            url: 'Assets/Models/mage.glb',
        }),
        charTextureAsset: new pc.Asset('mage', 'texture', {
            url: 'Assets/Textures/mage.png',
        }),
        charIdleAnimationAsset: new pc.Asset('idle', 'animation', {
            url: 'Assets/Animations/idle.glb',
        }),
        charRunAnimationAsset: new pc.Asset('walk', 'animation', {
            url: 'Assets/Animations/walk.glb',
        }),
    };
    const assetListLoader = new pc.AssetListLoader(
        Object.values(assets),
        app.assets
    );
    assetListLoader.load(() => {
        const characterEntity = new pc.Entity('Character');
        app.root.addChild(characterEntity);
        characterEntity.setPosition(1, 3, 10);
        characterEntity.addComponent('model', {
            type: 'asset',
            asset: assets.charModelAsset,
        });
        characterEntity.addComponent('rigidbody', {
            type: 'dynamic',
        });
        characterEntity.addComponent('collision', {
            type: 'box',
            halfExtents: new pc.Vec3(0.5, 0.5, 0.5),
        });
        const scale = 1;
        characterEntity.setLocalScale(scale, scale, scale);

        // add animation component
        characterEntity.addComponent('animation', {
            assets: [
                assets.charRunAnimationAsset,
                assets.charIdleAnimationAsset,
            ],
        });
        let currentAnim = assets.charIdleAnimationAsset.name;
        console.log(characterEntity.children);
    });
    // Thiết lập trọng lực cho thế giới vật lý
    app.systems.rigidbody.gravity.set(0, -9.81, 0);
    console.log('Physics world initialized');

    // Tạo mặt đất
    const ground = new pc.Entity('Ground');
    app.root.addChild(ground);
    ground.addComponent('model', {
        type: 'box',
    });
    ground.setLocalScale(50, 1, 50);

    // Tạo thành phần Collision và RigidBody cho mặt đất
    ground.addComponent('rigidbody', {
        type: 'static',
    });
    ground.addComponent('collision', {
        type: 'box',
        halfExtents: new pc.Vec3(50, 0.5, 50),
    });

    // Tạo hộp
    const box = new pc.Entity('Box');
    app.root.addChild(box);
    box.addComponent('model', {
        type: 'box',
    });
    box.setPosition(0, 5, 0);

    // Tạo thành phần Collision và RigidBody cho hộp
    box.addComponent('collision', {
        type: 'box',
        halfExtents: new pc.Vec3(0.5, 0.5, 0.5),
    });
    box.addComponent('rigidbody', {
        type: 'dynamic',
        mass: 1,
    });

    // Thêm hộp vào cảnh
    app.root.addChild(box);

    const box1 = new pc.Entity('Box');
    app.root.addChild(box);
    box1.addComponent('model', {
        type: 'box',
    });
    box1.setPosition(10, 5, 0);

    // Tạo thành phần Collision và RigidBody cho hộp
    box1.addComponent('collision', {
        type: 'box',
        halfExtents: new pc.Vec3(0.5, 0.5, 0.5),
    });
    box1.addComponent('rigidbody', {
        type: 'dynamic',
        mass: 1,
    });

    // Thêm hộp vào cảnh
    app.root.addChild(box1);
    // Thêm ánh sáng
    const light = new pc.Entity('Directional Light');
    light.addComponent('light', {
        type: 'directional',
        color: new pc.Color(1, 1, 1),
        intensity: 1,
    });
    light.setLocalEulerAngles(45, 30, 0);
    app.root.addChild(light);

    // Tạo camera
    const camera = new pc.Entity('Camera');
    app.root.addChild(camera);
    camera.addComponent('camera', {
        clearColor: new pc.Color(0.5, 0.5, 0.5),
    });
    camera.setPosition(0, 10, 20);
    camera.lookAt(0, 0, 0);

    // Biến để lưu trữ tốc độ di chuyển
    const speed = 1;
    box.collision?.on('collisionstart', (resolve) => {
        console.log(resolve.other.name);
    });
    // Hàm xử lý sự kiện bàn phím
    const forceMagnitude = 100;
    const moveBox = (event) => {
        const force = new pc.Vec3();

        switch (event.key) {
            case 'w':
            case 'W':
                force.set(0, 0, -forceMagnitude); // Lực lên trên
                // box.translate(0, 10, 0);
                break;
            case 's':
            case 'S':
                force.set(0, 0, forceMagnitude); // Lực xuống dưới
                break;
            case 'a':
            case 'A':
                force.set(-forceMagnitude, 0, 0); // Lực sang trái
                break;
            case 'd':
            case 'D':
                force.set(forceMagnitude, 0, 0); // Lực sang phải
                break;
            default:
                return; // Không làm gì nếu phím không hợp lệ
        }

        // Áp dụng lực vào hộp
        box.rigidbody.applyForce(force);
    };

    // Lắng nghe sự kiện keydown
    window.addEventListener('keydown', moveBox);
})();
