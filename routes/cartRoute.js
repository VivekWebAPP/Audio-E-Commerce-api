import express from 'express';
import { validationResult, body } from 'express-validator';
import findToken from '../middleware/findToken.js';
import Cart from '../models/Cart.js';

const router = express.Router();

router.get('/getAllProducts', findToken , async (req, res) => {
    try {
        const userId = await res.user;
        if (!userId) {
            return res.status(400).send({ error: 'Internal Error Occurred' });
        }
        const items = await Cart.find({user:userId});
        res.status(200).send({ items });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: 'Internal Error Occurred' });
    }
});

router.post('/addItemsToCart', [
    body('id').isNumeric().isEmpty().withMessage('Enter a valid Id'),
    body('name').isLength(3).isEmpty().withMessage('Enter a valid Name'),
    body('img').isEmpty().withMessage('Enter A Valid Image'),
    body('desc').isLength(10).isEmpty().withMessage('Enter a valid desription'),
    body('price').isEmpty().withMessage('Enter A Valid Price'),
], findToken, async (req, res) => {
    try {
        const error = validationResult(req);
        if (error.isEmpty()) {
            return res.status(400).send({ error: 'Internal Error Occurred' });
        }
        const userId = await res.user;
        if (!userId) {
            return res.status(400).send({ error: 'User Not Found' });
        }
        const { id, name, img, desc, price } = req.body;
        const item = new Cart({
            id: id,
            name: name,
            img: img,
            desc: desc,
            price: price,
            user: userId,
        });
        await item.save();
        res.status(200).send({ item });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: 'Internal Error Occurred' });
    }
});

router.delete('/removeAItem/:id', findToken, async (req, res) => {
    try {
        const userId = await res.user;
        if (!userId) {
            return res.status(400).send({ error: 'User Does Not Exist' });
        }
        const itemId = req.params.id;
        const item = await Cart.findByIdAndDelete(itemId);
        res.status(200).send({ item });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: 'Internal Error Occurred' });
    }
});

export default router;