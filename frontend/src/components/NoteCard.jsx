import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const NoteCard = ({ note, onDelete }) => {

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            const response = await fetch(`http://localhost:5001/api/notes/${note._id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success("Note deleted successfully");
                if (onDelete) onDelete(note._id);
            } else {
                throw new Error("Failed to delete note");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="card bg-base-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-base-content/5 overflow-hidden group">
            {/* Green glowing top border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_10px_rgba(30,184,84,0.7)] group-hover:h-1.5 transition-all"></div>

            <div className="card-body p-6">
                <Link to={`/node/${note._id}`} className="block group-hover:text-primary transition-colors">
                    <h2 className="card-title text-xl font-bold text-white mb-2">{note.title}</h2>
                </Link>

                <p className="text-base-content/80 mb-6 leading-relaxed line-clamp-3">{note.content}</p>

                <div className="card-actions justify-between items-end mt-auto pt-4 border-t border-base-content/10">
                    <span className="text-xs text-base-content/50 font-medium font-mono">
                        {new Date(note.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </span>
                    <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <Link to={`/edit/${note._id}`} className="btn btn-ghost btn-sm btn-square text-base-content/70 hover:text-primary hover:bg-base-content/10">
                            <Pencil size={18} />
                        </Link>
                        <button onClick={handleDelete} className="btn btn-ghost btn-sm btn-square text-base-content/70 hover:text-error hover:bg-base-content/10">
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
