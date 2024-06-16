import express from 'express';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const instance = new Razorpay({
    key_id: process.env.RAZOR_PAY_API_KEY_ID,
    key_secret: process.env.RAZOR_PAY_API_KEY_SECRET,
});

let verifyOrder = false;

router.post('/paymentRoute', async (req, res) => {
    try {
        const { amount } = req.body;
        const options = {
            amount: amount * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        const orders = await instance.orders.create(options);
        res.status(200).send({ orders });

    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: error.message });
    }
});

router.get('/getKeyId', (req, res) => {
    const keyId = 'rzp_test_Q2rrvfuX59A4sn';
    res.status(200).send({ keyId });
})

router.post('/successfulOrder', (req, res) => {
    res.redirect('http://localhost:3000/?#/')
    verifyOrder = true;
});

router.get('/verifyThePayment', (req, res) => {
    try {
        if (verifyOrder) {
            return res.status(200).send({ success: true });
        }
        else {
            throw new Error('Verification Failed');
        }
    } catch (error) {
        return res.status(400).send({ error: false });
    }
});

export default router;