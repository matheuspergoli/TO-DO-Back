import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { tasksRouter } from './routes/tasks'
import { loginRouter } from './routes/login'
import { registerRouter } from './routes/register'
import { authMiddleware } from './middleware/auth'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(registerRouter)
app.use(loginRouter)

app.use(authMiddleware)
app.use(tasksRouter)

app.listen(process.env.PORT || 3333, () => {
	console.log('Server is running on port 3333')
})
