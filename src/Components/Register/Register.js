import React, { useState } from "react";
import styled from "styled-components";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import pixx from "../../Components/sta.gif";
import ClipLoader from "react-spinners/FadeLoader";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigator = useNavigate();
  const [image, setImage] = useState(pixx);
  const [avatar, setAvatar] = useState("");
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#fff");

  const loadChange = () => {
    setLoading(true);
  };

  const mySchema = yup.object().shape({
    userName: yup.string().required("userName is a Reqequired field"),
    email: yup.string().email().required("Email is a required fiels"),
    password: yup.string().required("Password is a Required Field"),
    confirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password Dosnt Match"),
  });

  const {
    register,
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

  const formSubmmit = handleSubmit(async (value) => {
    const { userName, email, password } = value;

    const formdata = new FormData();
    formdata.append("userName", userName);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("avatar", avatar);

    const config = {
      "content-type": "multipart/form-data",
    };

    const mainURL = "https://sam-diary.herokuapp.com";
    const URL = `${mainURL}/api/diary/user/signup`;

    await axios.post(URL, formdata, config).then((res) => {
      console.log("Data:", res.data.data);
    });
    // setLoading(false);
    swal({
      title: "Great ✌️",
      text: "You are signed up sucessfully, You can now proceed to sign in",
      icon: "success",
      button: "Sign In Now",
    });
    navigator("/signin");
  });

  return (
    <>
      {/* {loading ? (
        <Div>
          <ClipLoader color={color} loading={loading} size={150} />
        </Div>
      ) : ( */}
      <Container onSubmit={formSubmmit}>
        <ImageHolder>
          <PrevImgDiv>
            <img src={image} alt="imf" />
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
            <input placeholder="Your Username Hear" {...register("userName")} />
            <small> {errors.userName?.message} </small>
          </InputCtrl>
          <InputCtrl>
            <input placeholder="Enter Your Email" {...register("email")} />
            <small> {errors.email?.message} </small>
          </InputCtrl>
          <InputCtrl>
            <input
              placeholder="Enter a small Password"
              {...register("password")}
            />
            <small> {errors.password?.message} </small>
          </InputCtrl>
          <InputCtrl>
            <input
              placeholder="Confirm Your Password"
              {...register("confirm")}
            />
            <small> {errors.confirm?.message} </small>
          </InputCtrl>
        </InGen>
        <Button type="submit">Sign Up</Button>
      </Container>
      )
    </>
  );
};

export default Register;

const Div = styled.div`
  height: 90vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 10;
`;

const Container = styled.form`
  width: 100%;
  min-height: 90vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
  position: relative;
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
