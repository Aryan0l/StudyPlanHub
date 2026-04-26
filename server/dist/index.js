"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const plan_routes_1 = __importDefault(require("./routes/plan.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const rateLimit_middleware_1 = require("./middleware/rateLimit.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 5174;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(rateLimit_middleware_1.rateLimiter);
app.use('/api/auth', auth_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api', plan_routes_1.default);
const publicPath = path_1.default.resolve(__dirname, '..', 'public');
app.use(express_1.default.static(publicPath));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(publicPath, 'index.html'));
});
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});
app.use(error_middleware_1.errorHandler);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
