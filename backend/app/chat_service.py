import importlib.util
from .config import get_settings

settings = get_settings()

SYSTEM_PROMPT = (
    'You are AquaShield AI Health Assistant, a specialized medical and water-safety expert. '
    'You help users understand waterborne pathogens, disease risks, water purification methods, '
    'and medical guidance. Always be compassionate, evidence-based, and recommend consulting '
    'healthcare professionals for serious symptoms. Keep responses concise and actionable.'
)

def _gemini_available():
    spec = importlib.util.find_spec('google.generativeai')
    return spec is not None and bool(settings.gemini_api_key)

def get_ai_response(message: str, history=None) -> str:
    if _gemini_available():
        try:
            import google.generativeai as genai
            genai.configure(api_key=settings.gemini_api_key)
            model = genai.GenerativeModel('gemini-2.5-flash', system_instruction=SYSTEM_PROMPT)
            chat = model.start_chat(history=[
                {'role': m['role'], 'parts': [m['content']]}
                for m in (history or []) if m['role'] in ('user', 'model')
            ])
            return chat.send_message(message).text
        except Exception as e:
            return f'AI service error: {str(e)}. Please check your GEMINI_API_KEY.'
    msg = message.lower()
    if any(k in msg for k in ['cholera', 'vibrio']):
        return 'Cholera is caused by Vibrio cholerae bacteria. Spread through contaminated water. Prevention: boil water, use ORS, seek medical attention. Treatment includes oral rehydration therapy and antibiotics.'
    if any(k in msg for k in ['purif', 'boil', 'filter', 'treat']):
        return 'Water purification methods: 1) Boiling (10 min), 2) UV-C treatment, 3) Reverse Osmosis (0.0001 micron), 4) Chlorination (1-2 mg/L). Use multiple methods for maximum safety.'
    if any(k in msg for k in ['symptom', 'sick', 'disease']):
        return 'Common waterborne disease symptoms: diarrhea, vomiting, fever, abdominal pain, dehydration, nausea. If severe, consult a healthcare provider immediately.'
    return 'I am AquaShield AI Health Assistant. Configure your GEMINI_API_KEY in the .env file for full AI capabilities. I can help with waterborne diseases, purification methods, and health guidance.'
