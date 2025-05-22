import dotenv from "dotenv";
import mongoose from "mongoose";
import express, { json, urlencoded } from 'express';
import colors from "colors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import rendezVousRoute from './routes/redezVousRoute.js';
import authRouters from './routes/auth.js';
import {errorHandler} from './middleWare/errorMiddleWare.js';
import hoursRouter from './routes/heurs.js';
import postRouter from './routes/postRoute.js';
import path  from 'path';
import mongoSanitize  from 'express-mongo-sanitize';
import helmet  from 'helmet';
import xss  from "xss-clean";
import rateLimit  from 'express-rate-limit'
import hpp  from 'hpp';
import demandeRouter from './routes/demandes/demandeAttCadastrale.js';
// const authMiddleware = require('./middleWare/authMiddleware');

import cookieParser from 'cookie-parser';


const app = express();

const PORT = process.env.PORT || 3000;
// configurations
dotenv.config();
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
  limit: "5mb",
  extended: true
}));
app.use(cookieParser());

// prevent SQL injection
app.use(mongoSanitize());
// adding security headers
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"]
    }
  })
)

// prevent Cross-site Scripting XSS
app.use(xss());
//limit queries per 15mn
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter);
//HTTP Param Pollution
app.use(hpp());

// Middlewares
// app.use(cors());

app.use(cors({origin: "http://localhost:5173", credentials: true}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
// app.use(cookieParser());

   // // Routes Middlewares
app.use('/api/users', userRoute);
app.use('/api/rendezVous', rendezVousRoute);
app.use('/api/auth', authRouters);
app.use('/api/hours', hoursRouter);
app.use('/api/posts', postRouter);
app.use('/api/demandes', demandeRouter);


// error middlewares
app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong !";
    return res.status(errorStatus).json({
        success :false ,
        status: errorStatus,
        message:errorMessage,
        stack: err.stack,
    });
});


// routes
app.get('/', (req,res)=>{
    res.send('Home Page hello words');
})

// Error Middleware
app.use(errorHandler);
// app.use(authMiddleware)

// connect to DB and start the server
mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
        app.listen(PORT,()=>{
            console.log(`server is running on port ${PORT}...`.bgCyan.white)}
        )
    })
.catch((err) => {
        return console.log(err);
    })

// connection.on('disconnected', ()=>{
//     console.log("mongoDB disconnected");
// })

// connection.on('connected', ()=>{
//     console.log("mongoDB connected");
// })