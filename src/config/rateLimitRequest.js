import { rateLimit } from 'express-rate-limit'
import { LIMIT } from './constant'

export const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: LIMIT || 100, 
	standardHeaders: 'draft-7',
	legacyHeaders: false, 
})