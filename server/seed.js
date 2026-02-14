const mongoose = require('mongoose');
const Event = require('./models/Event');
require('dotenv').config();

const events = [
    {
        name: 'Tech Conference 2026',
        organizer: 'Innovation Hub',
        location: 'San Francisco, CA',
        dateTime: new Date('2026-05-15T09:00:00'),
        description: 'A deep dive into the latest in AI and Web3 technologies.',
        capacity: 500,
        remainingSeats: 500,
        category: 'Technology',
        tags: ['AI', 'Tech', 'Networking']
    },
    {
        name: 'Outdoor Yoga Retreat',
        organizer: 'Serenity Wellness',
        location: 'Boulder, CO',
        dateTime: new Date('2026-06-10T07:00:00'),
        description: 'Rejuvenate your mind and body with a weekend of outdoor yoga and meditation.',
        capacity: 50,
        remainingSeats: 50,
        category: 'Health & Wellness',
        tags: ['Yoga', 'Wellness', 'Nature']
    },
    {
        name: 'Indie Music Festival',
        organizer: 'Global Beats',
        location: 'Austin, TX',
        dateTime: new Date('2026-07-20T16:00:00'),
        description: 'Experience the best independent music from around the world.',
        capacity: 1000,
        remainingSeats: 1000,
        category: 'Music',
        tags: ['Music', 'Festival', 'Indie']
    },
    {
        name: 'Gourmet Cooking Workshop',
        organizer: 'Culinary Arts Academy',
        location: 'Chicago, IL',
        dateTime: new Date('2026-04-05T18:00:00'),
        description: 'Learn the secrets of French cuisine from award-winning chefs.',
        capacity: 20,
        remainingSeats: 20,
        category: 'Food & Drink',
        tags: ['Cooking', 'Gourmet', 'Workshop']
    },
    {
        name: 'Digital Art Expo',
        organizer: 'Pixel Collective',
        location: 'New York City, NY',
        dateTime: new Date('2026-08-12T10:00:00'),
        description: 'A showcase of cutting-edge digital art and NFT installations.',
        capacity: 200,
        remainingSeats: 200,
        category: 'Art',
        tags: ['Art', 'Digital', 'NFT']
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Event.deleteMany({});
        await Event.insertMany(events);
        console.log('Database Seeded!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
