import express from 'express';
import ConnectToDatabase from './db.js';
import router1 from './routes/auth.js';
import router2 from './routes/cartRoute.js';
import router3 from './routes/paymentRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

ConnectToDatabase();
app.use(express.json());
app.use(cors())
app.use('/auth', router1);
app.use('/cart', router2);
app.use('/payment',router3);

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(port, () => {
    console.log(`Server Running At Port http://localhost:${port}/`);
});

export default app;