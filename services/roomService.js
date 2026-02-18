// 房间服务
const rooms = new Map();

// 生成6位随机房间码
function generateRoomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 生成随机颜色
function generateRandomColor() {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#D7BDE2'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// 创建房间
function createRoom(playerName) {
  const roomCode = generateRoomCode();
  const playerId = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const room = {
    roomCode,
    players: [
      {
        id: playerId,
        name: playerName,
        score: 0,
        avatar: generateRandomColor(),
        online: true
      }
    ],
    createdAt: new Date(),
    transactions: []
  };
  
  rooms.set(roomCode, room);
  return room;
}

// 加入房间
function joinRoom(roomCode, playerName) {
  const room = rooms.get(roomCode);
  
  if (!room) {
    return null;
  }
  
  if (room.players.length >= 8) {
    return null;
  }
  
  const playerId = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const player = {
    id: playerId,
    name: playerName,
    score: 0,
    avatar: generateRandomColor(),
    online: true
  };
  
  room.players.push(player);
  return room;
}

// 获取房间
function getRoom(roomCode) {
  return rooms.get(roomCode);
}

// 更新玩家在线状态
function updatePlayerOnlineStatus(roomCode, playerId, online) {
  const room = rooms.get(roomCode);
  if (room) {
    const player = room.players.find(p => p.id === playerId);
    if (player) {
      player.online = online;
    }
  }
}

// 移除房间
function removeRoom(roomCode) {
  rooms.delete(roomCode);
}

module.exports = {
  createRoom,
  joinRoom,
  getRoom,
  updatePlayerOnlineStatus,
  removeRoom
};