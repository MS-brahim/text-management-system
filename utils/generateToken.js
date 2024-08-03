import jwt from 'jsonwebtoken';
import { authConfig } from '../config/authConfig.js';

export const generateToken = (user) => {
    return jwt.sign({ uuid: user.uuid, email: user.email }, authConfig.secret, { expiresIn: authConfig.expiresIn });
};
