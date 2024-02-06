import { PrismaClient } from "@prisma/client";
import express, { Router, Request, Response } from "express";
import response from "../response";
import {
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

const prisma = new PrismaClient();
const router: Router = express.Router();

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

router.get("/", async (req: Request, res: Response) => {
  const users: IUser[] = await prisma.user.findMany();

  if (users) {
    response(200, users, "GET all user list, success!", res);
    console.log("GET all user list, OK!");
  } else if (PrismaClientInitializationError) {
    response(500, "Invalid data", "Server error", res);
    console.log("SERVER ERROR");
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (user) {
    response(200, user, `GET user ${req.params.id} data, success!`, res);
    console.log(`GET user ${req.params.id} data, OK!`);
  } else if (PrismaClientValidationError) {
    response(404, "Invalid data", "Not Found", res);
    console.log("CLIENT SIDE ERROR");
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const user = await prisma.user.update({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (user) {
    response(200, user, `UPDATE data user id = ${req.params.id}, OK!`, res);
    console.log(`Successfully UPDATE data user with id = ${req.params.id}`);
  } else if (PrismaClientInitializationError) {
    response(500, "Invalid data", "Server error", res);
    console.log("SERVER ERROR");
  }
});

router.get("/:authorId/posts", async (req: Request, res: Response) => {
  const authorId = req.params.authorId;
  const post = await prisma.post.findMany({
    where: {
      authorId: parseInt(authorId),
    } as any,
  });

  if (post) {
    response(200, post, `GET user ${authorId} posts, success!`, res);
    console.log(`GET user ${authorId} posts, OK!`);
  } else if (PrismaClientValidationError) {
    response(404, "Invalid data", "Not Found", res);
    console.log("CLIENT SIDE ERROR");
  }
});

export default router;
