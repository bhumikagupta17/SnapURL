import { useState } from 'react';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleShorten = async () => {
    if (!originalUrl) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:8000/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl })
      });
      const data = await res.json();
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError('Something went wrong. Is the server running?');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">SnapURL ⚡</h1>

        <input
          type="text"
          placeholder="Paste your long URL here..."
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleShorten}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {shortUrl && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
            <p className="text-gray-500 text-sm mb-1">Your short URL:</p>
            <a href={shortUrl} target="_blank" rel="noreferrer" className="text-blue-600 font-semibold break-all">
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;