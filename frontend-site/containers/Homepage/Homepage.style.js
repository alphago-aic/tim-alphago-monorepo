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
  text-align: center;
  padding: 30px;
  padding-top: 15vh;
  background: linear-gradient(82.84deg, #2DC4A9 0%, #75EDA6 100%);
  
  @media only screen and (min-width: 768px) {
    width: 50%;
  }
`

export const HomepageRight = styled.div`
  width: 100%;
  text-align: center;
  padding: 30px;
  padding-top: 4vh;
  padding-bottom: 6vh;
  
  @media only screen and (min-width: 768px) {
    width: 50%;
    padding-top: 25vh;
  }
`
