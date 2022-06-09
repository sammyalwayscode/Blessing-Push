import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../Global/Globaltate";

const Header = () => {
  const userState = useSelector((state) => state.currentUser);
  const diapatch = useDispatch();

  return (
    <>
      <Container>
        <Wrapper>
          <Logo to="/">
            <img src="/logo.png" alt="Logo" />
          </Logo>

          <Navigation>
            {userState ? (
              <NavLink style={{ textDecoration: "none" }} to="/">
                <span>Diary</span>
              </NavLink>
            ) : null}
            {userState ? (
              <NavLink style={{ textDecoration: "none" }} to="/newdiary">
                <span>New Diary</span>
              </NavLink>
            ) : null}
            {userState ? (
              <NavLink style={{ textDecoration: "none" }} to="/favorites">
                <span>Favorites</span>
              </NavLink>
            ) : null}
            <NavLink style={{ textDecoration: "none" }} to="/signin">
              <span>Sign In</span>
            </NavLink>
            <NavLink style={{ textDecoration: "none" }} to="/register">
              <button
                onClick={() => {
                  diapatch(signOut());
                }}
              >
                Register
              </button>
            </NavLink>
          </Navigation>
        </Wrapper>
      </Container>
    </>
  );
};

export default Header;

const Container = styled.div`
  height: 70px;
  width: 100%;
  background-color: #4285f4;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sen;
  flex-wrap: wrap;
`;
const Wrapper = styled.div`
  width: 85%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled(NavLink)`
  img {
    width: 100px;
  }
`;
const Navigation = styled.div`
  /* background-color: aqua; */
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
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
    margin: 0 10px;
  }

  span {
    color: #fff;
    font-size: 18px;
    font-weight: 800;
    margin: 0 10px;
    transition: all 350ms;

    :hover {
      color: gold;
    }
  }
`;
