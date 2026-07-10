import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { predictApi } from '../api';

export default function HistoryPage() {
  const { token } = useAuth();
  const navigate  = useNavigate();
  const [scans, setScans]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');

  useEffect(() => {
    predictApi.history(token).then(setScans).catch(() => {}).finally(() => setLoading(false));
  }, [token]);

  const filtered = scans.filter(s =>
    s.organism_name?.toLowerCase().includes(search.toLowerCase()) ||
    s.risk_level?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="pt-24 pb-16 min-h-screen bg-surface-container-low">
      <div className="max-w-5xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Scan History</h1>
            <p className="font-body-md text-on-surface-variant">{scans.length} total scans</p>
          </div>
          <div className="relative">
            <span className="msym text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2 text-[20px]">search</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search scans..."
              className="pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/50 bg-surface font-label-md focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 w-64"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <span className="msym text-primary text-[48px] animate-spin">autorenew</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass-card p-16 text-center">
            <span className="msym text-[64px] text-outline-variant block mb-4">history</span>
            <p className="font-body-md text-on-surface-variant">No scans found. Upload your first sample!</p>
            <button onClick={() => navigate('/upload')} className="mt-6 bg-primary text-on-primary px-8 py-3 rounded-xl font-label-md">
              Upload Sample
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((s, i) => (
              <div key={i} className="glass-card p-6 flex items-center gap-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate(`/results/${s.id}`)}>
                <div className="w-16 h-16 rounded-xl bg-surface-container flex items-center justify-center flex-shrink-0">
                  <span className="msym text-primary text-[32px]">biotech</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-label-md text-on-surface font-semibold truncate">{s.organism_name}</p>
                  <p className="font-label-sm text-on-surface-variant italic">{s.common_name}</p>
                  <p className="font-label-sm text-on-surface-variant mt-1">{new Date(s.created_at).toLocaleString()}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-label-sm ${s.risk_level==='HIGH'?'bg-error/10 text-error':s.risk_level==='MEDIUM'?'bg-yellow-100 text-yellow-700':'bg-secondary/10 text-secondary'}`}>
                    {s.risk_level}
                  </span>
                  <span className="font-label-sm text-on-surface-variant">{s.confidence?.toFixed(1)}% confidence</span>
                </div>
                <span className="msym text-on-surface-variant">chevron_right</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
