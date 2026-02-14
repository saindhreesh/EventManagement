import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import { Loader2, CalendarCheck, Clock, History } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const { data } = await axios.get('/api/user/dashboard');
                setData(data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchDashboard();
    }, []);

    if (loading) return <div className="flex justify-center pt-20"><Loader2 className="animate-spin text-primary-500" size={48} /></div>;

    return (
        <div className="space-y-12">
            <header className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-800 pb-8">
                <div>
                    <h1 className="text-4xl font-black">My Dashboard</h1>
                    <p className="text-slate-400 mt-2">Manage your registrations and view event history</p>
                </div>
                <div className="glass px-6 py-4 rounded-2xl flex items-center gap-4">
                    <div className="p-3 bg-primary-500/10 rounded-xl text-primary-400">
                        <CalendarCheck size={24} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-black">Total Events</p>
                        <p className="text-2xl font-black">{data?.totalRegistrations || 0}</p>
                    </div>
                </div>
            </header>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Clock className="text-primary-500" />
                    Upcoming Events
                </h2>
                {data?.upcomingEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.upcomingEvents.map(event => <EventCard key={event._id} event={event} />)}
                    </div>
                ) : (
                    <div className="glass p-12 text-center rounded-3xl text-slate-500 border-dashed border-2 border-slate-800">
                        No upcoming events. Go explore some!
                    </div>
                )}
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <History className="text-primary-500" />
                    Past Events
                </h2>
                {data?.pastEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-60">
                        {data.pastEvents.map(event => <EventCard key={event._id} event={event} />)}
                    </div>
                ) : (
                    <p className="text-slate-500 italic">No past events yet.</p>
                )}
            </section>
        </div>
    );
};

export default Dashboard;
