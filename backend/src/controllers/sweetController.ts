import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { SweetModel, Sweet } from '../models/Sweet';

export const getAllSweets = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const sweets = await SweetModel.findAll();
    res.json(sweets);
  } catch (error) {
    console.error('Get all sweets error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSweetById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const sweetId = parseInt(req.params.id);
    const sweet = await SweetModel.findById(sweetId);
    
    if (!sweet) {
      res.status(404).json({ error: 'Sweet not found' });
      return;
    }
    
    res.json(sweet);
  } catch (error) {
    console.error('Get sweet by ID error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createSweet = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, description, category, price, quantity } = req.body;

    if (!name || !category || !price) {
      res.status(400).json({ error: 'Name, category, and price are required' });
      return;
    }

    const sweet = await SweetModel.create({ name, description, category, price, quantity });
    res.status(201).json(sweet);
  } catch (error: any) {
    if (error.code === '23505') { // Unique violation
      res.status(409).json({ error: 'A sweet with this name already exists' });
    } else {
      console.error('Create sweet error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const updateSweet = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const sweetId = parseInt(req.params.id);
    const { name, description, category, price, quantity } = req.body;

    const sweet = await SweetModel.update(sweetId, { name, description, category, price, quantity });
    
    if (!sweet) {
      res.status(404).json({ error: 'Sweet not found' });
      return;
    }
    
    res.json(sweet);
  } catch (error: any) {
    if (error.code === '23505') { // Unique violation
      res.status(409).json({ error: 'A sweet with this name already exists' });
    } else {
      console.error('Update sweet error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const deleteSweet = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const sweetId = parseInt(req.params.id);
    const deleted = await SweetModel.delete(sweetId);
    
    if (!deleted) {
      res.status(404).json({ error: 'Sweet not found' });
      return;
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Delete sweet error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const searchSweets = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { q, category, minPrice, maxPrice } = req.query;
    
    if (!q) {
      res.status(400).json({ error: 'Search query is required' });
      return;
    }
    
    const sweets = await SweetModel.search(
      q as string,
      category as string,
      minPrice ? parseFloat(minPrice as string) : undefined,
      maxPrice ? parseFloat(maxPrice as string) : undefined
    );
    
    res.json(sweets);
  } catch (error) {
    console.error('Search sweets error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const purchaseSweet = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const sweetId = parseInt(req.params.id);
    const { quantity } = req.body;
    
    if (!quantity || quantity <= 0) {
      res.status(400).json({ error: 'Valid quantity is required' });
      return;
    }
    
    const sweet = await SweetModel.findById(sweetId);
    if (!sweet) {
      res.status(404).json({ error: 'Sweet not found' });
      return;
    }
    
    if (sweet.quantity < quantity) {
      res.status(400).json({ error: 'Insufficient stock' });
      return;
    }
    
    const updatedSweet = await SweetModel.updateQuantity(sweetId, -quantity, 'purchase');
    res.json(updatedSweet);
  } catch (error) {
    console.error('Purchase sweet error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const restockSweet = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const sweetId = parseInt(req.params.id);
    const { quantity } = req.body;
    
    if (!quantity || quantity <= 0) {
      res.status(400).json({ error: 'Valid quantity is required' });
      return;
    }
    
    const sweet = await SweetModel.findById(sweetId);
    if (!sweet) {
      res.status(404).json({ error: 'Sweet not found' });
      return;
    }
    
    const updatedSweet = await SweetModel.updateQuantity(sweetId, quantity, 'restock');
    res.json(updatedSweet);
  } catch (error) {
    console.error('Restock sweet error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};