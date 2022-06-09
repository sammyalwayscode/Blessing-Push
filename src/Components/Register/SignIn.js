import React from "react";
import styled from "styled-components";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createUser } from "../Global/Globaltate";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const mySchema = yup.object().shape({
    email: yup.string().email().required("Email is a required fiels"),
    password: yup.string().required("Password is a Required Field"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(mySchema),
  });

  const formSign = handleSubmit(async (value) => {
    const { password, email } = value;
    const mainURL = "https://sam-diary.herokuapp.com";
    const URL = `${mainURL}/api/diary/user/signin`;

    await axios.post(URL, { password, email }).then((res) => {
      console.log(res.data.data);
      dispatch(createUser(res.data.data));
    });
    swal({
      title: "Great ✌️",
      text: "You are signed up sucessfully, You can now proceed to sign in",
      icon: "success",
      button: "Sign In Now",
    });
    navigator("/");
  });

  return (
    <Container onSubmit={formSign}>
      <InGen>
        <InputCtrl>
          <input placeholder="Enter Your Email" {...register("email")} />
          <small> {errors.email?.message} </small>
        </InputCtrl>
        <InputCtrl>
          <input
            placeholder="Enter a small Password"
            {...register("password")}
          />
          <small>{errors.password?.message} </small>
        </InputCtrl>
      </InGen>
      <Button type="submit">Sign In</Button>
    </Container>
  );
};

export default SignIn;

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
