import express from 'express';
import { supabase } from '../config/database.js';

const router = express.Router();

router.get('/:eventId', async (req, res) => {
  try {
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('*')
      .eq('id', req.params.eventId)
      .maybeSingle();

    if (eventError) throw eventError;
    if (!event) return res.status(404).json({ error: 'Event not found' });

    const { data: eventVendors, error: vendorsError } = await supabase
      .from('event_vendors')
      .select(`
        *,
        vendors (*)
      `)
      .eq('event_id', req.params.eventId);

    if (vendorsError) throw vendorsError;

    const report = {
      event,
      vendors: eventVendors.map(ev => ev.vendors),
      summary: {
        totalAttendees: event.expected_attendees,
        estimatedWaste: event.estimated_waste,
        vendorCount: eventVendors.length,
        eventDuration: calculateDuration(event.start_date, event.end_date)
      }
    };

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function calculateDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = end - start;
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffHours / 24);
  const hours = diffHours % 24;

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ${hours} hour${hours !== 1 ? 's' : ''}`;
  }
  return `${hours} hour${hours !== 1 ? 's' : ''}`;
}

export default router;
