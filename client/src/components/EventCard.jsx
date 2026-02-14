import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const EventCard = ({ event }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="glass rounded-xl overflow-hidden group hover:border-primary-500/50 transition-all shadow-xl"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-primary-500/10 text-primary-400 text-xs font-semibold rounded-full border border-primary-500/20">
                        {event.category}
                    </span>
                    <span className={`text-xs font-medium ${event.remainingSeats < 10 ? 'text-orange-400' : 'text-slate-400'}`}>
                        {event.remainingSeats} seats left
                    </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                    {event.name}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                    {event.description}
                </p>
                <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Calendar size={14} className="text-primary-500" />
                        {new Date(event.dateTime).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                        <MapPin size={14} className="text-primary-500" />
                        {event.location}
                    </div>
                </div>
                <Link
                    to={`/events/${event._id}`}
                    className="block w-full text-center py-2 bg-slate-800 hover:bg-primary-600 text-white font-medium rounded-lg transition-all"
                >
                    View Details
                </Link>
            </div>
        </motion.div>
    );
};

export default EventCard;
