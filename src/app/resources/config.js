const baseURL = "matejhrabak.cz"

// Change the i18n flag to false
const i18n = true

// Update the i18nOptions if needed (these won't be used when i18n is false, but keeping them for reference)
const i18nOptions = {
  locales: ["cs"], // A list of all locales that are supported, e.g. ['en','id']
  defaultLocale: "cs", // Locale used by default and as a fallback
}

const routes = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": true,
  "/gallery": true,
}

// Enable password protection on selected routes
// Set password in pages/api/authenticate.ts
const protectedRoutes = {
  "/work/automate-design-handovers-with-a-figma-to-code-pipeline": false,
}

const effects = {
  mask: "cursor", // none | cursor | topLeft | topRight | bottomLeft | bottomRight
  gradient: {
    display: true,
    opacity: 0.8, // 0 - 1
  },
  dots: {
    display: true,
    opacity: 0.4, // 0 - 1
    size: "24", // 2 | 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 634
  },
  lines: {
    display: true,
  },
}

const style = {
  theme: "dark", // dark | light
  neutral: "slate", // sand | gray | slate
  brand: "red", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  accent: "cyan", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  solid: "color", // color | contrast
  solidStyle: "flat", // flat | plastic
  border: "playful", // rounded | playful | conservative
  surface: "filled", // filled | translucent
  transition: "all", // all | micro | macro
}

const display = {
  location: false,
  time: true, // Zobrazení času
}

const mailchimp = {
  action: "https://url/subscribe/post?parameters",
  effects: {
    mask: "topRight", // none | cursor | topLeft | topRight | bottomLeft | bottomRight
    gradient: {
      display: true,
      opacity: 0.6, // 0 - 1
    },
    dots: {
      display: true,
    },
    lines: {
      display: false,
    },
  },
}

export { routes, protectedRoutes, effects, style, display, mailchimp, baseURL, i18n, i18nOptions }

