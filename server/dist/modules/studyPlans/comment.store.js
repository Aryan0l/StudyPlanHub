"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlanComments = exports.addPlanComment = void 0;
const pool_1 = __importDefault(require("../../database/pool"));
const addPlanComment = async (planId, userId, comment) => {
    const result = await pool_1.default.query(`INSERT INTO plan_comments (plan_id, user_id, comment)
     VALUES ($1, $2, $3)
     RETURNING id, plan_id AS "planId", user_id AS "userId", comment, created_at AS "createdAt"`, [planId, userId, comment]);
    return result.rows[0];
};
exports.addPlanComment = addPlanComment;
const getPlanComments = async (planId) => {
    const result = await pool_1.default.query(`SELECT
       c.id,
       c.plan_id AS "planId",
       c.user_id AS "userId",
       u.name AS "userName",
       c.comment,
       c.created_at AS "createdAt"
     FROM plan_comments c
     JOIN users u ON u.id = c.user_id
     WHERE c.plan_id = $1
     ORDER BY c.created_at DESC`, [planId]);
    return result.rows;
};
exports.getPlanComments = getPlanComments;
