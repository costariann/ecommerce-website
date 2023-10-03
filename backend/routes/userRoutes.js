import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';

const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    //if user is found...
    if (user) {
      //compare user's input password to that of the hashed password stored
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);
export default userRouter;
