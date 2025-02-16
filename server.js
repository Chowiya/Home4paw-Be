require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const petRouter = require('./Routes/PetRoute')
const AdoptFormRoute = require('./Routes/AdoptFormRoute')
const cors = require('cors');
const path = require('path');
const userRouter = require('./Routes/UserRoute')
const OtpRouter = require('./Routes/OtpRoute')
const requireAuth = require('./Middleware/requireAuth')
const DashboardRouter = require('./Routes/DashboardRoute')

const app = express();

app.use(cors(
    {
        origin:'https://home4paws.netlify.app',
        methods: ['GET', 'POST','PUT','DELETE','OPTION'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
));

app.use('/images', express.static(path.resolve(__dirname, 'images')));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', OtpRouter)
app.use(userRouter)


app.use(requireAuth)

app.use('/dashboard', DashboardRouter)


app.use('/form', AdoptFormRoute)
app.use(petRouter)

mongoose.connect(process.env.mongooseURL)
    .then(() => {
        console.log('Connected to DB');
        const PORT = 4000;
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.error(err);
    })