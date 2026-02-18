// 结算服务
const roomService = require('./roomService');

// 结算房间
function settleRoom(roomCode) {
  // 获取房间
  const room = roomService.getRoom(roomCode);
  if (!room) {
    return { success: false, message: '房间不存在' };
  }
  
  // 生成最优转账方案
  const transferPlan = generateOptimalTransferPlan(room.players);
  
  // 保存结算信息
  const settlement = {
    roomCode,
    players: room.players.map(p => ({ ...p })),
    transferPlan,
    settlementTime: new Date(),
    transactions: [...room.transactions]
  };
  
  // 移除房间（可选，根据业务需求）
  // roomService.removeRoom(roomCode);
  
  return {
    success: true,
    settlement,
    transferPlan
  };
}

// 生成最优转账方案（最小转账次数）
function generateOptimalTransferPlan(players) {
  // 过滤出需要转账的玩家
  const creditors = players.filter(p => p.score > 0).map(p => ({ ...p }));
  const debtors = players.filter(p => p.score < 0).map(p => ({ ...p, score: Math.abs(p.score) }));
  
  const transferPlan = [];
  
  let creditorIndex = 0;
  let debtorIndex = 0;
  
  while (creditorIndex < creditors.length && debtorIndex < debtors.length) {
    const creditor = creditors[creditorIndex];
    const debtor = debtors[debtorIndex];
    
    const transferAmount = Math.min(creditor.score, debtor.score);
    
    transferPlan.push({
      fromId: debtor.id,
      fromName: debtor.name,
      toId: creditor.id,
      toName: creditor.name,
      amount: transferAmount
    });
    
    // 更新余额
    creditor.score -= transferAmount;
    debtor.score -= transferAmount;
    
    // 移动指针
    if (creditor.score === 0) {
      creditorIndex++;
    }
    
    if (debtor.score === 0) {
      debtorIndex++;
    }
  }
  
  return transferPlan;
}

module.exports = {
  settleRoom,
  generateOptimalTransferPlan
};