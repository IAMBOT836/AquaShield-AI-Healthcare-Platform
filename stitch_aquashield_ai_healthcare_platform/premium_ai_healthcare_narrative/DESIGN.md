---
name: Premium AI Healthcare Narrative
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#3e3fcc'
  on-tertiary: '#ffffff'
  tertiary-container: '#585be6'
  on-tertiary-container: '#f1eeff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding-mobile: 20px
  container-padding-desktop: 40px
  gutter: 24px
  card-gap: 24px
  section-margin: 64px
---

## Brand & Style

This design system is built on the pillars of **Clinical Precision** and **Human-Centric Intelligence**. It bridges the gap between cold, analytical data and empathetic healthcare delivery. The aesthetic combines the clarity of high-end medical interfaces with the sophisticated visual language of modern AI dashboards.

The primary design movement is **Premium Glassmorphism**. This style utilizes translucent layers and depth to organize complex medical information without overwhelming the user. By employing frosted-glass textures and soft background blurs, the interface feels lightweight, futuristic, and unobtrusive—allowing the user's health data to remain the focal point. The emotional response should be one of profound trust, safety, and technological empowerment.

## Colors

The palette is anchored by "Trust Blue," a high-chroma primary that signals professional stability. "Emerald Green" is reserved for positive health outcomes, recovery progress, and safety confirmations. 

The background is a soft, cool off-white (#F8FAFC) designed to reduce eye strain during long-form data review. Surface colors utilize pure white at varying opacities (70%–90%) to facilitate the glassmorphic effect. Gradients should be used sparingly, primarily as "glows" behind key data visualizations to signify active AI processing or "living" data.

## Typography

This design system uses **Inter** exclusively to maintain a systematic, utilitarian, and highly legible appearance. The scale relies on significant contrast between display headings and body text to create a clear hierarchy in data-heavy environments.

Headings use tighter letter spacing and heavier weights to command attention, while body text is optimized for readability with generous line heights. Labels should be used for metadata, units of measurement (e.g., mg/dL, bpm), and category tags. Use the semibold weight for labels to ensure they remain legible even when rendered over translucent glass backgrounds.

## Layout & Spacing

The system follows a **Fluid Grid** philosophy with a base 8px rhythm. On desktop, a 12-column grid is used with 24px gutters, allowing for modular "Health Tiles" that can span 3, 4, 6, or 12 columns. 

Padding within glass containers should be generous (minimum 24px) to reinforce the premium, "breathable" feel. On mobile, the layout collapses to a single column with 20px side margins. Elements that require focus, such as surgical timelines or risk assessments, should utilize the full width of the viewport to maximize clarity.

## Elevation & Depth

Depth is the core navigational cue in this design system. It is achieved through a combination of:

1.  **Backdrop Blurs:** Every surface container must have a `backdrop-filter: blur(20px)` and a thin, 1px white border at 20% opacity to define its edges.
2.  **Tonal Stacking:** Higher priority information sits on surfaces with higher opacity. 
3.  **Soft Shadows:** Use extremely diffused shadows with a large blur radius (30px-40px) and low opacity (5-10% alpha). Shadows should have a slight tint of the Primary Blue to maintain color harmony.
4.  **Z-Index Hierarchy:** 
    *   **Level 0:** Background with subtle gradient orbs.
    *   **Level 1:** Main content cards (Glassmorphic).
    *   **Level 2:** Modals, dropdowns, and floating AI "Insights" panels.

## Shapes

The shape language is defined by "Soft-Rounded" geometry. Main dashboard cards and containers must use a **24px radius** (`rounded-xl` in this system's context) to evoke a friendly, approachable medical environment. Smaller elements like buttons and input fields use a **12px radius**. 

Status badges and tags are fully pill-shaped (rounded-full) to distinguish them as interactive or informative metadata. Avoid sharp 90-degree corners entirely, as they conflict with the "caring" brand personality.

## Components

### Buttons
*   **Primary:** Solid Trust Blue with a subtle inner glow. White text.
*   **Secondary:** Translucent white with a 1px Primary Blue border.
*   **AI Action:** A subtle gradient from Primary Blue to Tertiary Indigo.

### Health Cards
The centerpiece of the UI. Cards must feature a glassmorphic background, 24px corner radius, and a 1px border. Use high-contrast typography for the "Primary Value" (e.g., Heart Rate: 72).

### Circular Progress & Risk Meters
Use thick, rounded stroke ends for progress rings. For risk meters, use a gradient track (Green → Yellow → Red) with a floating needle or indicator. The "active" portion of the meter should have an outer glow effect in its respective color.

### Medical Badges
Small, high-contrast pills. For example, "Critical" status should be Red background with White text, using `label-sm` typography.

### Input Fields
Soft, light-gray backgrounds with no border until focused. Upon focus, the field transitions to a white background with a 2px Trust Blue border and a soft blue outer glow.

### AI Timelines
A vertical or horizontal path using a 4px dashed line. Completed milestones use a filled Emerald Green circle with a checkmark, while future/predicted AI events use a pulsating hollow circle.