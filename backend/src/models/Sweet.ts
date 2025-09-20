import { query } from '../config/database';
import pool from '../config/database'; // Import pool for transaction

export interface Sweet {
  id?: number;
  name: string;
  description?: string;
  category: string;
  price: number;
  quantity: number;
  created_at?: Date;
  updated_at?: Date;
}

// Add this helper function to parse sweet data
const parseSweet = (sweet: any): Sweet => {
  return {
    ...sweet,
    price: parseFloat(sweet.price), // Convert string to number
    quantity: parseInt(sweet.quantity, 10)
  };
};

export class SweetModel {
  static async findAll(): Promise<Sweet[]> {
    const result = await query('SELECT * FROM sweets ORDER BY name');
    return result.rows.map(parseSweet); // Use the parser
  }

  static async findById(id: number): Promise<Sweet | null> {
    const result = await query('SELECT * FROM sweets WHERE id = $1', [id]);
    return result.rows.length ? parseSweet(result.rows[0]) : null; // Use the parser
  }

  static async create(sweet: Sweet): Promise<Sweet> {
    const result = await query(
      'INSERT INTO sweets (name, description, category, price, quantity) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [sweet.name, sweet.description, sweet.category, sweet.price, sweet.quantity || 0]
    );
    return parseSweet(result.rows[0]); // Use the parser
  }

  static async update(id: number, sweet: Partial<Sweet>): Promise<Sweet | null> {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (sweet.name) {
      fields.push(`name = $${paramCount}`);
      values.push(sweet.name);
      paramCount++;
    }
    if (sweet.description) {
      fields.push(`description = $${paramCount}`);
      values.push(sweet.description);
      paramCount++;
    }
    if (sweet.category) {
      fields.push(`category = $${paramCount}`);
      values.push(sweet.category);
      paramCount++;
    }
    if (sweet.price) {
      fields.push(`price = $${paramCount}`);
      values.push(sweet.price);
      paramCount++;
    }
    if (sweet.quantity !== undefined) {
      fields.push(`quantity = $${paramCount}`);
      values.push(sweet.quantity);
      paramCount++;
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const result = await query(
      `UPDATE sweets SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows.length ? parseSweet(result.rows[0]) : null; // Use the parser
  }

  static async delete(id: number): Promise<boolean> {
    const result = await query('DELETE FROM sweets WHERE id = $1', [id]);
    return result.rowCount ? result.rowCount > 0 : false;
  }

  static async search(queryText: string, category?: string, minPrice?: number, maxPrice?: number): Promise<Sweet[]> {
    let sql = 'SELECT * FROM sweets WHERE name ILIKE $1';
    const params: any[] = [`%${queryText}%`];
    let paramCount = 2;

    if (category) {
      sql += ` AND category = $${paramCount}`;
      params.push(category);
      paramCount++;
    }

    if (minPrice !== undefined) {
      sql += ` AND price >= $${paramCount}`;
      params.push(minPrice);
      paramCount++;
    }

    if (maxPrice !== undefined) {
      sql += ` AND price <= $${paramCount}`;
      params.push(maxPrice);
      paramCount++;
    }

    sql += ' ORDER BY name';

    const result = await query(sql, params);
    return result.rows.map(parseSweet); // Use the parser
  }

  static async updateQuantity(id: number, change: number, reason: string): Promise<Sweet | null> {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Update the sweet quantity
      const result = await client.query(
        'UPDATE sweets SET quantity = quantity + $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
        [change, id]
      );
      
      // Log the inventory change
      if (result.rows.length) {
        await client.query(
          'INSERT INTO inventory_logs (sweet_id, change_amount, reason) VALUES ($1, $2, $3)',
          [id, change, reason]
        );
      }
      
      await client.query('COMMIT');
      return result.rows.length ? parseSweet(result.rows[0]) : null; // Use the parser
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}