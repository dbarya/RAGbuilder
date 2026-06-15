# DeckForge - Brand Identity, Visual Guidelines, and Slide Layout Specifications
**Version 1.0 (June 2026)**

Welcome to the **DeckForge** Brand Identity and Visual Design Specifications. This document details our brand voice, design philosophy, theme systems, and precise layout structures to align both the Frontend and Backend engineers.

Our mission is to allow anyone to create high-impact, professional presentations in seconds using simple prompts, free APIs, and highly curated design patterns.

---

## 1. Brand Core & Value Proposition

### Brand Voice and Tone
- **Empowering**: We make slide design effortless, giving professional design capabilities to everyone.
- **Sleek & Contemporary**: Our designs are modern, clean, and spacious. No clunky 2010-era bulleted decks.
- **Fast & Direct**: We value high information density wrapped in crisp, high-contrast layouts.
- **Intelligent**: The layouts adjust to content length dynamically, avoiding awkward overlaps or orphaned text.

### Target Customer Persona
- **The Time-Pressed Knowledge Worker**: Consultants, analysts, and managers who need to present findings beautifully, fast.
- **The Modern Marketer / Pitching Founder**: Needs a gorgeous deck to win clients or raise capital without spending thousands on design.
- **The Educator / Student**: Wants engaging, readable, structured decks that hold attention.

### Design Principles
1. **Content First**: Design should serve the content, never distract.
2. **Whitespace is Luxury**: High negative space yields executive-level professionalism.
3. **Restrained Color**: Use one primary background, one strong text color, and one accent color (max 10% visual weight) for emphasis.
4. **No More Bullet-Point Walls**: Translate bullet lists into cards, two-column grids, and structured comparison blocks.

---

## 2. Brand Assets

### The DeckForge Logo
The logo represents the union of structured content (slides) and high-temperature automation (the forge).

- **Logo Concept**: Stylized abstract icon of overlapping translucent slide decks forming a high-end forge or anvil.
- **Primary Logo Path**: `/home/team/shared/design/logo.png`
- **Logo Integration**:
  - Light backgrounds: Use the full-color translucent gradient logo.
  - Dark/Tech backgrounds: Use a solid white/cyan neon vector logo for high-contrast visibility.
  - Navigation bar height: `32px` recommended.

### Visual Assets & Background Images
All background images have been designed with **extremely low contrast and high negative space** to ensure text overlaid on top remains 100% readable.

- **Corporate Background**: `/home/team/shared/design/backgrounds/corporate-bg.png`
- **Creative Background**: `/home/team/shared/design/backgrounds/creative-bg.png`
- **Academic Background**: `/home/team/shared/design/backgrounds/academic-bg.png`
- **Minimalist Background**: `/home/team/shared/design/backgrounds/minimalist-bg.png`
- **Tech Background**: `/home/team/shared/design/backgrounds/tech-bg.png`

---

## 3. Theme System Definitions

We have established 5 distinct slide themes. Each theme comes with specific typography, color palettes, border-radii, alignments, and background styling.

The parsed, developer-friendly JSON format is saved directly at `/home/team/shared/design/theme-system.json`.

### A. Corporate Theme (Classic Professional)
*Designed for executive reviews, business plans, investor updates, and corporate consulting.*
- **Aesthetic**: Trustworthy, structured, and authoritative. Blue/slate tones with crisp, structured typography.
- **Colors**:
  - Primary Background (Canvas): `#FFFFFF` (Surface) with soft `/home/team/shared/design/backgrounds/corporate-bg.png` texture
  - Text Primary: `#0F172A` (Slate 900)
  - Text Muted/Secondary: `#475569` (Slate 600)
  - Accent Color: `#2563EB` (Royal Blue) for primary highlight and `#0EA5E9` (Sky Blue) for secondary highlight
  - Card Background: `#F1F5F9` (Slate 100)
  - Border Color: `#E2E8F0`
- **Typography**:
  - Header Font: `Montserrat` (Sans-serif, clean, structured, authoritative)
  - Body Font: `Inter` (Sans-serif, highly legible, professional)
- **Layout Rules**: Left-aligned titles, subtle border radii (`8px` cards).

