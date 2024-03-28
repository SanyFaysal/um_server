import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './errors/globalErrorHandler';
import notFound from './errors/notFound';
import routes from './app/routes'

const app: Application = express();


app.use(cors())
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    return res.json({
        success: true,
        message: 'Hurrah!!! Route is working😎'
    })
})

app.use('/api/v1', routes)

//global error handler
app.use(globalErrorHandler);
//handle not found
app.use(notFound)

export default app;