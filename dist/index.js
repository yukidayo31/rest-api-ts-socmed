"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoute_1 = __importDefault(require("./router/userRoute"));
const authRoute_1 = __importDefault(require("./router/authRoute"));
const postRoute_1 = __importDefault(require("./router/postRoute"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use("/api/users", userRoute_1.default);
app.use("/api/auth", authRoute_1.default);
app.use("/api/posts", postRoute_1.default);
app.get("/", (req, res) => {
    res.send("This is main page!");
});
app.listen(port, () => {
    console.log(`API running on port ${port}`);
});
