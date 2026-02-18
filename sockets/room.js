// Socket.IO房间处理器
const roomService = require('../services/roomService');

function setupSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log('新的Socket连接:', socket.id);
    
    // 加入房间
    socket.on('joinRoom', (data) => {
      const { roomCode, playerId } = data;
      
      socket.join(roomCode);
      
      // 更新玩家在线状态
      roomService.updatePlayerOnlineStatus(roomCode, playerId, true);
      
      // 广播玩家加入
      io.to(roomCode).emit('playerJoined', {
        playerId,
        roomCode,
        timestamp: new Date()
      });
    });
    
    // 离开房间
    socket.on('leaveRoom', (data) => {
      const { roomCode, playerId } = data;
      
      socket.leave(roomCode);
      
      // 更新玩家在线状态
      roomService.updatePlayerOnlineStatus(roomCode, playerId, false);
      
      // 广播玩家离开
      io.to(roomCode).emit('playerLeft', {
        playerId,
        roomCode,
        timestamp: new Date()
      });
    });
    
    // 分数更新
    socket.on('scoreUpdated', (data) => {
      const { roomCode, winnerId, loserId, amount, cards, hasBomb, winnerName, loserName } = data;
      
      // 广播分数更新
      io.to(roomCode).emit('scoreUpdate', {
        winnerId,
        loserId,
        winnerName,
        loserName,
        amount,
        cards,
        hasBomb,
        timestamp: new Date()
      });
    });
    
    // 断开连接
    socket.on('disconnect', () => {
      console.log('Socket连接断开:', socket.id);
    });
  });
}

module.exports = setupSocketHandlers;