'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [ketikan, setKetikan] = useState('');
  const [daftarKomik, setDaftarKomik] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil komik otomatis saat web pertama kali dibuka
  useEffect(() => {
    fetchKomik('');
  }, []);

  const fetchKomik = async (queryStr = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(queryStr)}`);
      const data = await res.json();
      setDaftarKomik(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const cariKomik = (e) => {
    e.preventDefault();
    fetchKomik(ketikan);
  };

  return (
    <div style={{ backgroundColor: '#090d16', color: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(12px)', backgroundColor: 'rgba(15, 23, 42, 0.8)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '12px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #f43f5e, #be123c)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 0 15px rgba(244, 63, 94, 0.4)' }}>
              📚
            </div>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', letterSpacing: '-0.5px' }}>
              Doujin<span style={{ color: '#f43f5e' }}>AdFree</span>
            </span>
          </a>

          <form onSubmit={cariKomik} style={{ display: 'flex', gap: '8px', width: '100%', maxWidth: '380px' }}>
            <input 
              type="text" 
              placeholder="Cari komik, manga, manhwa..." 
              value={ketikan}
              onChange={(e) => setKetikan(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backgroundColor: '#1e293b',
                color: '#fff',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button 
              type="submit" 
              style={{
                padding: '10px 18px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
                color: '#fff',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(244, 63, 94, 0.3)'
              }}
            >
              Cari
            </button>
          </form>

        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
        
        <div style={{ marginBottom: '32px' }}>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#f43f5e', textTransform: 'uppercase', letterSpacing: '1px', backgroundColor: 'rgba(244, 63, 94, 0.1)', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
            Koleksi Terbaru
          </span>
          <h1 style={{ fontSize: '28px', fontWeight: '800', marginTop: '12px', color: '#f8fafc' }}>
            Daftar Komik Populer
          </h1>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
            <p style={{ fontSize: '18px' }}>⚡ Memuat daftar komik...</p>
          </div>
        )}

        {/* Grid List */}
        {!loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '20px' }}>
            {daftarKomik.map((komik, index) => (
              <div 
                key={index} 
                style={{
                  backgroundColor: '#0f172a',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer'
                }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '2/3', backgroundColor: '#1e293b', overflow: 'hidden' }}>
                  <img 
                    src={komik.thumb || komik.image || '/placeholder.png'} 
                    alt={komik.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  {komik.type && (
                    <span style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: 'rgba(15, 23, 42, 0.85)', color: '#38bdf8', fontSize: '10px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '6px', backdropFilter: 'blur(4px)', textTransform: 'uppercase' }}>
                      {komik.type}
                    </span>
                  )}
                </div>

                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '13px', fontWeight: '600', margin: '0 0 8px 0', color: '#f1f5f9', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {komik.title}
                  </h3>
                  {komik.chapter && (
                    <div style={{ marginTop: 'auto' }}>
                      <span style={{ fontSize: '11px', color: '#f43f5e', fontWeight: '600', backgroundColor: 'rgba(244, 63, 94, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                        {komik.chapter}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}