// 记分服务
const roomService = require('./roomService');
const { calculateScore } = require('../utils/scoreCalculator');

// 记分
function score(roomCode, data) {
  const { winnerId, loserId, cards, hasBomb } = data;
  
  // 获取房间
  const room = roomService.getRoom(roomCode);
  if (!room) {
    return { success: false, message: '房间不存在' };
  }
  
  // 验证玩家
  const winner = room.players.find(p => p.id === winnerId);
  const loser = room.players.find(p => p.id === loserId);
  
  if (!winner || !loser) {
    return { success: false, message: '玩家不存在' };
  }
  
  // 计算金额
  const amount = calculateScore(cards, hasBomb);
  
  // 更新分数
  winner.score += amount;
  loser.score -= amount;
  
  // 记录交易
  const transaction = {
    id: `trans_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    winnerId,
    winnerName: winner.name,
    loserId,
    loserName: loser.name,
    amount,
    cards,
    hasBomb,
    timestamp: new Date()
  };
  
  room.transactions.push(transaction);
  
  return {
    success: true,
    room,
    transaction,
    amount
  };
}

module.exports = {
  score
};