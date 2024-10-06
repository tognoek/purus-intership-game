var socket = new WebSocket('ws://192.168.1.9:1582'); // Thay địa chỉ IP của máy server

socket.onopen = function() {
    console.log('Connected to server');
};

socket.addEventListener('message', (msg) => {
    console.log(msg.data);
});

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    if (data.action === 'move') {
        // Cập nhật vị trí của khối của người chơi khác
        // Giả sử có một entity để đại diện cho người chơi khác
        var otherPlayer = app.root.findByName('OtherPlayer');
        otherPlayer.setPosition(data.position.x, data.position.y, data.position.z);
    }
};

// Hàm gửi vị trí của người chơi hiện tại đến server
function sendPosition() {
    var position = player.getPosition();
    var message = {
        action: 'move',
        position: {
            x: position.x,
            y: position.y,
            z: position.z
        }
    };
    socket.send(JSON.stringify(message));
}

// Gọi hàm gửi vị trí mỗi khi di chuyển
app.on('update', function(dt) {
    if (app.keyboard.isPressed(pc.KEY_LEFT)) {
        player.translate(-0.1, 0, 0);
        sendPosition();
    }
    if (app.keyboard.isPressed(pc.KEY_RIGHT)) {
        player.translate(0.1, 0, 0);
        sendPosition();
    }
    if (app.keyboard.isPressed(pc.KEY_UP)) {
        player.translate(0, 0, -0.1);
        sendPosition();
    }
    if (app.keyboard.isPressed(pc.KEY_DOWN)) {
        player.translate(0, 0, 0.1);
        sendPosition();
    }
});
