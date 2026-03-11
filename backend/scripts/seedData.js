import { supabase } from '../config/database.js';

const vendors = [
  {
    name: 'Royal Caterers',
    category: 'caterer',
    description: 'Premium catering services specializing in multi-cuisine events with over 15 years of experience.',
    contact_email: 'contact@royalcaterers.com',
    contact_phone: '+1-555-0101',
    rating: 4.8,
    price_range: 'Premium'
  },
  {
    name: 'City Feast Catering',
    category: 'caterer',
    description: 'Affordable catering solutions for corporate events and large gatherings.',
    contact_email: 'info@cityfeast.com',
    contact_phone: '+1-555-0102',
    rating: 4.5,
    price_range: 'Budget'
  },
  {
    name: 'Gourmet Express',
    category: 'caterer',
    description: 'Fast and reliable catering for all event types with customizable menus.',
    contact_email: 'hello@gourmetexpress.com',
    contact_phone: '+1-555-0103',
    rating: 4.6,
    price_range: 'Standard'
  },
  {
    name: 'Dream Decorators',
    category: 'decorator',
    description: 'Creating magical event spaces with innovative decoration concepts and designs.',
    contact_email: 'creative@dreamdecorators.com',
    contact_phone: '+1-555-0201',
    rating: 4.9,
    price_range: 'Premium'
  },
  {
    name: 'Budget Blooms & Balloons',
    category: 'decorator',
    description: 'Affordable decoration services perfect for small to medium events.',
    contact_email: 'info@budgetblooms.com',
    contact_phone: '+1-555-0202',
    rating: 4.3,
    price_range: 'Budget'
  },
  {
    name: 'Elite Event Designs',
    category: 'decorator',
    description: 'High-end event styling and decoration for weddings and corporate functions.',
    contact_email: 'design@eliteevents.com',
    contact_phone: '+1-555-0203',
    rating: 4.7,
    price_range: 'Standard'
  },
  {
    name: 'DJ Spin Masters',
    category: 'dj',
    description: 'Professional DJ services with state-of-the-art equipment and vast music library.',
    contact_email: 'bookings@spinmasters.com',
    contact_phone: '+1-555-0301',
    rating: 4.8,
    price_range: 'Premium'
  },
  {
    name: 'Party Beats DJ',
    category: 'dj',
    description: 'Energetic DJs for all types of celebrations at competitive prices.',
    contact_email: 'party@partybeats.com',
    contact_phone: '+1-555-0302',
    rating: 4.4,
    price_range: 'Standard'
  },
  {
    name: 'Sound Wave Entertainment',
    category: 'dj',
    description: 'Complete audio-visual entertainment solutions for corporate and private events.',
    contact_email: 'info@soundwave.com',
    contact_phone: '+1-555-0303',
    rating: 4.6,
    price_range: 'Premium'
  },
  {
    name: 'Swift Logistics Co.',
    category: 'logistics',
    description: 'Reliable event logistics including setup, transportation, and breakdown services.',
    contact_email: 'operations@swiftlogistics.com',
    contact_phone: '+1-555-0401',
    rating: 4.7,
    price_range: 'Standard'
  },
  {
    name: 'Metro Event Movers',
    category: 'logistics',
    description: 'Fast and affordable logistics solutions for urban events.',
    contact_email: 'contact@metroeventmovers.com',
    contact_phone: '+1-555-0402',
    rating: 4.5,
    price_range: 'Budget'
  },
  {
    name: 'Premium Event Logistics',
    category: 'logistics',
    description: 'Full-service logistics provider specializing in large-scale events and exhibitions.',
    contact_email: 'service@premiumlogistics.com',
    contact_phone: '+1-555-0403',
    rating: 4.9,
    price_range: 'Premium'
  }
];

