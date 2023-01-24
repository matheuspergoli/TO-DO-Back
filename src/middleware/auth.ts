import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

interface UserTokenDecoded {
	credentialsForToken: {
		id: string
		name: string
		email: string
	}
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(' ')[1]

	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' })
	}

	try {
		const secret = process.env.JWT_SECRET as string
		const decoded = jwt.verify(token, secret) as UserTokenDecoded
		req.userId = Number(decoded.credentialsForToken.id)
		next()
	} catch (error) {
		return res.status(401).json({ message: 'Invalid Token' })
	}
}
