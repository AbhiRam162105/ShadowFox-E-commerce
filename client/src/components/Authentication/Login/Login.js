import { useEffect, useState } from "react";
import LoginCard from "../../Card/LoginCard/LoginCard";
import "./Login.css";
import { getUserDetails } from "../../../Context/UserDetails";

const Login = () => {
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchData = async () => {
        const userDetails = await getUserDetails();
        setUserDetails(userDetails);
      };
      fetchData();
    }
  }, []);
  if (userDetails) {
    window.location.href = "/account/me";
  }
  return (
    <div className="login__auth__container">
      <div className="login__auth">
        <LoginCard />
      </div>
    </div>
  );
};

export default Login;