### B. Creative Theme (Vibrant & Bold)
*Perfect for marketing agencies, startup pitches, product brainstorms, and designer portfolios.*
- **Aesthetic**: Dynamic, artistic, and modern. High-energy mesh gradients with playful, expressive fonts.
- **Colors**:
  - Primary Background: `#FFFBFB` with colorful `/home/team/shared/design/backgrounds/creative-bg.png` mesh gradient
  - Text Primary: `#1E1B4B` (Deep Indigo Black)
  - Text Muted/Secondary: `#6366F1` (Indigo 500)
  - Accent Color: `#F43F5E` (Vibrant Rose/Pink) and `#F59E0B` (Amber)
  - Card Background: `#FAF5FF` (Soft Purple tint)
  - Border Color: `#F5E6FF`
- **Typography**:
  - Header Font: `Syne` (Bold, expressive, modern geometric art sans-serif)
  - Body Font: `Plus Jakarta Sans` (Clean, friendly, geometric)
- **Layout Rules**: Left-aligned titles, generous padding, modern circular border radii (`16px` cards).

### C. Academic Theme (Scholarly & Traditional)
*Tailored for historical analysis, university lectures, medical reports, and deep research.*
- **Aesthetic**: Elegant, classic, intellectual, and traditional. Warm ivory tones with rich forest green and copper gold.
- **Colors**:
  - Primary Background: `#FDFBF7` with warm `/home/team/shared/design/backgrounds/academic-bg.png` parchment feel
  - Text Primary: `#1B3B2B` (Deep Forest Green)
  - Text Muted/Secondary: `#5F6F65` (Muted Sage Green)
  - Accent Color: `#B87333` (Copper) and `#9E7B44` (Muted Gold)
  - Card Background: `#F4F1EA` (Warm Light Stone)
  - Border Color: `#E8E3D7`
- **Typography**:
  - Header Font: `Playfair Display` (Stately, elegant serif, high literary vibe)
  - Body Font: `Lora` (Sleek, highly legible scholarly serif)
- **Layout Rules**: Centered titles, sophisticated lines, traditional border radii (`4px` cards).

### D. Minimalist Theme (Sleek Space & High Contrast)
*Ideal for high-end retail pitches, architect portfolios, luxury branding, and impact-driven decks.*
- **Aesthetic**: Spacious, clean, high-contrast, and focused. Generous negative space makes words highly impactful.
- **Colors**:
  - Primary Background: `#F9F9FB` with pure `/home/team/shared/design/backgrounds/minimalist-bg.png` airy texture
  - Text Primary: `#09090B` (Jet Black)
  - Text Muted/Secondary: `#52525B` (Zinc Gray)
  - Accent Color: `#18181B` (Bold Black) and `#71717A` (Muted Gray)
  - Card Background: `#F4F4F5` (Very light zinc gray)
  - Border Color: `#E4E4E7`
- **Typography**:
  - Header Font: `Inter` (Thin/Light/Semi-bold weights for high legibility)
  - Body Font: `Inter` (Clean geometric look)
- **Layout Rules**: Sharp edges (`0px` border-radius), left-aligned, maximal whitespace.

### E. Tech Theme (Futuristic & Deep Dark-Mode)
*Built for software pitches, product architectures, artificial intelligence decks, and developer tools.*
- **Aesthetic**: Immersive dark-mode, futuristic coding environments, high-tech glowing accents.
- **Colors**:
  - Primary Background: `#030712` (Obsidian Dark) with futuristic `/home/team/shared/design/backgrounds/tech-bg.png` digital grid texture
  - Text Primary: `#F9FAFB` (Crisp White)
  - Text Muted/Secondary: `#9CA3AF` (Muted Cool Gray)
  - Accent Color: `#06B6D4` (Electric Cyan) and `#8B5CF6` (Neon Purple)
  - Card Background: `#111827` / `#1F2937` (Deep Slate cards)
  - Border Color: `#374151`
- **Typography**:
  - Header Font: `Space Grotesk` (Technical, monospaced/geometric flavor, tech-forward)
  - Body Font: `Plus Jakarta Sans` or `Space Mono`
- **Layout Rules**: Uppercase headers, electric glowing lines, futuristic box-shadows, medium border radii (`6px` cards).

---

