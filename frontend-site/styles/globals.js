import { ThemeProvider } from "styled-components"

const theme = {
  colors: {
    primary: "#fafafa",
  },
};

export const GlobalStyle = ({ children, ...props }) => {
  return (
    <ThemeProvider theme={theme} {...props}>
      {children}
    </ThemeProvider>
  );
}