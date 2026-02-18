const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

// 初始化Express应用
const app = express();
const server = http.createServer(app);

// 配置CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// 解析JSON请求体
app.use(express.json());

// 初始化Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// 导入路由
const roomRoutes = require('./routes/room');
const scoreRoutes = require('./routes/score');
const settlementRoutes = require('./routes/settlement');

// 使用路由
app.use('/api/room', roomRoutes);
app.use('/api/score', scoreRoutes);
app.use('/api/settlement', settlementRoutes);

// 导入Socket.IO处理器
const setupSocketHandlers = require('./sockets/room');
setupSocketHandlers(io);

// 根路由
app.get('/', (req, res) => {
  res.json({ message: 'Poker Scoring System API' });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
