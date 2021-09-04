import styled from "styled-components";

export const SummarizeStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
  @media only screen and (min-width: 768px) {
    flex-wrap: nowrap;
  }  
`

export const SummarizeLeft = styled.div`
  width: 100%;
  padding: 30px;
  padding-top: calc(100px + 5vh);
  background: linear-gradient(82.84deg, #2DC4A9 0%, #75EDA6 100%);
  
  @media only screen and (min-width: 768px) {
    width: 50%;
  }
`

export const SummarizeRight = styled.div`
  width: 100%;
  padding: 20px 15px;
  min-height: 50vh;
  
  @media only screen and (min-width: 768px) {
    width: 50%;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: calc(100px + 5vh);
    padding-bottom: 60px;
    max-height: 100vh;
    overflow-y: auto;
  }
`
