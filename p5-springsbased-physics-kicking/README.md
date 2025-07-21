## p5-springsbased-physics-kicking

This project is an interactive physics-based sketch built with p5.js, demonstrating spring and particle dynamics. Users can adjust parameters such as particle radius, placement randomness, spring strength, and gravity in real time using a custom UI. The simulation is rendered on a canvas and is highly customizable for experimentation and learning.

This is highly unoptimized so performance isn't great and settings around the minimum and maximum values are highly error prone.
If the page breaks and regeneration doesn't fix it, a reload will. 
Regard this more of a proof of concept than anything else.

### Features
- Interactive controls for physics parameters
- Real-time canvas rendering with p5.js
- Spring and particle system simulation
- Responsive and modern UI styled with Tailwind CSS

### Tools & Libraries Used
- **p5.js**: Creative coding library for rendering and animation
- **toxiclibs.js**: Utility library for advanced geometry and physics
- **dat.gui**: Lightweight GUI for parameter tweaking (optional)
- **Tailwind CSS**: Utility-first CSS framework for UI styling
- **TypeScript**: For type-safe development (see `.ts` source files)

### Quick Start
1. Clone or download this repository.
2. Open `index.html` in your browser.
3. Use the controls to experiment with the simulation parameters.

### File Structure
- `index.html` — Main HTML file, includes scripts and UI
- `particle.ts`, `spring.ts`, `sketch.ts` — TypeScript source files for simulation logic
- `build/` — Compiled JavaScript output
- `libraries/` — External JS libraries (p5.js, toxiclibs.js, dat.gui)
- `style.css` — Custom styles
- `tailwind.config.js`, `tsconfig.json` — Project configuration

---
Feel free to modify and extend the simulation for your own experiments!
