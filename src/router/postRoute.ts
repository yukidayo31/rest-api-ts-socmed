import express, { Router, Request, Response } from "express";
import response from "../response";
import { PrismaClient } from "@prisma/client";
import {
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

const prisma = new PrismaClient();
const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { title, content, authorId } = req.body;
  const post = await prisma.post.create({
    data: {
      title: title,
      content: content,
      authorId: parseInt(authorId),
    },
  });

  if (post) {
    response(201, post, `ADD new post, OK`, res);
    console.log("Successfully ADD post data!");
  } else if (PrismaClientInitializationError) {
    response(500, "Invalid data", "Server error", res);
    console.log("SERVER ERROR");
  }
});

router.get("/", async (req: Request, res: Response) => {
  const post = await prisma.post.findMany();

  if (post) {
    response(200, post, "GET all post list, success!", res);
    console.log("GET all post list, OK!");
  } else if (PrismaClientInitializationError) {
    response(500, "Invalid data", "Server error", res);
    console.log("SERVER ERROR");
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    } as any,
  });

  if (post) {
    response(200, post, `GET post ${id} data, success!`, res);
    console.log(`GET post ${id} data, OK!`);
  } else if (PrismaClientValidationError) {
    response(404, "Invalid data", "Not Found", res);
    console.log("CLIENT SIDE ERROR");
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const id = req.params.id;
  const post = await prisma.post.update({
    data: {
      title: title,
      content: content,
    },
    where: {
      id: parseInt(id),
    },
  });

  if (post) {
    response(200, post, `UPDATE post id = ${id}, OK!`, res);
    console.log(`Successfully UPDATE post with id = ${id}`);
  } else if (PrismaClientInitializationError) {
    response(500, "Invalid data", "Server error", res);
    console.log("SERVER ERROR");
  }
});
export default router;
