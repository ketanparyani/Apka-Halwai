import { query } from '../config/database';
import bcrypt from 'bcryptjs';

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  role: string;
  created_at?: Date;
}

export class UserModel {
  static async create(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const result = await query(
      'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role, created_at',
      [user.username, user.email, hashedPassword, user.role || 'customer']
    );
    return result.rows[0];
  }

  static async findByEmail(email: string): Promise<User | null> {
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows.length ? result.rows[0] : null;
  }

  static async findById(id: number): Promise<User | null> {
    const result = await query(
      'SELECT id, username, email, role, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows.length ? result.rows[0] : null;
  }

  static async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}