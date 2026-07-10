import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { predictApi } from '../api';

const riskColors = { HIGH: 'error', MEDIUM: 'warning', LOW: 'secondary' };
const riskLabel  = { HIGH: 'CRITICAL THREAT LEVEL', MEDIUM: 'MODERATE THREAT', LOW: 'LOW RISK' };

export default function ResultsPage() {
  const { id }         = useParams();
  const { token }      = useAuth();
  const navigate       = useNavigate();
  const [data, setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]  = useState('');

  useEffect(() => {
    predictApi.get(id, token)
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, token]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <span className="msym text-primary text-[64px] animate-spin block mb-4">autorenew</span>
        <p className="font-body-md text-on-surface-variant">Loading results...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="glass-card p-10 max-w-md text-center">
        <span className="msym text-error text-[48px] mb-4 block">error</span>
        <p className="font-body-md text-error mb-6">{error}</p>
        <button onClick={() => navigate('/upload')} className="bg-primary text-on-primary px-6 py-3 rounded-xl font-label-md">
          Try Again
        </button>
      </div>
    </div>
  );

  if (!data) return null;

  const risk  = data.risk_level || 'HIGH';
  const color = riskColors[risk] || 'error';
  const conf  = data.confidence || 98.4;
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (conf / 100) * circumference;

  const treatments = [
    { icon:'kettle',     label:'Boiling',       desc:'Min. 10 minutes at 100°C' },
    { icon:'wb_sunny',   label:'UV Purification',desc:'Standard UV-C treatment'  },
    { icon:'filter_alt', label:'RO Filtration',  desc:'Reverse Osmosis (0.0001μ)'},
    { icon:'science',    label:'Chlorination',   desc:'Controlled chemical dosing'},
  ];

  const medActions = ['Drink ORS', 'Maintain Hydration', 'Consult Doctor', 'Visit Primary Health Centre'];

  return (
    <div className="bg-surface-container-low min-h-screen">
      {/* Alert banner */}
      {risk === 'HIGH' && (
        <div className="bg-error text-on-error py-3 px-4 text-center sticky top-20 z-40 animate-pulse font-label-md flex items-center justify-center gap-2">
          <span className="msym">warning</span>
          UNSAFE WATER DETECTED. AVOID CONSUMPTION IMMEDIATELY.
        </div>
      )}

      <main className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop py-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

          {/* Left Sidebar */}
          <aside className="lg:col-span-3 flex flex-col gap-card-gap">
            {/* Sample preview */}
            <div className="glass-card p-6">
              <h3 className="font-headline-md text-on-surface mb-4">Sample Input</h3>
              <div className="aspect-square rounded-xl overflow-hidden bg-surface-dim relative group">
                {data.image_url ? (
                  <img src={data.image_url} alt="Sample" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-surface-container flex items-center justify-center">
                    <span className="msym text-primary text-[64px]">biotech</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="msym text-white text-5xl">zoom_in</span>
                </div>
              </div>
              <p className="text-on-surface-variant font-label-sm mt-3 text-center">Microscope Batch #{data.id}</p>
            </div>

            {/* Confidence gauge */}
            <div className="glass-card p-6 flex flex-col items-center">
              <h3 className="font-label-md text-on-surface-variant mb-6 uppercase tracking-wider">AI Confidence</h3>
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle className="text-surface-container-highest" cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" strokeWidth="8" />
                  <circle
                    className="text-primary progress-ring__circle"
                    cx="50" cy="50" fill="transparent" r="42"
                    stroke="currentColor" strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-headline-md text-primary">{conf.toFixed(1)}%</span>
                </div>
              </div>
              <p className="font-label-sm text-on-surface-variant mt-4 text-center">Highly certain match</p>
            </div>

            {/* Risk badge */}
            <div className={`glass-card p-6 bg-${color}-container/30 border-${color}/20 flex flex-col items-center justify-center`}>
              <div className={`bg-${color} text-on-${color} px-6 py-3 rounded-full font-headline-md flex items-center gap-2 ${risk==='HIGH'?'pulse-red':''}`}>
                <span className="msym" style={{fontVariationSettings:"'FILL' 1"}}>dangerous</span>
                {risk} RISK
              </div>
              <p className={`text-${color} font-label-sm mt-4 font-bold`}>{riskLabel[risk]}</p>
            </div>
          </aside>

          {/* Center */}
          <section className="lg:col-span-6 flex flex-col gap-card-gap">
            <div className="glass-card p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className={`font-headline-lg text-${color} mb-1`}>{data.organism_name}</h2>
                  <p className="font-headline-md text-on-surface-variant italic">{data.common_name}</p>
                </div>
                <div className="p-4 bg-surface-container rounded-full">
                  <span className="msym text-primary text-4xl">biotech</span>
                </div>
              </div>

              {/* Biohazard meter */}
              <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-label-md text-on-surface-variant">Biohazard Meter</span>
                  <span className={`font-label-md text-${color} font-bold`}>{risk === 'HIGH' ? 'Extreme Threat' : risk === 'MEDIUM' ? 'Moderate Threat' : 'Low Threat'}</span>
                </div>
                <div className="h-4 w-full bg-surface-container rounded-full overflow-hidden flex">
                  <div className="h-full w-1/3 bg-secondary" />
                  <div className="h-full w-1/3 bg-yellow-400" />
                  <div className={`h-full ${risk==='HIGH'?'w-1/3':'w-0'} bg-error relative transition-all duration-1000`}>
                    {risk==='HIGH' && <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-6 bg-white rounded-full shadow-lg" />}
                  </div>
                </div>
              </div>
            </div>

            {/* Disease info */}
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="msym text-primary">info</span>
                <h3 className="font-headline-md">Disease Intelligence</h3>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <span className={`bg-${color} text-on-${color} px-3 py-1 rounded text-label-sm`}>{risk} SEVERITY</span>
                {risk === 'HIGH' && <span className="text-on-surface-variant font-label-md italic">Highly Contagious</span>}
              </div>
              <p className="font-body-md text-on-surface-variant leading-relaxed mb-8">{data.description}</p>
              {data.symptoms && data.symptoms.length > 0 && (
                <>
                  <h4 className="font-label-md text-on-surface uppercase tracking-widest mb-4">Common Symptoms</h4>
                  <div className="flex flex-wrap gap-3">
                    {data.symptoms.map((s, i) => (
                      <span key={i} className="px-4 py-2 bg-surface-container-highest text-on-surface rounded-full font-label-md border border-outline-variant/30 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full bg-${color}`} /> {s}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Right Sidebar */}
          <aside className="lg:col-span-3 flex flex-col gap-card-gap">
            {/* Treatment */}
            <div className="glass-card p-6">
              <h3 className="font-headline-md mb-6">Treatment Plan</h3>
              <div className="space-y-4">
                {treatments.map((t, i) => (
                  <div key={i} className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/20 flex items-center gap-4 hover:bg-white transition-all cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary">
                      <span className="msym">{t.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-label-md text-on-surface">{t.label}</h4>
                      <p className="text-xs text-on-surface-variant">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical */}
            <div className="glass-card p-6 bg-primary-container/5 border-primary/10">
              <h3 className="font-headline-md mb-6 flex items-center gap-2">
                <span className="msym text-primary">medical_services</span>
                Medical Actions
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {medActions.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-white/20">
                    <span className="msym text-secondary">check_circle</span>
                    <span className="font-label-md">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Chat CTA */}
            <div className="glass-card p-6 bg-tertiary-container/10 border-tertiary/20">
              <div className="flex items-center gap-2 mb-4">
                <span className="msym text-tertiary">auto_awesome</span>
                <h4 className="font-label-md font-bold text-tertiary uppercase">AI Assistant</h4>
              </div>
              <p className="font-label-sm text-on-surface-variant mb-4">Need help understanding these results? Our AI medic is ready to assist.</p>
              <button
                onClick={() => navigate('/chat', { state: { context: `I was diagnosed with ${data.organism_name} (${data.common_name}).` } })}
                className="w-full py-3 bg-tertiary text-on-tertiary rounded-xl font-label-md hover:shadow-lg transition-shadow"
              >
                Start Health Chat
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
