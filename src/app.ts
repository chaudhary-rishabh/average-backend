import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
import xssClean from 'xss-clean';
import rateLimit from 'express-rate-limit';

import routes from './routes/index';
import './config/passport';

const app: Application = express();

// 1️⃣ Body parsers first
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 2️⃣ Security headers
app.use(helmet());

// 3️⃣ CORS
app.use(cors({ origin: true, credentials: true }));

// 4️⃣ Prevent HTTP Parameter Pollution
app.use(hpp());

// 5️⃣ Sanitize data against NoSQL injection
app.use(mongoSanitize());

// 6️⃣ Prevent XSS attacks
app.use(xssClean());

// 7️⃣ Rate limiting (global)
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

// 8️⃣ Cookie parser
app.use(cookieParser());

// 9️⃣ Passport auth
app.use(passport.initialize());

// 🔟 Routes
app.use('/api/v1', routes);

// 🔹 Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
