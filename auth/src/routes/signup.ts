import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    console.log(`this is the email received to create a user ${email}`);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email is in use");
    }

    console.log(`Existing user here: ${existingUser}`);
    const user = User.build({ email, password });
    console.log(`user here: ${user}`);
    await user.save();

    console.log("This is process.env.JWT_KEY " + process.env.JWT_KEY);
    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
      // A check to see if this evironment variable defined was already put in place in the start
      // function in the index.ts file, by putting ! at the end there I can make typescript stop complaining
    );
    // Store it on a session object
    req.session = {
      jwt: userJwt,
    };
    console.log(req.session);
    console.log("just before sending the status here");

    res.status(201).send(user);
  }
);

export { router as signupRouter };
