import axios from "./axiosConfig";

export const Login = async (email, password) => {
  const res = await axios.post("http://localhost:4000/api/v1/login", {
    email,
    password,
  });
  return res;
};

export const LoginGoogle = async (email, authentication) => {
  const res = await axios.post(
    "http://localhost:4000/api/v1/login?type=google",
    {
      email,
      authentication,
    }
  );
  return res;
};
// http://localhost:4000/api/v1/user/login?type=facebook
export const LoginFacebook = async (authentication, federatedId) => {
  const res = await axios.post(
    "http://localhost:4000/api/v1/login?type=facebook",
    {
      authentication,
      federatedId,
    }
  );
  return res;
};

export const Logout = async () => {
  const res = await axios.get("http://localhost:4000/api/v1/logout");
  return res;
};

export const ForgotPassword = async (email) => {
  const res = await axios.post(
    "http://localhost:4000/api/v1/forgotPassword",
    { email }
  );
  return res;
};

export const ResetPassword = async (
  password,
  passwordConfirm,
  userId,
  token
) => {
  const res = await axios.patch(
    `http://localhost:4000/api/v1/resetPassword/${token}`,
    { password, passwordConfirm }
  );
  return res;
};

export const SignUp = async (email, password, name, dateOfBirth, gender) => {
  const res = await axios.post("http://localhost:4000/api/v1/signup", {
    email,
    password,
    name,
    dateOfBirth,
    gender,
    typeOfAccount: "normal",
  });
  return res;
};

export const SignUpGoogle = async (
  email,
  uid,
  name,
  dateOfBirth,
  gender,
  avatar
) => {
  const res = await axios.post("http://localhost:4000/api/v1/signup", {
    email,
    uid,
    name,
    dateOfBirth,
    gender,
    avatar,
    typeOfAccount: "google",
  });
  return res;
};

export const SignUpFacebook = async (
  email,
  uid,
  name,
  dateOfBirth,
  gender,
  avatar,
  federatedId
) => {
  const res = await axios.post("http://localhost:4000/api/v1/signup", {
    email,
    uid,
    name,
    dateOfBirth,
    gender,
    avatar,
    federatedId,
    typeOfAccount: "facebook",
  });
  return res;
};
export const CheckExistEmail = async (email) => {
  const res = await axios.post(
    "http://localhost:4000/api/v1/checkExistEmail",
    {
      email,
    }
  );
  return res;
};
