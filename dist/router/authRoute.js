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
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const register = yield prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password,
        },
    });
    if (register) {
        (0, response_1.default)(201, register, `ADD new user, OK`, res);
        console.log("Successfully ADD new user data!");
    }
    else if (library_1.PrismaClientInitializationError) {
        (0, response_1.default)(500, "Invalid data", "Server error", res);
        console.log("SERVER ERROR");
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            email: req.body.email,
        },
    });
    if (user) {
        (0, response_1.default)(201, user, `LOGIN user, OK`, res);
        console.log("Successfully LOGIN user data!");
    }
    else if (library_1.PrismaClientInitializationError) {
        (0, response_1.default)(500, "Invalid data", "Server error", res);
        console.log("SERVER ERROR");
    }
}));
exports.default = router;
