export default {
  useColorSchemeMediaQuery: true,
  colors: {
    text: "#333", // Body foreground color
    background: "#fff", // Body background color
    primary: "#f00", // Primary brand color for links, buttons, etc.
    secondary: "#ff6347", // A secondary brand color for alternative styling
    accent: "#0f0", // A contrast color for emphasizing UI
    highlight: "#00f", // A background color for highlighting text
    muted: "#222", // A faint color for backgrounds, borders, and accents that do not require high contrast with the background color
    modes: {
      dark: {
        text: "#fff",
        background: "#000",
        primary: "#0f0",
      },
    },
  },
  fonts: {
    body:
      "'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'",
    heading: "inherit",
    monospace:
      "'SFMono-Regular', 'Consolas', 'Roboto Mono', 'Droid Sans Mono', 'Liberation Mono', 'Menlo', 'Courier', 'monospace'",
  },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
    },
    a: {
      color: "primary",
      fontFamily: "body",
    },
  },
  buttons: {
    primary: {
      fontFamily: "body",
      cursor: "pointer",
    },
  },
  forms: {
    label: { fontFamily: "body" },
  },
}
