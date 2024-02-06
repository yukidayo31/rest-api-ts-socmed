"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const response_1 = __importDefault(require("../response"));
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, authorId } = req.body;
    const post = yield prisma.post.create({
        data: {
            title: title,
            content: content,
            authorId: parseInt(authorId),
        },
    });
    if (post) {
        (0, response_1.default)(201, post, `ADD new post, OK`, res);
        console.log("Successfully ADD post data!");
    }
    else if (library_1.PrismaClientInitializationError) {
        (0, response_1.default)(500, "Invalid data", "Server error", res);
        console.log("SERVER ERROR");
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield prisma.post.findMany();
    if (post) {
        (0, response_1.default)(200, post, "GET all post list, success!", res);
        console.log("GET all post list, OK!");
    }
    else if (library_1.PrismaClientInitializationError) {
        (0, response_1.default)(500, "Invalid data", "Server error", res);
        console.log("SERVER ERROR");
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const post = yield prisma.post.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    if (post) {
        (0, response_1.default)(200, post, `GET post ${id} data, success!`, res);
        console.log(`GET post ${id} data, OK!`);
    }
    else if (library_1.PrismaClientValidationError) {
        (0, response_1.default)(404, "Invalid data", "Not Found", res);
        console.log("CLIENT SIDE ERROR");
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const id = req.params.id;
    const post = yield prisma.post.update({
        data: {
            title: title,
            content: content,
        },
        where: {
            id: parseInt(id),
        },
    });
    if (post) {
        (0, response_1.default)(200, post, `UPDATE post id = ${id}, OK!`, res);
        console.log(`Successfully UPDATE post with id = ${id}`);
    }
    else if (library_1.PrismaClientInitializationError) {
        (0, response_1.default)(500, "Invalid data", "Server error", res);
        console.log("SERVER ERROR");
    }
}));
exports.default = router;
