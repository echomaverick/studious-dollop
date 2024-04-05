import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/Authentication";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/login.css";
import Logo from "../images/third-logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { login, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    code: "",
    age: "",
  });

  const [signupErrors, setSignupErrors] = useState({
    name: "",
    surname: "",
    age: "",
    email: "",
    password: "",
    code: "",
  });
  const [signupNetworkError, setSignupNetworkError] = useState(false);

  useEffect(() => {
    const tokenExpirationTime = 60 * 60 * 1000;
    const tokenExpirationTimer = setTimeout(() => {
      logout();
      navigate("/login");
    }, tokenExpirationTime);

    setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(tokenExpirationTimer);
  }, [logout, navigate]);

  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const isSurnameValid = (surname) => surname.length >= 2;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    if (isSignUp) {
      setSignupErrors({ ...signupErrors, [name]: "" });
    } else {
      setLoginError("");
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5100/api/create-user",
        userData,
        { timeout: 1000 }
      );
      console.log("User registered successfully", response);
      alert("Regjistrim i suksesshem!");
      navigate("/home");
    } catch (error) {
      console.error("Error registering:", error.response);

      if (error.code === "ECONNABORTED") {
        setSignupNetworkError(true);
      } else if (error.code === "ERR_NETWORK") {
        setSignupNetworkError(true);
      } else {
        setSignupErrors({
          name: isNaN(userData.name)
            ? ""
            : "Emri duhet të përmbajë vetëm shkronja",
          surname: isSurnameValid(userData.surname)
            ? ""
            : "Mbiemri duhet të përmbajë të paktën 2 shkronja",
          age:
            userData.age >= 13 && userData.age <= 110
              ? ""
              : "Mosha duhet të jetë 13-110",
          email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)
            ? ""
            : "Email-i duhet të jetë në formatin e duhur",
          password:
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
              userData.password
            )
              ? ""
              : "Fjalëkalimi duhet të plotësojë kërkesat. Një shkronjë e madhe, një shkronjë e vogël, një numër dhe një simbol.",
        });
      }
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5100/api/login",
        userData,
        { timeout: 2000 }
      );

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        login(userData.email);
        navigate("/home");
      } else {
        setLoginError("Dicka shkoi keq. Ju lutemi, provojeni përsëri më vonë");
      }
    } catch (error) {
      console.error("Error logging in:", error);

      if (error.code === "ECONNABORTED") {
        setLoginError(
          "Koha e pritjes për përgjigje nga serveri ka përfunduar. Ju lutemi, provojeni përsëri më vonë."
        );
      } else if (error.code === "ERR_NETWORK") {
        setLoginError("Dicka shkoi keq. Ju lutemi, provojeni përsëri më vonë");
      } else {
        setLoginError("Kredencialet e pavlefshme");
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setSignupErrors({
      name: "",
      surname: "",
      age: "",
      email: "",
      password: "",
    });
    setLoginError("");
  };

  return (
    <>
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      <div
        className="login-container"
        style={{ maxWidth: "1600px", margin: "0 auto" }}
      >
        <div className="left-side">
          <img className="logo" src={Logo} alt="Home Screen Logo" />
        </div>
        <div className="right-side">
          <div className="login-form">
            <h2>{isSignUp ? "Regjistrohu" : "Logohu"}</h2>
            {isSignUp && (
              <>
                <div className="form-group">
                  <label>Emri:</label>
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    placeholder="Vendos emrin"
                  />
                  <span className="error">{signupErrors.name}</span>
                </div>

                <div className="form-group">
                  <label>Mbiemri:</label>
                  <input
                    type="text"
                    name="surname"
                    value={userData.surname}
                    onChange={handleInputChange}
                    placeholder="Vendos mbiemrin"
                  />
                  <span className="error">{signupErrors.surname}</span>
                </div>

                <div className="form-group">
                  <label>Mosha:</label>
                  <input
                    type="text"
                    name="age"
                    value={userData.age}
                    onChange={handleInputChange}
                    placeholder="Vendos moshen"
                  />
                  <span className="error">{signupErrors.age}</span>
                </div>
              </>
            )}

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                placeholder="Vendos email-in"
              />
              <span className="error">
                {isSignUp ? signupErrors.email : loginError}
              </span>
            </div>

            <div className="form-group">
              <label>Fjalekalimi:</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  placeholder="Vendos fjalëkalimin"
                  className="password-input"
                />
                <span
                  className="show-password-btn"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <span className="error">{signupErrors.password}</span>
            </div>

            <button
              type="button"
              onClick={isSignUp ? handleSignUp : handleSignIn}
              className={isSignUp ? "signup-btn" : "signin-btn"}
            >
              {isSignUp ? "Regjistrohu" : "Logohu"}
            </button>

            <p className="mode-toggle" onClick={toggleMode}>
              {isSignUp
                ? "Tashmë një anëtar? Logohuni"
                : "Nuk jeni anëtar? Regjistrohu"}
            </p>

            {isSignUp && signupNetworkError && (
              <p className="error">
                Dicka shkoi keq. Ju lutemi provojeni përsëri më vonë.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
