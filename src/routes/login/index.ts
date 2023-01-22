import { z } from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Router } from 'express'
import { prisma } from '../../utils/prisma'
import { loginValidation } from '../../validations/loginValidation'

export const loginRouter = Router()

loginRouter.all('/login', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'POST')
	res.header('Access-Control-Allow-Headers', 'Content-Type')
	if (req.method === 'POST') {
		next()
	} else {
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
})

loginRouter.post('/login', async (req, res) => {
	try {
		const { email, password } = await loginValidation.parseAsync(req.body)

		if (!email || !password) {
			return res.status(400).json({ message: 'Preencha todos os campos' })
		}

		const user = await prisma.user.findUnique({
			where: {
				email: email
			}
		})

		if (!user) {
			return res.status(400).json({ message: 'Usuário não encontrado' })
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password)

		if (!isPasswordCorrect) {
			return res.status(400).json({ message: 'Senha incorreta' })
		}

		const secret = process.env.JWT_SECRET as string
		const token = jwt.sign({ user }, secret, {
			expiresIn: '7d'
		})

		return res.status(200).json({
			id: user.id,
			name: user.name,
			email: user.email,
			token: token
		})
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json(error.errors.map((error) => error.message))
		}
	}
})
