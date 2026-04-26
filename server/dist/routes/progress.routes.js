"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const plan_controller_1 = require("../controllers/plan.controller");
const router = express_1.default.Router();
router.get('/:planId', auth_middleware_1.authenticate, plan_controller_1.getPlanProgress);
router.post('/:planId', auth_middleware_1.authenticate, plan_controller_1.updateProgress);
exports.default = router;
