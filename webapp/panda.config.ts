import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],
  presets: [],
  strictTokens: true,
  globalVars: {
    '--timer-angle': {
      syntax: '<angle>',
      inherits: false,
      initialValue: '300deg'
    }
  },
  theme: {
    extend: {
      tokens: {
        sizes: {
          full: { value: "100%" }
        },
        colors: {
          transparent: { value: "#00000000" },
          white: { value: "#FBFEF9" },
          darkBlue: {
            500: { value: "#07004D" },
            900: { value: "#030029" }
          },
          blue: {
            100: { value: "#ADD3EB" },
            200: { value: "#8CC2E3" },
            300: { value: "#6BB0DB" },
            400: { value: "#4A9FD3" },
            500: { value: "#2D82B7" },
            600: { value: "#2875A4" },
            700: { value: "#205D83" },
            800: { value: "#184663" },
            900: { value: "#102F42" },
          },
          orange: {
            100: { value: "#FFCBAD" },
            200: { value: "#FFB185" },
            300: { value: "#FF985C" },
            400: { value: "#FF7E33" },
            500: { value: "#FF5D00" },
            600: { value: "#E05200" },
            700: { value: "#B84300" },
            800: { value: "#8F3400" },
            900: { value: "#662500" },
          },
          red: {
            100: { value: "#E2A2AC" },
            200: { value: "#D88390" },
            300: { value: "#CE6474" },
            400: { value: "#C44558" },
            500: { value: "#A63446" },
            600: { value: "#8C2C3A" },
            700: { value: "#6D222D" },
            800: { value: "#4E1820" },
            900: { value: "#2F0E13" },
          }
        },
        fontSizes: {
          xs: { value: "0.75rem" },
          sm: { value: "0.875rem" },
          base: { value: "1rem" },
          lg: { value: "1.125rem" },
          xl: { value: "1.25rem" },
          "2xl": { value: "1.5rem" },
          "3xl": { value: "1.875rem" },
          "4xl": { value: "2.25rem" },
          "5xl": { value: "3rem" },
          "6xl": { value: "3.75rem" },
        },
        fontWeights: {
          regular: { value: '400' },
          bold: { value: '700' },
        }
      },
      semanticTokens: {
        colors: {
          text: {
            default: { value: '{colors.white}' },
            accent: { value: '{colors.orange.300}' },
            inverted: { value: '{colors.darkBlue.900}' }
          },
          interaction: {
            secondary: {
              default: { value: '{colors.transparent}' },
              hover: { value: '{colors.blue.400}' },
              active: { value: '{colors.blue.600}' },
            },
            accent: {
              default: { value: '{colors.orange.500}' },
              hover: { value: '{colors.orange.600}' },
              active: { value: '{colors.orange.700}' },
            },
          },
          border: {
            default: { value: '{colors.darkBlue.900}' },
            inverted: { value: '{colors.white}' }
          },
          container: {
            default: { value: '{colors.blue.500}' },
            secondary: { value: '{colors.darkBlue.900/80}' },
            inverted: { value: '{colors.white}' },
          },
          icon: {
            default: { value: '{colors.white}' }
          }
        },
        fontSizes: {
          text: {
            body1: { value: "{fontSizes.xl}" },
            body2: { value: "{fontSizes.base}" },
            heading1: { value: "{fontSizes.5xl}" },
            heading2: { value: "{fontSizes.4xl}" },
            heading3: { value: "{fontSizes.3xl}" },
            heading4: { value: "{fontSizes.2xl}" },
          },
        },
        fontWeights: {
          neutral: { value: "{fontWeights.regular}" },
          highlight: { value: "{fontWeights.bold}" }
        },
        shadows: {
          text: {
            heading: {
              value: [
                '2px 0 {colors.darkBlue.900}',
                '-2px 0 {colors.darkBlue.900}',
                '0 2px {colors.darkBlue.900}',
                '0 -2px {colors.darkBlue.900}',
                '1px 1px {colors.darkBlue.900}',
                '-1px -1px {colors.darkBlue.900}',
                '1px -1px {colors.darkBlue.900}',
                '-1px 1px {colors.darkBlue.900}'
              ]
            },
            default: {
              value: [
                '1px 0 {colors.darkBlue.900}',
                '-1px 0 {colors.darkBlue.900}',
                '0 1px {colors.darkBlue.900}',
                '0 -1px {colors.darkBlue.900}',
                '0.5px 0.5px {colors.darkBlue.900}',
                '-0.5px -0.5px {colors.darkBlue.900}',
                '0.5px -0.5px {colors.darkBlue.900}',
                '-0.5px 0.5px {colors.darkBlue.900}'
              ]
            },
          },
        },
      },
      keyframes: {
        pulse: {
          "0%, 100%": { transform: "scale(0.9) rotate(-5deg)" },
          "50%": { transform: "scale(1) rotate(5deg)" }
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        }
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
