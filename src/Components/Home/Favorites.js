import React from "react";
import styled from "styled-components";

const Favorites = () => {
  return (
    <Container>
      <Wrapper>
        <Card>
          <Title>My Day</Title>
          <small>Today 20th of May 2040</small>
          <ImageDiv>
            <img src="/eee.jpg" alt="" />
          </ImageDiv>
          <Description>
            The word ball derives from the Latin word ballare, meaning 'to
            dance', and bal was used to describe a formal dancing party in
            French in the 12th century. The ballo was an Italian Renaissance
            word for a type of elaborate court dance, and developed into one for
            the event at which it was performed.
          </Description>
          <ButonDiv>
            <button>Remove From Fav</button>
          </ButonDiv>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default Favorites;

const ButonDiv = styled.div`
  display: flex;
  button {
    margin: 20px 20px;
    font-family: "Sen", sans-serif;
    font-weight: bold;
    font-size: 13px;
    padding: 8px 35px;
    background-color: #fff;
    border-radius: 20px;
    outline: none;
    border: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    cursor: pointer;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Card = styled.div`
  min-height: 70px;
  height: 100%;
  background-color: gold;
  width: 100%;
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: fredoka one;
`;
const Title = styled.div`
  margin-top: 10px;
  font-size: 20px;
`;
const ImageDiv = styled.div`
  height: 100px;
  width: 150px;
  margin: 8px 0;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
const Description = styled.div`
  font-family: poppins;
  width: 90%;
  text-align: center;
`;
