import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import morgan from 'morgan';



const app = express();


app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://wiggle-33.netlify.app',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

app.use('/api/auth', authRouter);


export default app;