# Project Kinisi Website Design Brainstorm

## Design Philosophy Selected: Modern Mediterranean Civic

**Aesthetic Direction:** Warm, grounded, purposeful. Not sterile NGO blue, not generic charity. Think a mix of editorial warmth with structural precision — like an architecture firm that also cares deeply about people.

### Core Principles
1. **Specificity over Sentiment** — Real numbers, real people, real impact. Every stat and story grounded in truth.
2. **Structural Clarity** — Clean hierarchy, intentional whitespace, purposeful layout. Guides the eye through the narrative.
3. **Warmth & Humanity** — Mediterranean color palette, generous spacing, human-scale typography. Never cold or corporate.
4. **Purposeful Motion** — Subtle animations that reinforce the narrative, not distract from it.

### Color Philosophy
- **Primary Navy (#1C2B5E):** Evokes Greek flag, conveys stability and trust. Used for headlines and key CTAs.
- **Accent Gold (#C8922A):** Warm Mediterranean gold, suggests heritage and value. Highlights key moments and calls-to-action.
- **Background (#FAF7F2):** Warm off-white/parchment, inviting and editorial. Reduces eye strain while maintaining warmth.
- **Terracotta (#C4603A):** Success/progress indicator. Earthy, organic feel. Used for progress bar and accent elements.
- **Text Primary (#1A1A1A):** Near-black, high contrast for readability.
- **Text Secondary (#6B6560):** Warm gray, for supporting text and descriptions.

### Layout Paradigm
- **Asymmetric, Editorial Approach:** Avoid centered, grid-based layouts. Instead, use:
  - Left-aligned text blocks with right-column imagery
  - Staggered card layouts (not uniform grids)
  - Diagonal section dividers to create visual movement
  - Full-width hero with overlay gradient for text legibility
- **Generous Whitespace:** Breathing room between sections. Spacing reinforces importance and hierarchy.

### Signature Elements
1. **Greek Key (Meander) Pattern:** Subtle, thin-line decorative divider between sections. Low opacity, refined.
2. **Olive Branch / Compass Icon:** Small accent near section titles. Reinforces Mediterranean + navigation themes.
3. **Diagonal Cuts & Angled Dividers:** SVG-based section transitions with angled edges (not flat). Adds visual dynamism.

### Interaction Philosophy
- **Purposeful Hover States:** CTA buttons pulse subtly on hover. Team cards lift with warm shadow.
- **Scroll-Triggered Animations:** Sections fade up on scroll. Progress bar animates as it enters viewport.
- **Smooth Scrolling:** Internal anchor links scroll smoothly to sections.

### Animation Guidelines
- **Entrance Animations:** Fade-up on scroll for all major sections (200-400ms, ease-out).
- **Progress Bar:** Animated fill on scroll-into-view (1s duration, smooth easing).
- **CTA Button:** Subtle pulse or scale-up (1.05x) on hover, 150ms transition.
- **Team Cards:** Lift effect (translateY -8px) + warm shadow on hover, 200ms transition.
- **Hero Background:** Subtle Ken Burns / slow parallax effect (very subtle, 0.3s per scroll).

### Typography System
- **Display / Headlines:** Playfair Display (serif, warm, strong) — 48px-64px for main headlines, 32px-40px for section titles.
- **Body:** DM Sans (clean, humanist sans-serif) — 16px-18px for body text, 14px-16px for supporting text.
- **Accent / Labels:** Small-caps or spaced uppercase for section labels (12px-14px, letter-spacing +0.05em).
- **Hierarchy:** Bold headlines (700 weight) + regular body (400 weight) + light supporting text (300 weight).

### Key Design Decisions
- **Hero Section:** Full-width team photo with dark gradient overlay (top-to-bottom, 0 to 60% opacity). Headline and subheadline in white/light text, centered but not sterile.
- **Section Dividers:** Diagonal SVG cuts between sections (not horizontal lines). Adds visual interest without being distracting.
- **Card Layouts:** Warm shadow (not hard border). Subtle rounded corners (8-12px). Hover lift effect.
- **Progress Bar:** Terracotta color, animated fill. Displays percentage + fundraising context below.
- **Form Design:** Clean, minimal. Labels above inputs. Submit button uses accent gold + navy text.
- **Footer:** Dark navy background with warm off-white text. Logo + tagline + quick links + CTA.

---

## Implementation Notes

This design avoids:
- ❌ Centered, uniform grid layouts
- ❌ Purple gradients or generic startup aesthetics
- ❌ Excessive rounded corners (use 8-12px max)
- ❌ Inter font (using Playfair Display + DM Sans instead)
- ❌ Sterile, corporate color schemes

This design embraces:
- ✅ Asymmetric, editorial layouts
- ✅ Warm Mediterranean palette
- ✅ Generous whitespace and breathing room
- ✅ Purposeful, subtle animations
- ✅ Specific, human-centered storytelling
- ✅ Greek design motifs (meander pattern, olive branches)
