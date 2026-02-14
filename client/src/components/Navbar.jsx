import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, User, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="sticky top-0 z-50 glass border-b border-slate-800">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent flex items-center gap-2">
                    <Calendar className="text-primary-500" />
                    Eventify
                </Link>
                <div className="flex gap-6 items-center">
                    <Link to="/" className="hover:text-primary-400 transition-colors">Browse</Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="flex items-center gap-1 hover:text-primary-400 transition-colors">
                                <LayoutDashboard size={18} />
                                Dashboard
                            </Link>
                            <div className="flex items-center gap-4 pl-4 border-l border-slate-700">
                                <span className="text-sm text-slate-400 flex items-center gap-1">
                                    <User size={14} />
                                    {user.name}
                                </span>
                                <button onClick={logout} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-red-400 transition-all">
                                    <LogOut size={18} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-primary-400 transition-colors">Login</Link>
                            <Link to="/register" className="bg-primary-600 hover:bg-primary-500 px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-primary-900/20">
                                Join Now
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
