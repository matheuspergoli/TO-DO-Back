import swaggerUi from 'swagger-ui-express'
import swaggerJson from '../../lib/swagger/swagger.json'

import { Router } from 'express'

export const swaggerRouter = Router()

swaggerRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))
