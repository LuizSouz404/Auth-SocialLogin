import 'dotenv';
import express from 'express';
import passport from 'passport';
import { PrismaClient } from '@prisma/client';
import {router as authRoute} from './routes/auth';

import './auth/passport';

const port = process.env.PORT;
const app = express();

export const prisma = new PrismaClient();

app.use(express.json());

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (request, response) => {
  response.send('<a href="/auth/google">Authenticate with Google</a>');
})

app.use('/auth', authRoute);

app.listen(3333, () => {console.log(`🚀 Server is running on port ${port || 3333}!`)});
