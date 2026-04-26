"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countCompletedTasks = exports.insertProgress = exports.deleteProgressForPlan = exports.getCompletedTaskIds = void 0;
const db_1 = __importDefault(require("../config/db"));
const getCompletedTaskIds = async (userId, planId) => {
    const result = await db_1.default.query(`SELECT task_id FROM progress WHERE user_id = $1 AND plan_id = $2 AND completed = true`, [userId, planId]);
    return result.rows.map((row) => row.task_id);
};
exports.getCompletedTaskIds = getCompletedTaskIds;
const deleteProgressForPlan = async (userId, planId) => {
    await db_1.default.query('DELETE FROM progress WHERE user_id = $1 AND plan_id = $2', [userId, planId]);
};
exports.deleteProgressForPlan = deleteProgressForPlan;
const insertProgress = async (userId, planId, taskIds) => {
    if (!taskIds.length) {
        return;
    }
    const inserts = [];
    const values = [];
    taskIds.forEach((taskId, index) => {
        inserts.push(`($1, $2, $${index + 3}, true)`);
        values.push(taskId);
    });
    await db_1.default.query(`INSERT INTO progress (user_id, plan_id, task_id, completed)
     VALUES ${inserts.join(', ')}
     ON CONFLICT (user_id, plan_id, task_id) DO UPDATE SET completed = EXCLUDED.completed`, [userId, planId, ...values]);
};
exports.insertProgress = insertProgress;
const countCompletedTasks = async (userId, planId) => {
    const result = await db_1.default.query('SELECT COUNT(*) FROM progress WHERE user_id = $1 AND plan_id = $2 AND completed = true', [userId, planId]);
    return Number(result.rows[0]?.count || 0);
};
exports.countCompletedTasks = countCompletedTasks;
