import React, { useState, useEffect } from 'react';
import NoteCard from '../components/NoteCard';
import RateLimitWarning from '../components/RateLimitWarning';
import { FileText, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Homepage = () => {
    const [notes, setNotes] = useState([]);
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                // Assuming backend is running on default port 5001
                const response = await fetch('http://localhost:5001/api/notes');

                if (response.status === 429) {
                    setIsRateLimited(true);
                    setIsLoading(false);
                    toast.error("Rate limit reached! Please wait.");
                    return;
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch notes');
                }

                const data = await response.json();
                setNotes(data);
                setIsRateLimited(false);
            } catch (err) {
                console.error("Error fetching notes:", err);
                setError(err.message);
                toast.error(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotes();
        // Poll every 2 seconds to check if rate limit is lifted (optional, but good for UX)
        // Or just let user refresh. For now, we fetch once.
    }, []);

    // Function to retry fetching manually
    const retryFetch = async () => {
        setIsLoading(true);
        setIsRateLimited(false);
        setError(null);
        try {
            const response = await fetch('http://localhost:5001/api/notes');
            if (response.status === 429) {
                setIsRateLimited(true);
                toast.error("Still rate limited. Please wait.");
            } else if (response.ok) {
                const data = await response.json();
                setNotes(data);
            } else {
                throw new Error('Failed to fetch notes');
            }
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 pb-10">
            {isRateLimited && <RateLimitWarning />}

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin text-primary" size={48} />
                </div>
            ) : error ? (
                <div className="text-center py-20">
                    <p className="text-error mb-4">{error}</p>
                    <button onClick={retryFetch} className="btn btn-outline btn-primary">Try Again</button>
                </div>
            ) : notes.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-base-200/30 rounded-3xl border border-dashed border-base-content/10 mt-8">
                    <div className="bg-base-200 p-4 rounded-full mb-4">
                        <FileText size={48} className="text-primary/50" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">No notes found</h3>
                    <p className="text-base-content/60 max-w-md mb-6">Create your first note to get started with ThinkBoard.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {notes.map(note => (
                        <NoteCard key={note._id} note={note} onDelete={(id) => setNotes(notes.filter(n => n._id !== id))} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Homepage;
