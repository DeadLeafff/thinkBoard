import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2, Calendar, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const NodeDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/notes/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to load note");
                }
                const data = await response.json();
                setNote(data);
            } catch (error) {
                toast.error("Could not load note details");
                navigate('/');
            } finally {
                setIsLoading(false);
            }
        };
        fetchNote();
    }, [id, navigate]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            const response = await fetch(`http://localhost:5001/api/notes/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                toast.success("Note deleted successfully");
                navigate('/');
            } else {
                throw new Error("Failed to delete note");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    if (!note) return null;

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <Link to="/" className="btn btn-ghost btn-sm mb-6 pl-0 hover:bg-transparent hover:text-primary transition-colors">
                <ArrowLeft size={18} className="mr-2" /> Back to Notes
            </Link>

            <div className="card bg-base-200/50 shadow-xl border border-base-content/5 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_10px_rgba(30,184,84,0.7)]"></div>

                <div className="card-body p-8 sm:p-12">
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-4xl font-bold text-white">{note.title}</h1>
                        <div className="flex gap-2">
                            <Link to={`/edit/${note._id}`} className="btn btn-ghost btn-circle flex items-center justify-center hover:text-primary tooltip tooltip-bottom" data-tip="Edit">
                                <Pencil size={20} />
                            </Link>
                            <button onClick={handleDelete} className="btn btn-ghost btn-circle flex items-center justify-center hover:text-error tooltip tooltip-bottom" data-tip="Delete">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-base-content/60 mb-8 font-mono bg-base-300/30 w-fit px-3 py-1 rounded-full">
                        <Calendar size={14} />
                        <span>
                            {new Date(note.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </div>

                    <div className="prose prose-lg text-base-content/90 max-w-none leading-relaxed whitespace-pre-line">
                        {note.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NodeDetailPage;