// import React, { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const TokenValidation = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkTokenValidity = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (token) {
//           await axios.get("http://localhost:5100/api/protected-route", {
//             data: {
//               token: token,
//             },
//           });
//         }
//       } catch (error) {
//         console.log("Token invalid or expired. Redirecting to login....");
//         navigate("/login");
//       }
//     };

//     checkTokenValidity();
//   }, [navigate]);

//   return null;
// };

// export default TokenValidation;
