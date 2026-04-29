"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const init_1 = require("./db/init");
const port = Number(process.env.PORT) || 5174;
const startServer = async () => {
    try {
        await (0, init_1.initializeDatabase)();
        app_1.default.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error('Failed to initialize database', error);
        process.exit(1);
    }
};
startServer();
