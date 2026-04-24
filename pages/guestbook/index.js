import { useState, useEffect } from 'react';

export default function Guestbook() {
    const [entries, setEntries] = useState([]);
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [website, setWebsite] = useState('');
    const [status, setStatus] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetch('/api/guestbook')
            .then(res => res.json())
            .then(data => setEntries(data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setStatus('');

        try {
            const res = await fetch('/api/guestbook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, message, website }),
            });

            if (!res.ok) {
                const data = await res.json();
                setStatus(data.error || 'Something went wrong');
                return;
            }

            const entry = await res.json();
            setEntries([entry, ...entries]);
            setMessage('');
            setStatus('');
        } catch {
            setStatus('Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    const formatDate = (iso) => {
        const d = new Date(iso);
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div>
            <h1>Guestbook</h1>
            <p>I don't track analytics, but I know people have been visiting this blog because I see many random people on my <a href="https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit" target="_blank" rel="noopener noreferrer">work cycles spreadsheet</a> 🥹 I'd love to know who you are!</p>

            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                    <input
                        type="text"
                        placeholder="Name (optional)"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            padding: '0.4rem 0.8rem',
                            fontSize: '16px',
                            borderRadius: '10px',
                            border: '1.5px solid #ccc',
                            fontFamily: 'inherit',
                            width: '100%',
                            maxWidth: '300px',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                    <input
                        type="url"
                        placeholder="Website (optional)"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        style={{
                            padding: '0.4rem 0.8rem',
                            fontSize: '16px',
                            borderRadius: '10px',
                            border: '1.5px solid #ccc',
                            fontFamily: 'inherit',
                            width: '100%',
                            maxWidth: '300px',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                    <textarea
                        placeholder="What's on your mind?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={3}
                        style={{
                            padding: '0.4rem 0.8rem',
                            fontSize: '16px',
                            borderRadius: '10px',
                            border: '1.5px solid #ccc',
                            fontFamily: 'inherit',
                            width: '100%',
                            boxSizing: 'border-box',
                            resize: 'vertical',
                        }}
                    />
                </div>
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Posting...' : 'Sign the guestbook'}
                </button>
                {status && <p className="subscribe-err">{status}</p>}
            </form>

            <div>
                {entries.map((entry, i) => (
                    <div
                        key={i}
                        style={{
                            borderBottom: '1px solid rgba(0,0,0,0.1)',
                            paddingBottom: '1rem',
                            marginBottom: '1rem',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '0.5rem',
                            marginBottom: '0.25rem',
                        }}>
                            <strong>
                                {entry.website ? (
                                    <a href={entry.website} target="_blank" rel="noopener noreferrer">{entry.username}</a>
                                ) : entry.username}
                            </strong>
                            <time>{formatDate(entry.date)}</time>
                        </div>
                        <p style={{ margin: 0 }}>{entry.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
