const express = require('express');
const router = express.Router();
const roomService = require('../services/roomService');

// 创建房间
router.post('/create', (req, res) => {
  try {
    const { playerName } = req.body;
    if (!playerName) {
      return res.status(400).json({ success: false, message: '请输入玩家名称' });
    }
    
    const room = roomService.createRoom(playerName);
    res.json({ success: true, room });
  } catch (error) {
    console.error('创建房间失败:', error);
    res.status(500).json({ success: false, message: '创建房间失败' });
  }
});

// 加入房间
router.post('/join', (req, res) => {
  try {
    const { roomCode, playerName } = req.body;
    if (!roomCode || !playerName) {
      return res.status(400).json({ success: false, message: '请输入房间号和玩家名称' });
    }
    
    const room = roomService.joinRoom(roomCode, playerName);
    if (!room) {
      return res.status(404).json({ success: false, message: '房间不存在或已满' });
    }
    
    res.json({ success: true, room });
  } catch (error) {
    console.error('加入房间失败:', error);
    res.status(500).json({ success: false, message: '加入房间失败' });
  }
});

// 获取房间信息
router.get('/:roomCode', (req, res) => {
  try {
    const { roomCode } = req.params;
    const room = roomService.getRoom(roomCode);
    
    if (!room) {
      return res.status(404).json({ success: false, message: '房间不存在' });
    }
    
    res.json({ success: true, room });
  } catch (error) {
    console.error('获取房间信息失败:', error);
    res.status(500).json({ success: false, message: '获取房间信息失败' });
  }
});

module.exports = router;