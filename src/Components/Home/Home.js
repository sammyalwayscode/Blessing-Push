import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getDiary } from "../Global/Globaltate";

const Home = () => {
  const userId = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const [hold, setHold] = useState([]);

  const getData = async () => {
    const mainURL = "https://sam-diary.herokuapp.com";
    const URL = `${mainURL}/api/userdiary/diary/${userId._id}`;

    await axios.get(URL).then((res) => {
      console.log(res.data.data.diary);
      setHold(res.data.data.diary);
      // dispatch(getDiary(res.data.data));
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Wrapper>
        {hold?.map((props) => (
          <Card key={props._id}>
            <Title> {props.title} </Title>
            <small>Today 20th of May 2040</small>
            <ImageDiv>
              <img src={props.image} alt="" />
            </ImageDiv>
            <Description>{props.message}</Description>
            <ButonDiv>
              <button>Edit</button>
              <button>Add to Fav</button>
              <button>Delete</button>
            </ButonDiv>
          </Card>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Home;

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
