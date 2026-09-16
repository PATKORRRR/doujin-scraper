'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [ketikan, setKetikan] = useState('');
  const [daftarKomik, setDaftarKomik] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data manga saat web pertama dibuka
  useEffect(() => {
    fetchData('');
  }, []);

  const fetchData = async (queryStr = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(queryStr)}`);
      const data = await res.json();
      setDaftarKomik(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setDaftarKomik([]);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(ketikan);
  };

  return (
    <div style={{ backgroundColor: '#12100e', color: '#f3f4f6', minHeight: '100vh', fontFamily: 'sans-serif', paddingBottom: '70px' }}>
      
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 16px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', fontFamily: 'serif' }}>Doujin & Manga</h1>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>Koleksi doujin, manga, dan manhwa dari berbagai genre.</p>
        </div>

        {/* Fitur Search */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <input 
            type="text" 
            placeholder="Cari komik favoritmu..." 
            value={ketikan}
            onChange={(e) => setKetikan(e.target.value)}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid #2a2723',
              backgroundColor: '#1c1917',
              color: '#fff',
              outline: 'none'
            }}
          />
          <button 
            type="submit" 
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#e11d48',
              color: '#fff',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Cari
          </button>
        </form>

        {/* Status Loading / Kosong */}
        {loading && <p style={{ textAlign: 'center', color: '#a1a1aa' }}>⚡ Memuat data dari gaktahu-ten...</p>}

        {!loading && daftarKomik.length === 0 && (
          <p style={{ textAlign: 'center', color: '#71717a' }}>Komik tidak ditemukan.</p>
        )}

        {/* Grid Komik */}
        {!loading && daftarKomik.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '16px' }}>
            {daftarKomik.map((komik, index) => (
              <div 
                key={index} 
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  aspectRatio: '3/4',
                  backgroundColor: '#1c1917',
                  border: '1px solid #2a2723'
                }}
              >
                <img 
                  src={komik.thumb || komik.image || '/placeholder.png'} 
                  alt={komik.title || komik.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)' }} />

                <div style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>
                    {komik.type || 'MANHWA'}
                  </span>
                  {komik.rating && (
                    <span style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: '#fbbf24', fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>
                      ★ {komik.rating}
                    </span>
                  )}
                </div>

                <div style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {komik.title || komik.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}