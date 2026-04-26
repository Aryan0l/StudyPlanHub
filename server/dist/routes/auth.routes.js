"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const validationSchemas_1 = require("../utils/validationSchemas");
const router = express_1.default.Router();
router.post('/register', (0, validation_middleware_1.validateBody)(validationSchemas_1.registerSchema), auth_controller_1.register);
router.post('/login', (0, validation_middleware_1.validateBody)(validationSchemas_1.loginSchema), auth_controller_1.login);
router.post('/refresh', (0, validation_middleware_1.validateBody)(validationSchemas_1.refreshTokenSchema), auth_controller_1.refreshToken);
router.post('/logout', (0, validation_middleware_1.validateBody)(validationSchemas_1.refreshTokenSchema), auth_controller_1.logout);
exports.default = router;
