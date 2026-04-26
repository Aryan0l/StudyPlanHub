"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || 'Internal server error';
    const details = error.details || undefined;
    res.status(status).json({ success: false, message, details });
};
exports.errorHandler = errorHandler;
