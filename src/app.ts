import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import routes from './routes/index';
import './config/passport';
import rateLimit
 from 'express-rate-limit';
const app: Application = express();

const globalLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, 
    max: 50,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again after 15 minutes'
    },
    standardHeaders: true, 
    legacyHeaders: false
});

app.use(globalLimiter);

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api/v1', routes);

// Error handler (basic)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

export default app;