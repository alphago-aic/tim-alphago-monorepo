import styled from "styled-components";

export const HomepageStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
  @media only screen and (min-width: 768px) {
    flex-wrap: nowrap;
  }  
`

export const HomepageLeft = styled.div`
  width: 100%;
  padding: 30px;
  padding-top: 100px;
  background: linear-gradient(82.84deg, #2DC4A9 0%, #75EDA6 100%);
  
  @media only screen and (min-width: 768px) {
    width: 50%;
  }
`

export const HomepageRight = styled.div`
  width: 100%;
  padding: 20px 15px;
  min-height: 50vh;

  .qa-ordered-list {
    padding-left: 20px;
    margin-top: 0;
  }

  .qa-wrapper {
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
    padding-left: 12px;
  }

  .homepage-question {
    padding-top: 20px;
  }

  .homepage-answer {
    color: black;
    font-weight: normal;

    ol {
      padding-left: 18px;
    }
  }

  .correct {
    font-weight: bold;
    color: #1a806e;
  }
  
  @media only screen and (min-width: 768px) {
    width: 50%;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 100px;
    padding-bottom: 60px;
    max-height: 100vh;
    overflow-y: auto;
  }
`