## 4. Slide Layout Specifications (Grid, Margin & Padding)

All slides must be built for **16:9 widescreen presentation (standard 1920x1080 canvas size)**. 
- **Slide Width**: `100%` width, aspect ratio `16 / 9` (e.g., standard viewport width or fixed `960px` x `540px` inside the editor).
- **Global Spacing Constraints**:
  - Header margin: Keep titles clear of the slide boundary. Top padding `8%`, left/right padding `10%`.
  - Body margin: Keep main content comfortable. Bottom padding `10%`.

---

## 5. Detailed Slide Layout Templates

Engineers can render these 7 fundamental slide types using standard HTML and utility CSS classes (e.g. Tailwind).

### 1. Title Slide (Layout Code: `title`)
*For presentation openers.*
- **Visual Spec**:
  - Large, highly weighted main title (Font size: `4.5rem` / `72px`).
  - Subtitle with high legibility (Font size: `1.8rem` / `28px`).
  - Subtle divider line (accent color, thickness `4px`, width `80px`, top/bottom margin `24px`).
  - Presenter name and date in small uppercase text (Font size: `1rem` / `16px`) at the bottom.
- **Alignment**: Left-aligned for Corporate, Creative, Minimalist, Tech. Centered for Academic.

### 2. Section Divider (Layout Code: `section_divider`)
*For transitioning between major topics.*
- **Visual Spec**:
  - Full-color background (using the theme's Accent or Secondary color).
  - Huge topic number or section title (Font size: `5.5rem` / `88px`), opacity `0.15` in background, or in large text on top.
  - Section title (Font size: `3.5rem` / `56px`) in white or high contrast text.
  - Explanatory subtitle in muted text (Font size: `1.5rem` / `24px`).
- **Composition**: Centered alignment, dramatic focus.

### 3. Content Slide / Bullets (Layout Code: `content_bullets`)
*For standard bullet points or bullet grids.*
- **Visual Spec**:
  - Slide Header: Title at top-left (Font size: `2.5rem` / `40px`), with a short horizontal accent line underneath.
  - Content area: Rather than a plain bullet list, items are rendered as beautiful, spaced list items or **individual grid cards** if possible.
  - Bullet item formatting:
    - Custom icon marker (instead of default circles, use a small accent-colored rectangle or SVG icon e.g. checkmark or chevron).
    - Item Header (Font weight: `600`, size `1.25rem` / `20px` in primary text color).
    - Item Body (Font weight: `400`, size `1.1rem` / `18px` in muted text color).
    - Vertical gap between items: `24px`.

### 4. Two-Column Layout (Layout Code: `two_column`)
*For comparing two major concepts side-by-side or listing split arguments.*
- **Visual Spec**:
  - Slide Header: Title at top-left.
  - Columns: `grid grid-cols-2 gap-12` (minimum `48px` gap).
  - Column cards: Inside each column, wrap content inside a card with the theme's `cardBg` and `borderRadius`.
  - Padding within cards: `32px` all around.
  - Each column has a bold heading (Font size: `1.5rem` / `24px`) and associated paragraph content or smaller nested list.

### 5. Image + Text Layout (Layout Code: `image_text`)
*For demonstrating a concept visually alongside structured explanation.*
- **Visual Spec**:
  - Split structure: Column 1 is a visual element (Image or Illustration), Column 2 is the text.
  - Split Ratio: `50 / 50` or `40 / 60` depending on text length.
  - Image styling:
    - Object-fit: `cover`.
    - Fully styled border-radius matching the theme (e.g. `16px` for Creative, `0px` for Minimalist).
    - Drop shadow matching theme profile.
  - Text styling: Clean headers, bullet items or short paragraphs.

### 6. Comparison Slide (Layout Code: `comparison`)
*For pros vs cons, before vs after, or option vs option.*
- **Visual Spec**:
  - Two parallel vertical containers with distinct accent headings.
  - "Option A / Pros" Column: Has a subtle primary-colored border.
  - "Option B / Cons" Column: Has a subtle secondary-colored or muted border.
  - Headers: Highlighted with small accent tags (e.g., solid color pill badges with small uppercase text).
  - Columns are highly structured and symmetrical to allow the eye to compare instantly.

### 7. Closing Slide (Layout Code: `closing`)
*The thank you and final call to action.*
- **Visual Spec**:
  - Centered big bold title (e.g., "Thank You" or "Let's Build Together").
  - Large call-to-action email or website (Font size: `2.5rem` / `40px` in accent color).
  - Social handles / contact info rendered in a neat horizontal row at the bottom with small icons.
  - Minimalist and extremely clean composition.

---

## 6. Theme Data Schema (JSON Spec)

To ensure programmatically reliable slide generation, the Backend should output layouts matching the following structure, and the Frontend should map it to these styling parameters.

```typescript
interface ThemeColors {
  primary: string;      // Dominant text and major headers
  secondary: string;    // Secondary elements / section slide bg
  accent: string;       // Callouts, bullet markers, highlights
  background: string;   // Outer slide container background color
  surface: string;      // Slide page card background color
  text: string;         // Main body text color
  mutedText: string;    // Secondary/Muted description text color
  cardBg: string;       // Inner box/grid element backgrounds
  borderColor: string;  // Border lines and dividers
}

interface TypographySpec {
  headingFont: string;     // Name of Google Font for titles
  headingFontUrl: string;  // Google Fonts embed URL
  bodyFont: string;        // Name of Google Font for body
  bodyFontUrl: string;     // Google Fonts embed URL
  headingWeight: string;   // e.g. "700"
  bodyWeight: string;      // e.g. "400"
  accentFont: string;      // e.g. "Space Grotesk" or serif
}

interface ThemeSpec {
  name: string;
  description: string;
  isDarkMode: boolean;
  colors: ThemeColors;
  typography: TypographySpec;
  spacing: {
    slidePadding: string;      // Standard slide padding (e.g., "48px 64px")
    itemGap: string;           // Grid/Flex item gap spacing (e.g., "20px")
    titleBottomMargin: string; // Space below slide header (e.g., "28px")
  };
  backgroundImage: string;     // Path to generated low-contrast background image
  layoutSettings: {
    align: "left" | "center";  // Slide title standard alignment
    textTransform: "none" | "uppercase"; // Title text transform
    borderRadius: string;      // Box border-radius (e.g., "8px")
  };
}
```

---

## 7. Slide Editor UI & UX Recommendations

The **Frontend Engineer** should design the DeckForge Presentation Editor with the following layout guidelines to create a high-end Canva-like editing feel:

1. **Left Workspace Bar (Layouts & Themes)**:
   - Width: `280px`
   - Top Section: Theme Swapper. Beautiful circular color pills representing the 5 themes (Corporate, Creative, Academic, Minimalist, Tech).
   - Bottom Section: Layout Selector. Grid cards showing small schematic icons of the 7 slide layouts (Title, Divider, Bullets, Columns, etc.). Clicking a card immediately switches the selected slide's layout.
2. **Main Canvas Area (The Slide)**:
   - Centered with a subtle drop-shadow (`shadow-2xl`).
   - Standard 16:9 aspect ratio container (`aspect-[16/9]`).
   - Dynamic scaling: Use CSS `scaling` or Container Queries (`@container`) so that the slide content scales perfectly whether the browser window is large or small.
3. **Right Properties Panel (Content Fields)**:
   - Width: `320px`
   - Displays input fields depending on the selected slide's layout.
     - For `title` layout: Title input, Subtitle input, Presenter input.
     - For `content_bullets` layout: Title input, plus a dynamic list of bullet item headers and bodies with "Add Item" and "Delete Item" buttons.
   - Updates the main canvas in real-time as the user types (two-way binding).
4. **Header / Action Bar**:
   - Logo in top-left.
   - Right-side buttons: "Generate with AI" (sparkle icon, primary color), "Add Slide", "Download PDF" / "Export PPTX" (Pro tier features!).

---

## 8. Summary of Sharing Paths
Please use the following shared assets directly in code:

- **Theme Specs**: `/home/team/shared/design/theme-system.json`
- **Brand Guide (this file)**: `/home/team/shared/design/brand-guide.md`
- **Logo Asset**: `/home/team/shared/design/logo.png`
- **Background Folders**: `/home/team/shared/design/backgrounds/`

Let's forge some beautiful decks!
