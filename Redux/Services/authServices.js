//register user
export const registerUser = async (userData) => {
  try {
    const response = await fetch("/api/auth/registerUserHandler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify(userData),
    });

    if (response.statusText === "OK") {
      const data = await response.json();
      console.log(data);
      //toast.success("User Registered sucessfully");
      alert("User Registered sucessfully");
      return data;
    } else {
      const errorData = await response.json();
      const errorMessage = errorData.message || "Registration failed";
      alert(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Login

// export const loginUser = async (userData) => {
//   try {
//     const response = await axios.post(
//       `${BACKEND_URL}/api/users/login`,
//       userData
//     );
//     if (response.statusText === "OK") {
//       toast.success("Login Successful...");
//       alert("login sucessfull");
//     }
//     return response.data;
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();
//     toast.error(message);
//   }
// };

// //logout
// export const logoutUser = async () => {
//   try {
//     await axios.get(`${BACKEND_URL}/api/users/logout`);
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();
//     toast.error(message);
//   }
// };

// //forget pasword
// export const forgetPassword = async (userData) => {
//   try {
//     const response = await axios.post(
//       `${BACKEND_URL}/api/users/resetpassword`,
//       userData
//     );
//     toast.success(response.data.message);
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();
//     toast.error(message);
//   }
// };

// //login status
// export const getLoginStatus = async (userData) => {
//   try {
//     const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`);
//     return response.data;
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();
//     toast.error(message);
//     alert(message);
//   }
// };
