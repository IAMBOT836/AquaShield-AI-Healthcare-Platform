import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { chatApi } from '../api';

export default function ChatPage() {
  const { token }    = useAuth();
  const location     = useLocation();
  const endRef       = useRef();
  const initCtx      = location.state?.context || '';

  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hello! I'm AquaShield AI Health Assistant. I can help you understand water quality results, explain waterborne diseases, and provide health guidance. How can I help you today?" + (initCtx ? `\n\n*Context: ${initCtx}*` : '') }
  ]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages(m => [...m, { role: 'user', content: text }]);
    setLoading(true);
    try {
      const res = await chatApi.send({ message: text }, token);
      setMessages(m => [...m, { role: 'ai', content: res.reply }]);
    } catch (e) {
      setMessages(m => [...m, { role: 'ai', content: '⚠️ Sorry, I could not process your request. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

  const suggestions = [
    'What is cholera and how is it treated?',
    'How do I purify contaminated water at home?',
    'What are symptoms of waterborne diseases?',
    'How does UV purification work?',
  ];

  return (
    <main className="pt-20 min-h-screen bg-surface-container-low flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex flex-col flex-1 px-container-padding-mobile md:px-container-padding-desktop py-8">
        <div className="glass-card flex flex-col h-[75vh]">
          {/* Header */}
          <div className="p-6 border-b border-outline-variant/20 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-tertiary-container/30 flex items-center justify-center">
              <span className="msym text-tertiary text-[28px]" style={{fontVariationSettings:"'FILL' 1"}}>auto_awesome</span>
            </div>
            <div>
              <h2 className="font-headline-md">AquaShield AI Health Assistant</h2>
              <p className="font-label-sm text-on-surface-variant flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-secondary inline-block" /> Powered by Gemini AI
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end chat-user' : 'justify-start chat-ai'}`}>
                {m.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-tertiary-container/30 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <span className="msym text-tertiary text-[18px]" style={{fontVariationSettings:"'FILL' 1"}}>auto_awesome</span>
                  </div>
                )}
                <div className={`max-w-[75%] px-5 py-3 rounded-2xl font-body-md whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-primary text-on-primary rounded-tr-sm'
                    : 'bg-surface-container-high text-on-surface rounded-tl-sm'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start chat-ai">
                <div className="w-8 h-8 rounded-full bg-tertiary-container/30 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="msym text-tertiary text-[18px]">auto_awesome</span>
                </div>
                <div className="bg-surface-container-high px-5 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-bounce" style={{animationDelay:'0ms'}} />
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-bounce" style={{animationDelay:'150ms'}} />
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-bounce" style={{animationDelay:'300ms'}} />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-6 pb-2 flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => setInput(s)}
                  className="text-label-sm text-primary border border-primary/30 px-3 py-1.5 rounded-full hover:bg-primary/5 transition-colors">
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-outline-variant/20">
            <div className="flex items-end gap-3">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="Ask about waterborne diseases, treatment methods, symptoms..."
                rows={1}
                className="flex-1 resize-none bg-surface-container rounded-2xl px-4 py-3 font-body-md text-on-surface border border-outline-variant/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                style={{minHeight:'48px', maxHeight:'120px'}}
                onInput={e => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="msym">send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
