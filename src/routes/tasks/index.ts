import { z } from 'zod'
import { Router } from 'express'
import { prisma } from '../../utils/prisma'
import { tasksValidation } from '../../validations/tasksValidation'

export const tasksRouter = Router()

tasksRouter.get('/tasks', async (req, res) => {
	const userId = req.userId
	let { page, qty } = req.query as any
	page === undefined ? (page = 1) : ''
	qty === undefined ? (qty = 5) : ''

	const tasks = await prisma.$transaction([
		prisma.toDo.count({
			where: {
				userId: userId
			}
		}),
		prisma.toDo.findMany({
			skip: (Number(page) - 1) * Number(qty),
			take: Number(qty),
			where: {
				userId: userId
			}
		})
	])
	return res.status(200).json(tasks)
})

tasksRouter.delete('/tasks/:id', async (req, res) => {
	const taskId = Number(req.params.id)
	const userId = req.userId

	const task = await prisma.toDo.findUnique({
		where: {
			id: taskId
		}
	})

	if (task?.userId === userId) {
		await prisma.toDo.delete({
			where: {
				id: taskId
			}
		})

		return res.status(200).json({ message: 'Tarefa deletada com sucesso' })
	} else {
		return res.status(400).json({ message: 'Unauthorized' })
	}
})

tasksRouter.post('/tasks', async (req, res) => {
	try {
		const userId = Number(req.userId)
		const { title, priority } = tasksValidation.parse(req.body)

		const newTask = await prisma.toDo.create({
			data: {
				title: title,
				priority: priority,
				userId: userId
			}
		})

		return res.status(201).json({ message: 'Tarefa criada com sucesso' })
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json(error.issues[0])
		}
	}
})

tasksRouter.put('/tasks/:id', async (req, res) => {
	try {
		const userId = req.userId
		const taskId = Number(req.params.id)

		const task = await prisma.toDo.findUnique({
			where: {
				id: taskId
			}
		})

		if (task?.userId === userId) {
			await prisma.toDo.update({
				where: {
					id: taskId
				},
				data: {
					completed: !task?.completed
				}
			})

			return res.status(200).json({ message: 'Tarefa atualizada com sucesso' })
		} else {
			return res.status(400).json({ message: 'Unauthorized' })
		}
	} catch (error) {
		return res.status(400).json({ message: 'Ops... algo deu errado!' })
	}
})
