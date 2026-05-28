import { useState } from 'react';

export default function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    setShortUrl('');
    try {
      const res = await fetch('https://snapurl-f71p.onrender.com/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: url })
      });
      const data = await res.json();
      setShortUrl(data.shortUrl);
    } catch {
      setError('Something went wrong. Is the server running?');
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center px-4" style={{ fontFamily: "'Syne', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=DM+Mono:wght@400;500&display=swap');
        .orb1 { position:fixed; width:500px; height:500px; border-radius:50%; background:radial-gradient(circle,#5c4bf5 0%,transparent 70%); top:-200px; left:50%; transform:translateX(-50%); opacity:0.3; pointer-events:none; }
        .orb2 { position:fixed; width:250px; height:250px; border-radius:50%; background:radial-gradient(circle,#f0709a 0%,transparent 70%); bottom:40px; right:40px; opacity:0.15; pointer-events:none; }
      `}</style>

      <div className="orb1" />
      <div className="orb2" />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:'0.12em', color:'#9b8ff5', background:'rgba(92,75,245,0.12)', border:'1px solid rgba(92,75,245,0.25)', padding:'5px 14px', borderRadius:100, marginBottom:20, textTransform:'uppercase' }}>
          URL Shortener
        </span>

        <h1 style={{ fontSize:52, fontWeight:800, color:'#fff', margin:'0 0 6px', letterSpacing:'-0.03em', lineHeight:1.1, textAlign:'center' }}>
          Snap<span style={{ background:'linear-gradient(135deg,#a78bfa,#f472b6)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>URL</span> ⚡
        </h1>
        <p style={{ fontSize:15, color:'#6b6b80', margin:'0 0 36px', textAlign:'center' }}>
          Shorten, share, and track your links in seconds
        </p>

        <div style={{ width:'100%', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:24 }}>
          <div style={{ display:'flex', gap:10 }}>
            <input
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleShorten()}
              placeholder="https://your-long-url.com/goes/here"
              style={{ flex:1, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, padding:'13px 16px', fontFamily:"'DM Mono',monospace", fontSize:13, color:'#e2e2f0', outline:'none' }}
            />
            <button
              onClick={handleShorten}
              style={{ background:'linear-gradient(135deg,#5c4bf5,#a855f7)', border:'none', borderRadius:10, padding:'13px 22px', fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700, color:'white', cursor:'pointer', whiteSpace:'nowrap' }}
            >
              {loading ? '...' : 'Shorten'}
            </button>
          </div>

          {shortUrl && (
            <div style={{ marginTop:16, padding:16, background:'rgba(92,75,245,0.1)', border:'1px solid rgba(92,75,245,0.2)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:13, color:'#a78bfa', wordBreak:'break-all' }}>{shortUrl}</span>
              <button onClick={handleCopy} style={{ background:'rgba(167,139,250,0.15)', border:'1px solid rgba(167,139,250,0.25)', borderRadius:8, padding:'7px 14px', fontFamily:"'Syne',sans-serif", fontSize:12, fontWeight:600, color:'#a78bfa', cursor:'pointer', whiteSpace:'nowrap' }}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}

          {error && <p style={{ marginTop:12, fontSize:13, color:'#f87171', fontFamily:"'DM Mono',monospace" }}>⚠ {error}</p>}
        </div>

        <div style={{ display:'flex', gap:24, marginTop:32 }}>
          {[['∞','Links'],['0ms','Latency'],['100%','Uptime']].map(([num, label], i, arr) => (
            <div key={label} style={{ display:'flex', gap:24, alignItems:'center' }}>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:22, fontWeight:800, color:'#fff', letterSpacing:'-0.02em' }}>{num}</div>
                <div style={{ fontSize:11, color:'#44445a', textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:"'DM Mono',monospace", marginTop:2 }}>{label}</div>
              </div>
              {i < arr.length - 1 && <div style={{ width:1, height:36, background:'rgba(255,255,255,0.07)' }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}