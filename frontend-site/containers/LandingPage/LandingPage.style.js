import styled from "styled-components";

export const LandingPageStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
  
  @media only screen and (min-width: 768px) {
    flex-wrap: nowrap;
  }
`

export const LandingPageLeft = styled.div`
  width: 100%;
  text-align: center;
  padding: 30px;
  padding-top: 15vh;

  .image-headline {
    width: 100%;
    max-width: 400px;
    margin: auto;
  }

  h3 {
    max-width: 510px;
    margin: auto;
    color: ${props => props.theme.colors.primary};
    padding-bottom: 12px;

    small {
      font-style: italic;
    }
  }

  p {
    max-width: 360px;
    margin: auto;
    line-height: 1.5;
    padding-bottom: 50px;
  }

  .social-media {
    display: flex;
    justify-content: center;

    a {
      padding: 5px 15px;
    }
  }
  
  @media only screen and (min-width: 768px) {
    width: 50%;
  }
`

export const LandingPageRight = styled.div`
  width: 100%;
  background: linear-gradient(82.84deg, #2DC4A9 0%, #75EDA6 100%);
  color: white;
  padding: 30px;
  padding-top: 4vh;
  padding-bottom: 6vh;
  
  @media only screen and (min-width: 768px) {
    width: 50%;
    padding-top: 25vh;
  }
`
