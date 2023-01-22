import { z } from 'zod'

export const loginValidation = z.object({
	email: z
		.string({
			required_error: 'Email é obrigatório',
			invalid_type_error: 'Email deve ser uma string'
		})
		.email({
			message: 'Email inválido'
		})
		.trim(),

	password: z
		.string({
			required_error: 'Senha é obrigatório',
			invalid_type_error: 'Senha deve ser uma string'
		})
		.min(6, {
			message: 'Senha deve ter no mínimo 6 caracteres'
		})
})
