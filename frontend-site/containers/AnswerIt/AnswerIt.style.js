import styled from "styled-components";

export const AnswerItStyle = styled.form`
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
  background: linear-gradient(82.84deg, #2DC4A9 0%, #75EDA6 100%);

  .text-wrapper {
    max-width: 350px;
    margin: auto;
  }

  textarea {
    width: 100%;
    border-radius: 12px;
  }

  @media only screen and (min-width: 768px) {
    flex-wrap: nowrap;
  }  
`

export const AnswerItLeft = styled.div`
  width: 100%;
  padding: 30px;
  padding-top: calc(100px + 5vh);
  
  @media only screen and (min-width: 768px) {
    width: 50%;
  }
`

export const AnswerItRight = styled.div`
  width: 100%;
  padding: 20px 30px;
  min-height: 50vh;
  text-align: center;

  input {
    margin-bottom: 30px;
    width: 100%;
    max-width: 500px;
  }

  button {
    max-width: 135px;
    width: 100%;
    margin: auto;
  }

  h4, p {
    color: white;
  }

  h4 {
    padding-top: 10px;
    margin-bottom: 0;
  }
  
  @media only screen and (min-width: 768px) {
    width: 50%;
    padding-top: calc(100px + 5vh);
    padding-bottom: 60px;
    max-height: 100vh;
    overflow-y: auto;
  }
`
