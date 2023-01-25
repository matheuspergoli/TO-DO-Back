import { z } from 'zod'

export const tasksValidation = z.object({
	title: z
		.string({
			required_error: 'Título é obrigatório',
			invalid_type_error: 'Título deve ser uma string'
		})
		.min(1, {
			message: 'Título deve ter no mínimo 1 caracter'
		})
		.trim(),

	priority: z
		.number({
			required_error: 'Prioridade é obrigatório',
			invalid_type_error: 'Prioridade deve um number'
		})
		.min(1, {
			message: 'Priority deve ser de no mínimo 1'
		})
		.max(3, {
			message: 'Priority deve ser de no máximo 3'
		})
})
