import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { predictApi } from '../api';

export default function UploadPage() {
  const { token } = useAuth();
  const navigate  = useNavigate();
  const fileRef   = useRef();
  const [dragging, setDragging]   = useState(false);
  const [file, setFile]           = useState(null);
  const [preview, setPreview]     = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress]   = useState(0);
  const [step, setStep]           = useState(-1);
  const [error, setError]         = useState('');

  const steps = [
    { label: 'Preprocessing Water Data', threshold: 15 },
    { label: 'Feature Extraction',       threshold: 35 },
    { label: 'AI Neural Classification', threshold: 60 },
    { label: 'Real-time Disease Mapping',threshold: 85 },
    { label: 'Generating Recommendations',threshold:95 },
  ];

  const onFile = (f) => {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError('');
  };

  const onDrop = useCallback((e) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith('image/')) onFile(f);
  }, []);

  const analyze = async () => {
    if (!file) { setError('Please select an image first.'); return; }
    setAnalyzing(true); setProgress(0); setStep(-1);
    const form = new FormData();
    form.append('file', file);

    // Simulate progress while calling API
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 1.5;
      if (p >= 95) { p = 95; clearInterval(iv); }
      setProgress(Math.min(p, 95));
      setStep(steps.findIndex(s => p < s.threshold) - 1);
    }, 100);

    try {
      const result = await predictApi.upload(form, token);
      clearInterval(iv);
      setProgress(100);
      setStep(steps.length - 1);
      setTimeout(() => navigate(`/results/${result.id}`), 1000);
    } catch (err) {
      clearInterval(iv);
      setAnalyzing(false);
      setError(err.message);
    }
  };

  if (analyzing) {
    return (
      <main className="relative min-h-screen w-full flex items-center justify-center pt-20 px-container-padding-mobile">
        <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[150px] rounded-full" />
        </div>
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Scanner */}
          <div className="relative flex justify-center items-center">
            <div className="relative w-72 h-72 md:w-[400px] md:h-[400px] rounded-full p-1 bg-gradient-to-tr from-primary/20 to-secondary/20 animate-glow">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-surface-container-lowest shadow-inner border-4 border-white/50">
                {preview && <img src={preview} alt="Sample" className="w-full h-full object-cover opacity-80" />}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
                <div className="absolute top-0 left-0 w-full h-full scanning-line opacity-60" />
                <div className="absolute inset-0 border border-secondary/20 rounded-full scale-90" />
                <div className="absolute inset-0 border border-secondary/10 rounded-full scale-75" />
              </div>
            </div>
            {/* Ring progress */}
            <div className="absolute -inset-4 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle className="text-outline-variant/20" cx="50" cy="50" fill="transparent" r="48" stroke="currentColor" strokeWidth="2" />
                <circle
                  className="text-secondary progress-ring__circle"
                  cx="50" cy="50" fill="transparent" r="48"
                  stroke="currentColor" strokeWidth="2"
                  strokeDasharray="301.59"
                  strokeDashoffset={301.59 - (progress / 100) * 301.59}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col space-y-8 glass-card p-8 md:p-12">
            <div>
              <div className="flex items-baseline gap-4">
                <h1 className="font-display-lg text-display-lg-mobile md:text-headline-lg text-on-surface tracking-tight">
                  {progress >= 100 ? 'Analysis Complete' : 'Analyzing Water Sample...'}
                </h1>
                <span className="font-display-lg text-primary text-display-lg-mobile md:text-headline-lg">
                  {Math.floor(progress)}%
                </span>
              </div>
              <p className="font-body-md text-on-surface-variant mt-2">AI-driven molecular diagnostics in progress. Please do not close this window.</p>
            </div>
            <div className="space-y-4">
              {steps.map((s, i) => (
                <div key={i} className={`flex items-center gap-4 transition-all duration-500 ${i <= step ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors duration-300 ${i <= step ? 'bg-secondary-container/30 border-secondary/40' : 'bg-surface-container border-outline-variant'}`}>
                    <span className={`msym text-[18px] ${i <= step ? 'text-secondary' : ''}`}
                      style={i <= step ? {fontVariationSettings:"'FILL' 1"} : {}}>
                      {i <= step ? 'check_circle' : 'hourglass_empty'}
                    </span>
                  </div>
                  <span className="font-label-md text-on-surface">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-primary-container/10 rounded-xl border border-primary/10 flex gap-4 items-center">
              <span className="msym text-primary" style={{fontVariationSettings:"'FILL' 1"}}>auto_awesome</span>
              <p className="text-label-sm text-on-primary-fixed-variant leading-relaxed">
                Our AI models are trained on 10M+ aquatic biosamples to ensure 99.8% diagnostic accuracy.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
        <div className="text-center mb-10">
          <h1 className="font-display-lg text-display-lg-mobile md:text-headline-lg text-on-surface mb-3">Upload Water Sample</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Securely upload your microscopic water sample for instant AI processing.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-error-container/40 border border-error/30 rounded-xl text-error font-label-md flex items-center gap-2">
            <span className="msym">error</span> {error}
          </div>
        )}

        <div
          className={`glass-card rounded-[32px] p-12 border-2 border-dashed text-center cursor-pointer transition-all ${dragging ? 'border-primary bg-primary/5' : 'border-primary/30'}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
        >
          {preview ? (
            <div className="flex flex-col items-center gap-6">
              <img src={preview} alt="Preview" className="w-48 h-48 object-cover rounded-2xl shadow-lg" />
              <p className="font-label-md text-on-surface-variant">{file?.name}</p>
            </div>
          ) : (
            <div className="mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="msym text-primary text-[40px]">cloud_upload</span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-2">Drag &amp; Drop microscopic image here</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Supported formats: PNG, JPG, JPEG (Max 10MB)</p>
            </div>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files[0])} />
        </div>

        <div className="flex flex-col items-center gap-4 mt-8">
          <button
            onClick={analyze}
            className="bg-primary text-on-primary px-12 py-4 rounded-xl font-headline-md text-headline-md hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            Analyze Sample
          </button>
          <button onClick={() => fileRef.current?.click()} className="text-primary font-label-md text-label-md hover:underline">
            Choose different file
          </button>
        </div>
      </div>
    </main>
  );
}
