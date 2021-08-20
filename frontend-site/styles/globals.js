import { ThemeProvider } from "styled-components"

const theme = {
  colors: {
    primary: "#24B097",
    blue: "#2760C4",
    green: "#24B097",
    lightGreen: "#BEE8E0"
  },
};

export const GlobalStyle = ({ children, ...props }) => {
  return (
    <ThemeProvider theme={theme} {...props}>
      {children}
    </ThemeProvider>
  );
}