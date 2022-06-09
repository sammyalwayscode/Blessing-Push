import React, { useState } from "react";
import styled from "styled-components";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import pixx from "../../Components/sta.gif";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

const NewDiary = () => {
  const userId = useSelector((state) => state.currentUser);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState(pixx);
  const [avatar, setAvatar] = useState("");

  const mySchema = yup.object().shape({
    title: yup.string().required("Title is a Reqequired field"),
    message: yup.string().required("Message is a required Field"),
  });

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(mySchema),
  });

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setImage(save);
    setAvatar(file);
  };

  const mySubmitForm = handleSubmit(async (value) => {
    console.log(value);
    const { title, message } = value;

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("message", message);
    formdata.append("image", avatar);

    const config = {
      "content-type": "multipart/form-data",
    };

    const mainURL = "https://sam-diary.herokuapp.com";
    const URL = `${mainURL}/api/userdiary/diary/${userId._id}`;

    await axios.post(URL, formdata, config).then((res) => {
      console.log("Diary", res);
    });

    swal({
      title: "Great ✌️",
      text: "You've Just Crated a Diary",
      icon: "success",
      button: "Ok",
    });
    navigator("/");

    reset();
  });

  return (
    <Container onSubmit={mySubmitForm}>
      <ImageHolder>
        <PrevImgDiv>
          <img src={image} alt="" />
        </PrevImgDiv>
        <ImageLabel htmlFor="pix">Upload your Image</ImageLabel>
        <ImageInput
          id="pix"
          type="file"
          accept="image/*"
          onChange={handleImage}
        />
      </ImageHolder>
      <InGen>
        <InputCtrl>
          <input placeholder="Your Title" {...register("title")} />
          <small> error </small>
        </InputCtrl>
        <InputCtrl>
          <textarea
            placeholder="Enter Your Description"
            {...register("message")}
          />
          <small> error </small>
        </InputCtrl>
      </InGen>
      <Button type="submit">Create Diary</Button>
    </Container>
  );
};

export default NewDiary;

const Container = styled.form`
  width: 100%;
  min-height: 90vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
`;

const Image = styled.div`
  height: 100px;
  width: 100px;
  background-color: darkcyan;
  border-radius: 200px;
  margin-bottom: 30px;
`;
const InGen = styled.div``;
const InputCtrl = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  small {
    font-size: 13px;
    font-weight: bold;
    font-family: poppins;
    color: red;
  }

  input {
    height: 30px;
    width: 280px;
  }

  textarea {
    height: 100px;
    font-family: poppins;
    resize: none;
  }
`;
const Button = styled.button`
  font-family: "Sen", sans-serif;
  font-weight: bold;
  font-size: 13px;
  padding: 8px 35px;
  background-color: #4285f4;
  border-radius: 4px;
  outline: none;
  border: none;
  color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  cursor: pointer;
`;

const PrevImgDiv = styled.div`
  height: 80px;
  width: 80px;
  background-color: gray;
  border-radius: 50%;
  margin: 10px 0;
  border: 1px solid gray;

  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const ImageInput = styled.input`
  display: none;
`;

const ImageLabel = styled.label`
  padding: 6px 12px;
  background-color: #000;
  color: white;
  border-radius: 3px;
  transition: all 350ms;
  font-size: 14px;
  outline: none;
  border: 0;

  :hover {
    cursor: pointer;
    transform: scale(1.01);
  }
`;

const ImageHolder = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
