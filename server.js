// Import thư viện WebSocket
const socket = new WebSocket('wss://test.nameck.tech/ws/');

// Khởi tạo WebSocket server trên cổng 8080
const wss = new WebSocket.Server({ port: 8080 });

// Lắng nghe sự kiện kết nối từ client
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Lắng nghe tin nhắn từ client
    ws.on('message', (message) => {
        console.log('Received: %s', message);

        // Gửi lại tin nhắn cho tất cả các client đã kết nối
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Gửi một thông báo chào khi client kết nối
    ws.send('Welcome to the WebSocket chat!');
});

console.log('WebSocket server is running on ws://localhost:8080');

