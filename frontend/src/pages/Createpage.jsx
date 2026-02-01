import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BASE_URL } from '../utils';

const Createpage = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // If id exists, we are in edit mode

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Fetch existing note if in edit mode
    useEffect(() => {
        if (id) {
            const fetchNote = async () => {
                setIsLoading(true);
                try {
                    const response = await fetch(`${BASE_URL}/api/notes/${id}`);

                    if (!response.ok) {
                        throw new Error('Failed to load note');
                    }

                    const data = await response.json();
                    setTitle(data.title);
                    setContent(data.content);
                } catch (error) {
                    toast.error("Failed to load note");
                    navigate('/');
                } finally {
                    setIsLoading(false);
                }
            }
            fetchNote();
        }
    }, [id, navigate]);

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            toast.error("Please provide both title and content");
            return;
        }

        setIsSaving(true);
        try {
            const method = id ? 'PUT' : 'POST';
            const url = id
                ? `${BASE_URL}/api/notes/${id}`
                : `${BASE_URL}/api/notes`;

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });

            if (response.status === 429) {
                toast.error("Rate limit reached! Please wait.");
                return;
            }

            if (!response.ok) {
                throw new Error("Failed to save note");
            }

            toast.success(id ? "Note updated successfully" : "Note created successfully");
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">{id ? 'Edit Note' : 'Create New Note'}</h1>
                <button onClick={() => navigate('/')} className="btn btn-ghost btn-sm">
                    Back to Home
                </button>
            </div>

            <div className="card bg-base-200/50 shadow-xl border border-base-content/5 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_10px_rgba(30,184,84,0.7)]"></div>

                <div className="card-body gap-6 p-8">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold text-lg">Note Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter title (e.g., SQL Basics)"
                            className="input input-lg input-bordered focus:border-primary focus:outline-none w-full bg-base-100 border-base-content/20"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={isSaving}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold text-lg">Content</span>
                        </label>
                        <textarea
                            className="textarea textarea-lg textarea-bordered h-64 focus:border-primary focus:outline-none w-full bg-base-100 border-base-content/20 leading-relaxed"
                            placeholder="Write your thoughts here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={isSaving}
                        ></textarea>
                    </div>

                    <div className="card-actions justify-end mt-6 gap-3">
                        <button
                            onClick={() => navigate('/')}
                            className="btn btn-ghost hover:bg-base-content/10"
                            disabled={isSaving}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="btn btn-primary px-10 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                            disabled={isSaving}
                        >
                            {isSaving ? <span className="loading loading-spinner"></span> : (id ? 'Update Note' : 'Save Note')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Createpage;
