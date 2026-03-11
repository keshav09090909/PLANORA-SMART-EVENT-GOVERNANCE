import express from 'express';
import { supabase } from '../config/database.js';

const router = express.Router();

router.get('/event/:eventId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('event_vendors')
      .select(`
        *,
        vendors (*)
      `)
      .eq('event_id', req.params.eventId);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { event_id, vendor_id } = req.body;

    const { data, error } = await supabase
      .from('event_vendors')
      .insert([{ event_id, vendor_id }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('event_vendors')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({ message: 'Vendor removed from event' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
