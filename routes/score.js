const express = require('express');
const router = express.Router();
const scoreService = require('../services/scoreService');

// 记分
router.post('/:roomCode', (req, res) => {
  try {
    const { roomCode } = req.params;
    const { winnerId, loserId, cards, hasBomb } = req.body;
    
    if (!winnerId || !loserId || !cards) {
      return res.status(400).json({ success: false, message: '缺少必要参数' });
    }
    
    if (cards < 1 || cards > 13) {
      return res.status(400).json({ success: false, message: '牌数必须在1-13之间' });
    }
    
    const result = scoreService.score(roomCode, {
      winnerId,
      loserId,
      cards,
      hasBomb
    });
    
    if (!result.success) {
      return res.status(400).json(result);
    }
    
    res.json(result);
  } catch (error) {
    console.error('记分失败:', error);
    res.status(500).json({ success: false, message: '记分失败' });
  }
});

module.exports = router;