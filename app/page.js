'use client';
import { useState } from 'react';

export default function Home() {
  const [ketikan, setKetikan] = useState('');
  const [daftarKomik, setDaftarKomik] = useState([]);
  const [loading, setLoading] = useState(false);

  const cariKomik = async (e) => {
    e.preventDefault();
    if (!ketikan) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(ketikan)}`);
      const data = await res.json();
      setDaftarKomik(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <header style={{ padding: '20px 40px', backgroundColor: '#1e293b', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#38bdf8' }}>MangaVerse 🚀</h1>
        <form onSubmit={cariKomik} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Cari judul komik..." 
            value={ketikan}
            onChange={(e) => setKetikan(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', outline: 'none', width: '280px' }}
          />
          <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#0284c7', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
            {loading ? 'Mencari...' : 'Cari'}
          </button>
        </form>
      </header>

      {/* Main Content */}
      <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        {daftarKomik.length === 0 && !loading && (
          <div style={{ textAlign: 'center', marginTop: '60px', color: '#94a3b8' }}>
            <h2>Ketik judul komik di atas lalu tekan Cari! 🔍</h2>
          </div>
        )}

        {/* Grid List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
          {daftarKomik.map((komik, index) => (
            <div key={index} style={{ backgroundColor: '#1e293b', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155', transition: 'transform 0.2s', cursor: 'pointer' }}>
              <div style={{ position: 'relative', width: '100%', height: '250px', backgroundColor: '#334155' }}>
                <img 
                  src={komik.thumb || komik.image || '/placeholder.png'} 
                  alt={komik.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div style={{ padding: '12px' }}>
                <h3 style={{ fontSize: '14px', margin: '0 0 8px 0', color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {komik.title}
                </h3>
                {komik.chapter && (
                  <span style={{ fontSize: '12px', backgroundColor: '#0284c7', padding: '2px 8px', borderRadius: '4px', color: '#fff' }}>
                    {komik.chapter}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}