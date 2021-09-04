import styled from "styled-components";

export const SignInStyle = styled.div`
  text-align: center;

  h1 {
    margin-bottom: .5rem;
  }

  form {
    padding-top: 30px;
    max-width: 300px;
    margin: auto;

    input, button {
      margin-top: 8px;
      margin-bottom: 8px;
      width: 100%;
    }
  }

  .already-have {
    padding-top: 15px;
    color: ${props => props.theme.colors.blue};

    span {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`