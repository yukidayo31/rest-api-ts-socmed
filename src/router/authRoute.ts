import { PrismaClient } from "@prisma/client";
import express, { Router, Request, Response } from "express";
import response from "../response";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();
const router: Router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const register = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  if (register) {
    response(201, register, `ADD new user, OK`, res);
    console.log("Successfully ADD new user data!");
  } else if (PrismaClientInitializationError) {
    response(500, "Invalid data", "Server error", res);
    console.log("SERVER ERROR");
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    } as any,
  });

  if (user) {
    response(201, user, `LOGIN user, OK`, res);
    console.log("Successfully LOGIN user data!");
  } else if (PrismaClientInitializationError) {
    response(500, "Invalid data", "Server error", res);
    console.log("SERVER ERROR");
  }
});

export default router;