const events = [
  {
    name: 'City Music Festival 2026',
    location: 'Central Park Amphitheater',
    venue_size: 'Large',
    expected_attendees: 5000,
    event_type: 'festival',
    start_date: '2026-06-15T14:00:00Z',
    end_date: '2026-06-15T23:00:00Z',
    status: 'approved'
  },
  {
    name: 'Tech Summit 2026',
    location: 'Convention Center Hall A',
    venue_size: 'Large',
    expected_attendees: 1200,
    event_type: 'corporate',
    start_date: '2026-05-20T09:00:00Z',
    end_date: '2026-05-22T18:00:00Z',
    status: 'approved'
  },
  {
    name: 'Smith-Johnson Wedding',
    location: 'Garden Estate Banquet Hall',
    venue_size: 'Medium',
    expected_attendees: 250,
    event_type: 'wedding',
    start_date: '2026-07-10T16:00:00Z',
    end_date: '2026-07-10T23:00:00Z',
    status: 'pending'
  },
  {
    name: 'Annual Art Exhibition',
    location: 'City Gallery, Downtown',
    venue_size: 'Medium',
    expected_attendees: 800,
    event_type: 'exhibition',
    start_date: '2026-08-05T10:00:00Z',
    end_date: '2026-08-15T20:00:00Z',
    status: 'approved'
  },
  {
    name: 'Community Food Festival',
    location: 'Riverside Park',
    venue_size: 'Large',
    expected_attendees: 3000,
    event_type: 'festival',
    start_date: '2026-09-01T12:00:00Z',
    end_date: '2026-09-01T21:00:00Z',
    status: 'pending'
  },
  {
    name: 'Corporate Training Workshop',
    location: 'Business Plaza Conference Room',
    venue_size: 'Small',
    expected_attendees: 50,
    event_type: 'corporate',
    start_date: '2026-04-25T09:00:00Z',
    end_date: '2026-04-25T17:00:00Z',
    status: 'approved'
  }
];

async function seedDatabase() {
  console.log('Starting database seeding...');

  try {
    console.log('Seeding vendors...');
    const { data: vendorData, error: vendorError } = await supabase
      .from('vendors')
      .insert(vendors)
      .select();

    if (vendorError) {
      console.error('Error seeding vendors:', vendorError);
      throw vendorError;
    }

    console.log(`✓ Seeded ${vendorData.length} vendors`);

    console.log('Seeding events...');
    const eventsWithWaste = events.map(event => ({
      ...event,
      estimated_waste: calculateWaste(event.expected_attendees, event.event_type)
    }));

    const { data: eventData, error: eventError } = await supabase
      .from('events')
      .insert(eventsWithWaste)
      .select();

    if (eventError) {
      console.error('Error seeding events:', eventError);
      throw eventError;
    }

    console.log(`✓ Seeded ${eventData.length} events`);

    console.log('Creating event-vendor associations...');
    const associations = [];

    eventData.forEach(event => {
      const numVendors = Math.floor(Math.random() * 3) + 2;
      const shuffled = [...vendorData].sort(() => 0.5 - Math.random());
      const selectedVendors = shuffled.slice(0, numVendors);

      selectedVendors.forEach(vendor => {
        associations.push({
          event_id: event.id,
          vendor_id: vendor.id
        });
      });
    });

    const { data: associationData, error: associationError } = await supabase
      .from('event_vendors')
      .insert(associations)
      .select();

    if (associationError) {
      console.error('Error creating associations:', associationError);
      throw associationError;
    }

    console.log(`✓ Created ${associationData.length} event-vendor associations`);
    console.log('\n✓ Database seeding completed successfully!');
    console.log('\nSummary:');
    console.log(`- ${vendorData.length} vendors`);
    console.log(`- ${eventData.length} events`);
    console.log(`- ${associationData.length} vendor assignments`);

  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

function calculateWaste(attendees, eventType) {
  const baseWastePerPerson = {
    wedding: 0.8,
    festival: 1.2,
    exhibition: 0.4,
    corporate: 0.5
  };

  const baseWaste = baseWastePerPerson[eventType] || 0.6;
  return Math.round(attendees * baseWaste * 100) / 100;
}

seedDatabase();
