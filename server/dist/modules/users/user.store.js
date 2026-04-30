"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFollowedPlans = exports.getUserCreatedPlans = exports.createUser = exports.findUserById = exports.findUserByEmail = void 0;
const pool_1 = __importDefault(require("../../database/pool"));
const findUserByEmail = async (email) => {
    const result = await pool_1.default.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
};
exports.findUserByEmail = findUserByEmail;
const findUserById = async (userId) => {
    const result = await pool_1.default.query('SELECT * FROM users WHERE id = $1', [userId]);
    return result.rows[0] || null;
};
exports.findUserById = findUserById;
const createUser = async (name, email, password) => {
    const result = await pool_1.default.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password]);
    return result.rows[0];
};
exports.createUser = createUser;
const getUserCreatedPlans = async (userId) => {
    const result = await pool_1.default.query(`
    SELECT 
      id,
      title,
      description,
      subject AS "category",
      subject,
      difficulty,
      duration_days AS "durationDays",
      average_rating AS "averageRating",
      follower_count AS "followerCount",
      0 AS "completionRate"
    FROM study_plans
    WHERE creator_id = $1
    ORDER BY created_at DESC
    `, [userId]);
    return result.rows;
};
exports.getUserCreatedPlans = getUserCreatedPlans;
const getUserFollowedPlans = async (userId) => {
    const result = await pool_1.default.query(`
    SELECT 
      p.id,
      p.title,
      p.description,
      p.subject AS "category",
      p.subject,
      p.difficulty,
      p.duration_days AS "durationDays",
      p.average_rating AS "averageRating",
      p.follower_count AS "followerCount",
      CASE
        WHEN COUNT(t.id) = 0 THEN 0
        ELSE ROUND(
          COALESCE(array_length(pr.completed_task_ids, 1), 0)::numeric * 100 / COUNT(t.id)
        )::int
      END AS "completionRate"
    FROM study_plans p
    JOIN followers f ON f.plan_id = p.id
    LEFT JOIN progress pr ON pr.plan_id = p.id AND pr.user_id = f.user_id
    LEFT JOIN plan_tasks t ON t.plan_id = p.id
    WHERE f.user_id = $1
    GROUP BY p.id, f.created_at, pr.completed_task_ids
    ORDER BY f.created_at DESC
    `, [userId]);
    return result.rows;
};
exports.getUserFollowedPlans = getUserFollowedPlans;
