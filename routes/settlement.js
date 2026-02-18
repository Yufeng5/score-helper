const express = require('express');
const router = express.Router();
const settlementService = require('../services/settlementService');

// 结算房间
router.post('/:roomCode', (req, res) => {
  try {
    const { roomCode } = req.params;
    
    const result = settlementService.settleRoom(roomCode);
    
    if (!result.success) {
      return res.status(400).json(result);
    }
    
    res.json(result);
  } catch (error) {
    console.error('结算失败:', error);
    res.status(500).json({ success: false, message: '结算失败' });
  }
});

module.exports = router;