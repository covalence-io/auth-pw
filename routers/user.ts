import bcrypt from 'bcrypt';
import { Router } from 'express';

export default function users() {
    const router = Router();

    router
        .post('/', async (req, res, next) => {
            const body = req.body;
            const username = body.username;
            const password = body.password;
            console.log(password);
            const hash = await bcrypt.hash(password, 8);
            console.log(hash);

            const salt = await bcrypt.genSalt(10);
            console.log(salt);
            const hash2 = await bcrypt.hash(password, salt);
            console.log(hash2);
            console.log('');

            // make call to db to create user with stored hash
            res.json({ success: true });
        })
        .post('/login', async (req, res, next) => {
            const body = req.body;
            const username = body.username;
            const password = body.password;

            // grab user from DB using username

            if (await bcrypt.compare(password, '$2b$10$JiqjSIDLiWtSNYqKjdm0N.SANWGZm2mvCwcG0XxqkG1Fpad88d6lO')) {
                res.json({ success: true });
            } else {
                res.status(401).json({ success: false, message: 'Invalid' });
            }
        });

    return router;
}