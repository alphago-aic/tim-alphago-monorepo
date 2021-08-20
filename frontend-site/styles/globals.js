import { ThemeProvider } from "styled-components"

const theme = {
  colors: {
    primary: "#24B097",
    blue: "#2760C4",
  },
};

export const GlobalStyle = ({ children, ...props }) => {
  return (
    <ThemeProvider theme={theme} {...props}>
      {children}
    </ThemeProvider>
  );
}