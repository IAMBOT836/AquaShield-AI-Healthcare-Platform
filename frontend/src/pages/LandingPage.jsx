import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const features = [
  { icon: 'psychology',       color: 'primary',    title: 'AI Detection',      desc: 'Microscope image classification using state-of-the-art Deep Learning models to identify pathogens instantly.' },
  { icon: 'query_stats',      color: 'secondary',  title: 'Disease Prediction',desc: 'Predict possible waterborne diseases associated with detected microorganisms before outbreaks occur.' },
  { icon: 'warning',          color: 'error',      title: 'Risk Assessment',   desc: 'Clear categorization into Low, Medium, or High contamination levels for immediate visual awareness.' },
  { icon: 'water_drop',       color: 'primary',    title: 'Water Purification',desc: 'Actionable suggestions for boiling, UV treatment, chlorination, and high-efficiency filtration methods.' },
  { icon: 'medical_services', color: 'tertiary',   title: 'Medical Guidance',  desc: 'Personalized symptom tracking, prevention protocols, and first aid recommendations tailored to findings.' },
  { icon: 'hub',              color: 'secondary',  title: 'Community Health',  desc: 'An intelligent early warning system mapping data to protect broader regional health ecosystems.' },
];

export default function LandingPage() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const fileRef   = useRef();

  const handleAnalyze = () => {
    if (!user) { navigate('/login'); return; }
    navigate('/upload');
  };

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Atmospheric background */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] bg-primary/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-secondary/10 blur-[150px] rounded-full" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/20 text-primary font-label-sm text-label-sm mb-6">
              <span className="msym text-[16px]" style={{fontVariationSettings:"'FILL' 1"}}>verified</span>
              AI-Powered Water Safety
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-6 leading-tight">
              Protect Communities<br/>Before Disease Spreads.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl">
              AquaShield AI leverages Deep Learning and Computer Vision to detect harmful microorganisms in water samples, assess health risks, and provide instant preventive guidance for safer communities.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleAnalyze}
                className="bg-primary text-on-primary px-8 py-4 rounded-xl font-headline-md text-headline-md hover:shadow-xl transition-all active:scale-95 flex items-center gap-2"
              >
                <span className="msym">upload_file</span>
                Upload Sample
              </button>
              <a href="#features" className="bg-white/50 backdrop-blur-md border border-primary/20 text-primary px-8 py-4 rounded-xl font-headline-md text-headline-md hover:bg-white/80 transition-all active:scale-95">
                Learn More
              </a>
            </div>
          </div>

          <div className="relative animate-fade-in-up" style={{animationDelay:'0.2s'}}>
            <div className="glass p-4 rounded-2xl" style={{boxShadow:'0 0 20px rgba(0,74,198,0.15)'}}>
              <div className="relative overflow-hidden rounded-xl h-[380px] md:h-[480px] bg-surface-container-high flex items-center justify-center">
                <div className="text-center p-8">
                  <span className="msym text-primary text-[80px] mb-4 block">biotech</span>
                  <p className="text-on-surface-variant font-body-md">AI Microscopy Analysis Platform</p>
                  <div className="mt-4 flex justify-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container text-label-sm">99.8% Accuracy</span>
                    <span className="px-3 py-1 rounded-full bg-primary-container/20 text-primary text-label-sm">Real-time</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating Icons */}
            <div className="absolute -top-6 -right-6 glass p-4 rounded-2xl floating-icon" style={{animationDelay:'0.5s'}}>
              <span className="msym text-primary text-[32px]">biotech</span>
            </div>
            <div className="absolute -bottom-6 -left-6 glass p-4 rounded-2xl floating-icon" style={{animationDelay:'1.2s'}}>
              <span className="msym text-secondary text-[32px]">health_metrics</span>
            </div>
            <div className="absolute top-1/2 -right-12 glass p-4 rounded-2xl floating-icon" style={{animationDelay:'0.8s'}}>
              <span className="msym text-tertiary text-[32px]">shield_with_heart</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 bg-surface-container-low" id="features">
        <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Comprehensive Water Analysis</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
              Our advanced neural networks analyze every pixel to ensure safety and precision in microscopic water monitoring.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {features.map((f, i) => (
              <div key={i} className="glass-card p-8 animate-fade-in-up" style={{animationDelay:`${0.1*(i+1)}s`}}>
                <div className={`w-14 h-14 rounded-xl bg-${f.color}/10 flex items-center justify-center text-${f.color} mb-6`}>
                  <span className="msym text-[32px]">{f.icon}</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-3">{f.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upload CTA ── */}
      <section className="py-24 relative overflow-hidden" id="upload">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-right" />
        <div className="relative max-w-4xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
          <div className="text-center mb-12">
            <h2 className="font-display-lg text-display-lg-mobile md:text-headline-lg text-on-surface mb-4">Start Analysis Now</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Securely upload your microscopic water sample for instant AI processing.</p>
          </div>
          <div className="glass-card rounded-[32px] p-12 border-2 border-dashed border-primary/30 text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="msym text-primary text-[40px]">cloud_upload</span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-2">Drag &amp; Drop microscopic image here</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Supported formats: PNG, JPG, JPEG (Max 10MB)</p>
            </div>
            <div className="flex flex-col items-center gap-6">
              <button
                onClick={handleAnalyze}
                className="bg-primary text-on-primary px-12 py-4 rounded-xl font-headline-md text-headline-md hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                Analyze Sample
              </button>
              <div className="flex items-center gap-4 text-outline">
                <hr className="w-12 border-outline-variant" />
                <span className="text-label-sm font-label-sm">OR</span>
                <hr className="w-12 border-outline-variant" />
              </div>
              <button onClick={handleAnalyze} className="cursor-pointer text-primary font-label-md text-label-md hover:underline">
                Browse files from computer
              </button>
            </div>
          </div>
          <div className="mt-12 flex justify-center items-center gap-12 opacity-50 grayscale">
            <span className="msym text-[48px]">security</span>
            <span className="msym text-[48px]">clinical_notes</span>
            <span className="msym text-[48px]">verified_user</span>
          </div>
        </div>
      </section>
    </main>
  );
}
