# Theme System Guide

## Overview

Your project now has a complete CSS variable-based theme system integrated with Tailwind CSS. This allows you to:

- **Define colors once** and use them everywhere
- **Easy dark mode support** (automatic with the `.dark` class)
- **Consistent design** across all components
- **Quick theme changes** without editing individual files

---

## Theme Variables (CSS Custom Properties)

All theme variables are defined in `src/index.css` in the `:root` section:

### Light Mode (Default)
```css
--background: 0 0% 100%;        /* Page background */
--foreground: 0 0% 3.6%;        /* Text color */
--primary: 0 0% 9%;             /* Main button color */
--primary-foreground: 0 0% 100%;/* Text on primary button */
--secondary: 0 0% 96.1%;        /* Secondary elements */
--secondary-foreground: 0 0% 9%;/* Text on secondary */
--accent: 0 84.2% 60.2%;        /* Highlighted elements (red) */
--destructive: 0 84.2% 60.2%;   /* Delete/danger buttons (red) */
--muted: 0 0% 96.1%;            /* Disabled text bg */
--muted-foreground: 0 0% 45.1%; /* Disabled text color */
--border: 0 0% 89.8%;           /* Border color */
--input: 0 0% 89.8%;            /* Input border color */
--ring: 0 84.2% 60.2%;          /* Focus ring color */
```

### Dark Mode
All variables have dark mode equivalents under `.dark` class selector.

---

## Using Theme Colors in Tailwind

In your components, use these **semantic color names** (defined in `tailwind.config.ts`):

### Direct Usage
```tsx
// Background colors
<div className="bg-background">Content</div>
<div className="bg-primary">Primary action</div>
<div className="bg-card">Card container</div>

// Text colors
<p className="text-foreground">Main text</p>
<p className="text-muted-foreground">Secondary text</p>
<button className="text-primary-foreground">Button text</button>

// Borders
<div className="border border-border">Bordered element</div>
<div className="border-2 border-accent">Accent border</div>
```

### All Available Colors
- `background` / `foreground`
- `primary` / `primary-foreground`
- `secondary` / `secondary-foreground`
- `accent` / `accent-foreground`
- `destructive` / `destructive-foreground`
- `muted` / `muted-foreground`
- `border`, `input`, `ring`
- `card` / `card-foreground`
- `popover` / `popover-foreground`

---

## Customizing the Theme

### Change Theme Colors

Edit `src/index.css` - update the HSL values in `:root`:

```css
:root {
  --primary: 220 90% 56%;  /* Change to blue */
  --accent: 142 71% 45%;   /* Change to green */
  /* ... other variables ... */
}
```

**HSL Format Explained:**
- `H` (Hue): 0-360° (red, green, blue, etc.)
- `S` (Saturation): 0-100% (gray to pure color)
- `L` (Lightness): 0-100% (black to white)

**Common Colors:**
- Red: `0 84.2% 60.2%`
- Green: `142 71% 45%`
- Blue: `220 90% 56%`
- Gray: `0 0% 50%`

### Enable Dark Mode

Add `dark` class to the `<html>` element:

```tsx
// In App.tsx
export default function App() {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <div className={isDark ? 'dark' : ''}>
      {/* Your app content */}
    </div>
  );
}
```

---

## Component Updates

All UI components now use theme variables:

### Dialog (`src/components/ui/dialog.tsx`)
✅ Uses `bg-card`, `text-foreground`, `border-border`
✅ Backdrop blur effect added
✅ Improved shadows with better color

### Button (`src/components/ui/button.tsx`)
✅ Uses `bg-primary`, `text-primary-foreground`
✅ Focus ring uses theme colors
✅ Three variants: default, outline, destructive

### Input (`src/components/ui/input.tsx`)
✅ Uses `bg-background`, `border-input`
✅ Focus state with `ring-ring`
✅ Placeholder respects `text-muted-foreground`

### Label (`src/components/ui/label.tsx`)
✅ Uses `text-foreground`
✅ Proper color inheritance

---

## Advanced: Customizing Component Appearance

All components support the `className` prop to add or override styles:

```tsx
<Button 
  className="w-full" 
  variant="outline"
>
  Click me
</Button>

<Input 
  className="border-2" 
  placeholder="Enter text..."
/>

<Dialog>
  <DialogContent className="sm:max-w-md">
    {/* Content */}
  </DialogContent>
</Dialog>
```

---

## Tips for Consistent Design

1. **Use semantic names**: Use `bg-primary` instead of `bg-blue-600`
2. **Leverage CSS variables**: Theme is controlled in one place (`src/index.css`)
3. **Test dark mode**: Always verify components in both light and dark modes
4. **Avoid hard-coded colors**: Use theme colors unless you have a specific reason
5. **Use existing components**: Build on Button, Input, Dialog - they're pre-themed

---

## Next Steps

1. Customize the accent color in `src/index.css` to match your brand
2. Test your dialog - it should now look clean and professional
3. Try enabling dark mode by adding the `dark` class to your root div
4. Use theme colors in any new components you create

Enjoy your clean, themeable UI! 🎨
