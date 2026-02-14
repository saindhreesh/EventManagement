import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Calendar, MapPin, Users, Info, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isRegistering, setIsRegistering] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [error, setError] = useState('');

    const fetchEvent = async () => {
        try {
            const { data } = await axios.get(`/api/events/${id}`);
            setEvent(data);

            if (user) {
                const dashboard = await axios.get('/api/user/dashboard');
                const regs = [...dashboard.data.upcomingEvents, ...dashboard.data.pastEvents];
                setIsRegistered(regs.some(e => e._id === id));
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchEvent();
    }, [id, user]);

    const handleRegister = async () => {
        if (!user) return navigate('/login');

        setIsRegistering(true);
        try {
            await axios.post(`/api/events/${id}/register`);
            setIsRegistered(true);
            fetchEvent();
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
        setIsRegistering(false);
    };

    if (loading) return <div className="flex justify-center pt-20"><Loader2 className="animate-spin text-primary-500" size={48} /></div>;
    if (!event) return <div className="text-center pt-20">Event not found.</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <ArrowLeft size={18} /> Back to Browse
            </button>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <div className="glass p-8 rounded-3xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-6">
                            <span className="px-4 py-2 bg-primary-500/10 text-primary-400 text-sm font-bold rounded-full border border-primary-500/20">
                                {event.category}
                            </span>
                        </div>
                        <h1 className="text-4xl font-extrabold mb-4">{event.name}</h1>
                        <p className="text-slate-400 leading-relaxed text-lg">{event.description}</p>

                        <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-primary-500/10 rounded-xl text-primary-500">
                                    <Calendar />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Date & Time</p>
                                    <p className="font-semibold">{new Date(event.dateTime).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-primary-500/10 rounded-xl text-primary-500">
                                    <MapPin />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Location</p>
                                    <p className="font-semibold">{event.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass p-8 rounded-3xl">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Info size={20} className="text-primary-500" />
                            About Organizer
                        </h3>
                        <p className="text-slate-300">Hosted by <span className="font-bold text-white">{event.organizer}</span></p>
                        <div className="flex gap-2 mt-4">
                            {event.tags.map(tag => (
                                <span key={tag} className="text-xs px-2 py-1 bg-slate-800 text-slate-400 rounded-md">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="md:col-span-1">
                    <div className="glass p-6 rounded-3xl sticky top-24 space-y-6 border-primary-500/20 shadow-2xl shadow-primary-900/10">
                        <div className="text-center border-b border-slate-800 pb-6">
                            <p className="text-slate-400 text-sm mb-1 uppercase tracking-widest font-bold">Capacity</p>
                            <p className="text-3xl font-black text-white">{event.remainingSeats} / {event.capacity}</p>
                            <p className="text-xs text-slate-500 mt-2">Available Seats</p>
                        </div>

                        {error && <p className="text-red-400 text-xs text-center">{error}</p>}

                        {isRegistered ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-center gap-2 py-3 bg-green-500/10 text-green-400 rounded-xl border border-green-500/20 font-bold">
                                    <CheckCircle size={20} />
                                    Registered
                                </div>
                                <p className="text-xs text-center text-slate-400">You are all set for this event!</p>
                            </div>
                        ) : (
                            <button
                                onClick={handleRegister}
                                disabled={isRegistering || event.remainingSeats <= 0}
                                className={`w-full py-4 rounded-2xl font-black text-lg transition-all shadow-xl flex justify-center items-center gap-2 ${event.remainingSeats > 0
                                        ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-primary-900/30'
                                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                    }`}
                            >
                                {isRegistering ? <Loader2 className="animate-spin" /> : event.remainingSeats > 0 ? 'Reserve Spot' : 'Full Capacity'}
                            </button>
                        )}

                        <div className="pt-2 text-[10px] text-slate-500 text-center uppercase tracking-widest leading-tight">
                            Instant booking confirmation <br /> Secure transaction guaranteed
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;
