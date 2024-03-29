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
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const response_1 = __importDefault(require("../response"));
const library_1 = require("@prisma/client/runtime/library");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    if (users) {
        (0, response_1.default)(200, users, "GET all user list, success!", res);
        console.log("GET all user list, OK!");
    }
    else if (library_1.PrismaClientInitializationError) {
        (0, response_1.default)(500, "Invalid data", "Server error", res);
        console.log("SERVER ERROR");
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    if (user) {
        (0, response_1.default)(200, user, `GET user ${req.params.id} data, success!`, res);
        console.log(`GET user ${req.params.id} data, OK!`);
    }
    else if (library_1.PrismaClientValidationError) {
        (0, response_1.default)(404, "Invalid data", "Not Found", res);
        console.log("CLIENT SIDE ERROR");
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.update({
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
        (0, response_1.default)(200, user, `UPDATE data user id = ${req.params.id}, OK!`, res);
        console.log(`Successfully UPDATE data user with id = ${req.params.id}`);
    }
    else if (library_1.PrismaClientInitializationError) {
        (0, response_1.default)(500, "Invalid data", "Server error", res);
        console.log("SERVER ERROR");
    }
}));
router.get("/:authorId/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = req.params.authorId;
    const post = yield prisma.post.findMany({
        where: {
            authorId: parseInt(authorId),
        },
    });
    if (post) {
        (0, response_1.default)(200, post, `GET user ${authorId} posts, success!`, res);
        console.log(`GET user ${authorId} posts, OK!`);
    }
    else if (library_1.PrismaClientValidationError) {
        (0, response_1.default)(404, "Invalid data", "Not Found", res);
        console.log("CLIENT SIDE ERROR");
    }
}));
exports.default = router;
