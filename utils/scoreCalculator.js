// 分数计算工具

// 计算分数
function calculateScore(cards, hasBomb) {
  let baseAmount;
  
  if (cards >= 1 && cards <= 9) {
    baseAmount = cards * 0.5;
  } else if (cards === 10) {
    baseAmount = 10;
  } else if (cards === 11) {
    baseAmount = 11;
  } else if (cards === 12) {
    baseAmount = 12;
  } else if (cards === 13) {
    baseAmount = 15;
  } else {
    throw new Error('牌数必须在1-13之间');
  }
  
  // 有炸弹则翻倍
  return hasBomb ? baseAmount * 2 : baseAmount;
}

module.exports = {
  calculateScore
};