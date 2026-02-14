import { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import { Search, Filter } from 'lucide-react';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);

    const categories = ['Technology', 'Health & Wellness', 'Music', 'Food & Drink', 'Art'];

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/events?search=${search}&category=${category}`);
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchEvents();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search, category]);

    return (
        <div className="space-y-12">
            <section className="text-center py-12">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                    Discover Unforgettable <br />
                    <span className="bg-gradient-to-r from-primary-400 to-indigo-500 bg-clip-text text-transparent">
                        Experiences
                    </span>
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Explore and manage registrations for the most exciting events happening near you.
                </p>
            </section>

            <section className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search events..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl focus:border-primary-500 outline-none transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <button
                        onClick={() => setCategory('')}
                        className={`px-4 py-2 rounded-xl border text-sm transition-all whitespace-nowrap ${!category ? 'bg-primary-600 border-primary-500' : 'border-slate-800 hover:border-slate-700'}`}
                    >
                        All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-xl border text-sm transition-all whitespace-nowrap ${category === cat ? 'bg-primary-600 border-primary-500' : 'border-slate-800 hover:border-slate-700'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map(i => <div key={i} className="h-80 bg-slate-900 animate-pulse rounded-xl"></div>)}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.length > 0 ? (
                        events.map(event => <EventCard key={event._id} event={event} />)
                    ) : (
                        <div className="col-span-full text-center py-20 text-slate-500">
                            No events found matching your criteria.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
