import type { Express } from 'express'

declare global {
	namespace Express {
		export interface Request {
			userId?: number
		}
	}
}
