import pool from '../../database/pool';

export const addPlanComment = async (planId: number, userId: number, comment: string) => {
  const result = await pool.query(
    `INSERT INTO plan_comments (plan_id, user_id, comment)
     VALUES ($1, $2, $3)
     RETURNING id, plan_id AS "planId", user_id AS "userId", comment, created_at AS "createdAt"`,
    [planId, userId, comment],
  );

  return result.rows[0];
};

export const getPlanComments = async (planId: number) => {
  const result = await pool.query(
    `SELECT
       c.id,
       c.plan_id AS "planId",
       c.user_id AS "userId",
       u.name AS "userName",
       c.comment,
       c.created_at AS "createdAt"
     FROM plan_comments c
     JOIN users u ON u.id = c.user_id
     WHERE c.plan_id = $1
     ORDER BY c.created_at DESC`,
    [planId],
  );

  return result.rows;
};
