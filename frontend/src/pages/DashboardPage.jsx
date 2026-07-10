import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { dashboardApi, predictApi } from '../api';

const RISK_COLOR = { HIGH: 'error', MEDIUM: 'yellow-500', LOW: 'secondary' };

export default function DashboardPage() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats]       = useState(null);
  const [history, setHistory]   = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    Promise.all([
      dashboardApi.stats(token),
      predictApi.history(token)
    ]).then(([s, h]) => {
      setStats(s);
      setHistory(h.slice(0, 8));
    }).catch(() => {}).finally(() => setLoading(false));
  }, [token]);

  const statCards = stats ? [
    { icon:'science',       label:'Total Scans',         value:stats.total_scans,       color:'primary'   },
    { icon:'warning',       label:'High Risk Detections', value:stats.high_risk,         color:'error'     },
    { icon:'check_circle',  label:'Safe Samples',        value:stats.safe_samples,      color:'secondary' },
    { icon:'psychology',    label:'Avg. AI Confidence',  value:`${stats.avg_confidence?.toFixed(1)}%`, color:'tertiary' },
  ] : [];

  return (
    <main className="pt-24 pb-16 min-h-screen bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
        <div className="mb-8">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Dashboard</h1>
          <p className="font-body-md text-on-surface-variant mt-1">Welcome back, {user?.username}. Here's your water safety overview.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <span className="msym text-primary text-[48px] animate-spin">autorenew</span>
          </div>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-8">
              {statCards.map((s, i) => (
                <div key={i} className="glass-card p-6">
                  <div className={`w-12 h-12 rounded-xl bg-${s.color}/10 flex items-center justify-center text-${s.color} mb-4`}>
                    <span className="msym text-[28px]">{s.icon}</span>
                  </div>
                  <p className="font-label-md text-on-surface-variant mb-1">{s.label}</p>
                  <p className={`font-headline-lg text-${s.color}`}>{s.value ?? '—'}</p>
                </div>
              ))}
            </div>

            {/* Scan History */}
            <div className="glass-card p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline-md text-on-surface">Recent Scans</h2>
                <button onClick={() => navigate('/history')} className="text-primary font-label-md hover:underline flex items-center gap-1">
                  View All <span className="msym text-[18px]">arrow_forward</span>
                </button>
              </div>

              {history.length === 0 ? (
                <div className="text-center py-16">
                  <span className="msym text-[64px] text-outline-variant block mb-4">history</span>
                  <p className="font-body-md text-on-surface-variant">No scans yet. Upload your first sample!</p>
                  <button onClick={() => navigate('/upload')} className="mt-6 bg-primary text-on-primary px-8 py-3 rounded-xl font-label-md hover:shadow-lg transition-all">
                    Upload Sample
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-outline-variant/30">
                        <th className="pb-3 font-label-md text-on-surface-variant">Organism</th>
                        <th className="pb-3 font-label-md text-on-surface-variant">Risk</th>
                        <th className="pb-3 font-label-md text-on-surface-variant">Confidence</th>
                        <th className="pb-3 font-label-md text-on-surface-variant">Date</th>
                        <th className="pb-3 font-label-md text-on-surface-variant">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((h, i) => (
                        <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-container/50 transition-colors">
                          <td className="py-4">
                            <p className="font-label-md text-on-surface">{h.organism_name}</p>
                            <p className="font-label-sm text-on-surface-variant italic">{h.common_name}</p>
                          </td>
                          <td className="py-4">
                            <span className={`px-3 py-1 rounded-full text-label-sm bg-${RISK_COLOR[h.risk_level]}/10 text-${RISK_COLOR[h.risk_level] === 'yellow-500' ? 'yellow-700' : RISK_COLOR[h.risk_level]}`}>
                              {h.risk_level}
                            </span>
                          </td>
                          <td className="py-4 font-label-md text-on-surface">{h.confidence?.toFixed(1)}%</td>
                          <td className="py-4 font-label-sm text-on-surface-variant">{new Date(h.created_at).toLocaleDateString()}</td>
                          <td className="py-4">
                            <button onClick={() => navigate(`/results/${h.id}`)} className="text-primary font-label-sm hover:underline flex items-center gap-1">
                              View <span className="msym text-[16px]">open_in_new</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
