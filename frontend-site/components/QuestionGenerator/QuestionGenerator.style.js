import styled from "styled-components";

export const StyledQuestionGenerator = styled.div`
  form {
    padding-top: 30px;
    max-width: 350px;
    margin: auto;

    textarea {
      width: 100%;
      border-radius: 12px;
    }
    
    button {
      max-width: 135px;
      width: 100%;
      margin: auto;
    }
  }

  .card-wrapper {
    background: ${props => props.theme.colors.primary};
    max-width: 450px;
    width: 100%;
    border-radius: 12px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    margin-bottom: 20px;
  }

  .card-top {
    background: #FFFFFF;
    border-radius: 12px;
  }

  .card-bottom {
    color: white;
    padding-top: 4px;
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .question-count {
      background: white;
      border-radius: 8px;
      color: black;
      font-size: 1.1em;
      padding: 8px 30px;
    }
  }

  .btn-wrapper {
    text-align: center;
  }
`