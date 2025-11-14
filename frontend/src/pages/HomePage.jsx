import React, { useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import { useState } from 'react'
import RateLimitedUI from '../components/RateLimitedUI.jsx'
import api from '../lib/axios.js'
import NoteCard from '../components/NoteCard.jsx'
import toast from 'react-hot-toast'

const HomePage = () => {
    const [isRatelimited, setRateLimited] = useState(false)
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoading(true);
                const res = await api.get("/notes");
                console.log("Notes fetched:", res.data);
                setNotes(res.data);
                setRateLimited(false);
            }
            catch (error) {
                console.error("Error fetching notes:", error);
                if (error.response?.status === 429) {
                    setRateLimited(true);
                }
                else {
                    toast.error("Failed to load notes")
                }
            }
            finally {
                setLoading(false)
            }
        };
        fetchNotes();
    }, [])
    return (
        <div className="min-h-screen">
            <Navbar />
            {isRatelimited && <RateLimitedUI />}
            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading ? (
                    <p>Loading notes...</p>
                ) : notes.length === 0 ? (
                    <p className="text-center text-lg">No notes found. Create your first note!</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {notes.map((note) => (
                            <NoteCard key={note._id} note={note} setNotes={setNotes CSS} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage