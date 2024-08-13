import express from 'express';
import { registerToken, sendNotificationToAll } from '../controllers/notificationController.js';

const router = express.Router();

router.post('/register', registerToken);
router.post('/send-notification', sendNotificationToAll);

export default router;
