import { z } from 'zod'
import bcrypt from 'bcrypt'
import { Router } from 'express'
import { prisma } from '../../utils/prisma'
import { registerValidation } from '../../validations/registerValidation'

export const registerRouter = Router()

registerRouter.all('/register', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'POST')
	res.header('Access-Control-Allow-Headers', 'Content-Type')
	if (req.method === 'POST') {
		next()
	} else {
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
})

registerRouter.post('/register', async (req, res) => {
	try {
		const { name, email, password } = await registerValidation.parseAsync(req.body)

		if (!name || !email || !password) {
			return res.status(400).json({ message: 'Preencha todos os campos' })
		}

		const userExists = await prisma.user.findUnique({
			where: {
				email: email
			}
		})

		if (userExists) {
			return res.status(400).json({ message: 'Usuário já cadastrado' })
		}

		const genSalt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, genSalt)

		const user = await prisma.user.create({
			data: {
				name: name,
				email: email,
				password: hashedPassword
			}
		})

		return res.status(201).json({ message: 'Usuário criado' })
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json(error.errors.map((error) => error.message))
		}
	}
})
