import type { Config } from "tailwindcss";

const FONT_FAMILY_SANS_PRESET = [
  "Inter",
  "ui-sans-serif",
  "system-ui",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "Roboto",
  '"Helvetica Neue"',
  "Arial",
  '"Noto Sans"',
  "sans-serif",
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Noto Color Emoji"',
];
const FONT_FAMILY_MONO_PRESET = [
  "Roboto Mono",
  "ui-monospace",
  "SFMono-Regular",
  "Menlo",
  "Monaco",
  "Consolas",
  '"Liberation Mono"',
  '"Courier New"',
  "monospace",
];

export default {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // --- Merged Transition Properties ---
      transitionProperty: {
        width: "width margin",
        height: "height",
        bg: "background-color",
        display: "display opacity",
        visibility: "visibility",
        padding: "padding-top padding-right padding-bottom padding-left",
        fg: "color, background-color, border-color, box-shadow, opacity", // from preset
      },

      // --- Merged Colors ---
      colors: {
        // From original user config
        grey: {
          0: "#FFFFFF",
          5: "#F9FAFB",
          10: "#F3F4F6",
          20: "#E5E7EB",
          30: "#D1D5DB",
          40: "#9CA3AF",
          50: "#6B7280",
          60: "#4B5563",
          70: "#374151",
          80: "#1F2937",
          90: "#111827",
        },
        // From ejected preset (Theme definition relies on CSS variables below)
        ui: {
          tag: {
            neutral: {
              border: { DEFAULT: "var(--tag-neutral-border)" },
              icon: { DEFAULT: "var(--tag-neutral-icon)" },
              text: { DEFAULT: "var(--tag-neutral-text)" },
              bg: {
                hover: { DEFAULT: "var(--tag-neutral-bg-hover)" },
                DEFAULT: "var(--tag-neutral-bg)",
              },
            },
            red: {
              text: { DEFAULT: "var(--tag-red-text)" },
              bg: {
                DEFAULT: "var(--tag-red-bg)",
                hover: { DEFAULT: "var(--tag-red-bg-hover)" },
              },
              border: { DEFAULT: "var(--tag-red-border)" },
              icon: { DEFAULT: "var(--tag-red-icon)" },
            },
            blue: {
              text: { DEFAULT: "var(--tag-blue-text)" },
              border: { DEFAULT: "var(--tag-blue-border)" },
              bg: {
                DEFAULT: "var(--tag-blue-bg)",
                hover: { DEFAULT: "var(--tag-blue-bg-hover)" },
              },
              icon: { DEFAULT: "var(--tag-blue-icon)" },
            },
            orange: {
              text: { DEFAULT: "var(--tag-orange-text)" },
              border: { DEFAULT: "var(--tag-orange-border)" },
              icon: { DEFAULT: "var(--tag-orange-icon)" },
              bg: {
                hover: { DEFAULT: "var(--tag-orange-bg-hover)" },
                DEFAULT: "var(--tag-orange-bg)",
              },
            },
            green: {
              icon: { DEFAULT: "var(--tag-green-icon)" },
              border: { DEFAULT: "var(--tag-green-border)" },
              text: { DEFAULT: "var(--tag-green-text)" },
              bg: {
                hover: { DEFAULT: "var(--tag-green-bg-hover)" },
                DEFAULT: "var(--tag-green-bg)",
              },
            },
            purple: {
              bg: {
                DEFAULT: "var(--tag-purple-bg)",
                hover: { DEFAULT: "var(--tag-purple-bg-hover)" },
              },
              text: { DEFAULT: "var(--tag-purple-text)" },
              icon: { DEFAULT: "var(--tag-purple-icon)" },
              border: { DEFAULT: "var(--tag-purple-border)" },
            },
          },
          bg: {
            switch: {
              off: {
                hover: { DEFAULT: "var(--bg-switch-off-hover)" },
                DEFAULT: "var(--bg-switch-off)",
              },
            },
            subtle: {
              hover: { DEFAULT: "var(--bg-subtle-hover)" },
              DEFAULT: "var(--bg-subtle)",
              pressed: { DEFAULT: "var(--bg-subtle-pressed)" },
            },
            field: {
              component: {
                hover: { DEFAULT: "var(--bg-field-component-hover)" },
                DEFAULT: "var(--bg-field-component)",
              },
              DEFAULT: "var(--bg-field)",
              hover: { DEFAULT: "var(--bg-field-hover)" },
            },
            base: {
              pressed: { DEFAULT: "var(--bg-base-pressed)" },
              hover: { DEFAULT: "var(--bg-base-hover)" },
              DEFAULT: "var(--bg-base)",
            },
            highlight: {
              DEFAULT: "var(--bg-highlight)",
              hover: { DEFAULT: "var(--bg-highlight-hover)" },
            },
            component: {
              pressed: { DEFAULT: "var(--bg-component-pressed)" },
              DEFAULT: "var(--bg-component)",
              hover: { DEFAULT: "var(--bg-component-hover)" },
            },
            interactive: { DEFAULT: "var(--bg-interactive)" },
            disabled: { DEFAULT: "var(--bg-disabled)" },
            overlay: { DEFAULT: "var(--bg-overlay)" },
          },
          border: {
            menu: {
              bot: { DEFAULT: "var(--border-menu-bot)" },
              top: { DEFAULT: "var(--border-menu-top)" },
            },
            strong: { DEFAULT: "var(--border-strong)" },
            interactive: { DEFAULT: "var(--border-interactive)" },
            base: { DEFAULT: "var(--border-base)" },
            danger: { DEFAULT: "var(--border-danger)" },
            error: { DEFAULT: "var(--border-error)" },
            transparent: { DEFAULT: "var(--border-transparent)" },
          },
          contrast: {
            fg: {
              primary: { DEFAULT: "var(--contrast-fg-primary)" },
              secondary: { DEFAULT: "var(--contrast-fg-secondary)" },
            },
            bg: {
              base: {
                pressed: { DEFAULT: "var(--contrast-bg-base-pressed)" },
                DEFAULT: "var(--contrast-bg-base)",
                hover: { DEFAULT: "var(--contrast-bg-base-hover)" },
              },
              subtle: { DEFAULT: "var(--contrast-bg-subtle)" },
            },
            border: {
              base: { DEFAULT: "var(--contrast-border-base)" },
              bot: { DEFAULT: "var(--contrast-border-bot)" },
              top: { DEFAULT: "var(--contrast-border-top)" },
            },
          },
          button: {
            inverted: {
              pressed: { DEFAULT: "var(--button-inverted-pressed)" },
              hover: { DEFAULT: "var(--button-inverted-hover)" },
              DEFAULT: "var(--button-inverted)",
            },
            transparent: {
              DEFAULT: "var(--button-transparent)",
              hover: { DEFAULT: "var(--button-transparent-hover)" },
              pressed: { DEFAULT: "var(--button-transparent-pressed)" },
            },
            danger: {
              pressed: { DEFAULT: "var(--button-danger-pressed)" },
              DEFAULT: "var(--button-danger)",
              hover: { DEFAULT: "var(--button-danger-hover)" },
            },
            neutral: {
              DEFAULT: "var(--button-neutral)",
              hover: { DEFAULT: "var(--button-neutral-hover)" },
              pressed: { DEFAULT: "var(--button-neutral-pressed)" },
            },
          },
          fg: {
            on: {
              color: { DEFAULT: "var(--fg-on-color)" },
              inverted: { DEFAULT: "var(--fg-on-inverted)" },
            },
            interactive: {
              hover: { DEFAULT: "var(--fg-interactive-hover)" },
              DEFAULT: "var(--fg-interactive)",
            },
            error: { DEFAULT: "var(--fg-error)" },
            subtle: { DEFAULT: "var(--fg-subtle)" },
            base: { DEFAULT: "var(--fg-base)" },
            disabled: { DEFAULT: "var(--fg-disabled)" },
            muted: { DEFAULT: "var(--fg-muted)" },
          },
          alpha: {
            250: { DEFAULT: "var(--alpha-250)" },
            400: { DEFAULT: "var(--alpha-400)" },
          },
        },
      },

      // --- Properties from original user config ---
      borderRadius: {
        none: "0px",
        soft: "2px",
        base: "4px",
        rounded: "8px",
        large: "16px",
        circle: "9999px",
      },
      maxWidth: { "8xl": "100rem" },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
      fontSize: { "3xl": "2rem" }, // Keep user's specific definition

      // --- Font Family - Using definitions from ejected preset ---
      fontFamily: {
        sans: FONT_FAMILY_SANS_PRESET,
        mono: FONT_FAMILY_MONO_PRESET,
      },

      // --- Merged Box Shadows (entirely from ejected preset) ---
      boxShadow: {
        "borders-interactive-with-active": "var(--borders-interactive-with-active)",
        "buttons-danger-focus": "var(--buttons-danger-focus)",
        "details-contrast-on-bg-interactive": "var(--details-contrast-on-bg-interactive)",
        "borders-interactive-with-focus": "var(--borders-interactive-with-focus)",
        "borders-error": "var(--borders-error)",
        "borders-focus": "var(--borders-focus)",
        "borders-interactive-with-shadow": "var(--borders-interactive-with-shadow)",
        "buttons-danger": "var(--buttons-danger)",
        "buttons-inverted-focus": "var(--buttons-inverted-focus)",
        "elevation-card-hover": "var(--elevation-card-hover)",
        "details-switch-handle": "var(--details-switch-handle)",
        "buttons-neutral": "var(--buttons-neutral)",
        "borders-base": "var(--borders-base)",
        "elevation-card-rest": "var(--elevation-card-rest)",
        "buttons-neutral-focus": "var(--buttons-neutral-focus)",
        "details-switch-background-focus": "var(--details-switch-background-focus)",
        "details-switch-background": "var(--details-switch-background)",
        "elevation-flyout": "var(--elevation-flyout)",
        "elevation-tooltip": "var(--elevation-tooltip)",
        "elevation-modal": "var(--elevation-modal)",
        "elevation-code-block": "var(--elevation-code-block)",
        "buttons-inverted": "var(--buttons-inverted)",
        "elevation-commandbar": "var(--elevation-commandbar)",
        // Theme definition relies on CSS variables below
      },

      // --- Merged Keyframes ---
      keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-top": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out-top": {
          "0%": { height: "100%" },
          "99%": { height: "0" },
          "100%": { visibility: "hidden" },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "accordion-down": {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        }, // from preset
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        }, // from preset
      },

      // --- Merged Animations ---
      animation: {
        ring: "ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
        "fade-in-right": "fade-in-right 0.3s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-in-top": "fade-in-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-out-top": "fade-out-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
        "accordion-down": "accordion-down 0.2s ease-out", // from preset
        "accordion-up": "accordion-up 0.2s ease-out", // from preset
      },
    },
  },
  // --- Other Plugins (No inline plugin needed anymore) ---
  plugins: [require("tailwindcss-radix")(), require("tailwindcss-animate")],
} satisfies Config;
