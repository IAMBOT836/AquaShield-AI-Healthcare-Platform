export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/30 mt-16">
      <div className="w-full py-12 px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="msym text-primary">water_drop</span>
            <span className="font-headline-md text-headline-md text-on-surface">AquaShield AI</span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant/80 max-w-xs">AI-driven water quality monitoring for a healthier tomorrow.</p>
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-on-surface-variant/80 hover:text-primary transition-colors font-label-sm text-label-sm">Sitemap</a>
          <a href="#" className="text-on-surface-variant/80 hover:text-primary transition-colors font-label-sm text-label-sm">GitHub</a>
          <a href="#" className="text-on-surface-variant/80 hover:text-primary transition-colors font-label-sm text-label-sm">LinkedIn</a>
        </div>
        <p className="font-label-sm text-label-sm text-on-surface-variant/60">&#169; 2024 AquaShield AI. Made with &#10084;&#65039; using AI</p>
      </div>
    </footer>
  );
}
