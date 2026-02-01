import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 px-4 sm:px-8 py-4 mb-4">
            <div className="flex-1">
                <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-primary tracking-wider hover:opacity-80 transition-opacity">
                    <img src="/logo.png" alt="ThinkBoard Logo" className="w-10 h-10 object-contain" />
                    ThinkBoard
                </Link>
            </div>
            <div className="flex-none">
                <Link to="/create" className="btn btn-primary btn-sm sm:btn-md rounded-full px-6 font-bold text-base-100 hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                    <Plus size={20} /> <span className="hidden sm:inline">New Note</span>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
