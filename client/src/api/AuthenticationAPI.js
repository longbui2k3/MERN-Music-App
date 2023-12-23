import axios from "axios";

export const Login = async (email, password) => {
  const res = await axios.post("http://localhost:4000/api/v1/user/login", {
    email,
    password,
  });
  return res;
};

export const LoginGoogle = async (email, authentication) => {
  const res = await axios.post(
    "http://localhost:4000/api/v1/user/loginGoogle",
    {
      email,
      authentication,
    }
  );
  return res;
};

export const Logout = async () => {
  const res = await axios.get("http://localhost:4000/api/v1/user/logout");
  return res;
};

export const ForgotPassword = async (email) => {
  const res = await axios.post(
    "http://localhost:4000/api/v1/user/forgotPassword",
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
    `http://localhost:4000/api/v1/user/resetPassword/${userId}/${token}`,
    { password, passwordConfirm }
  );
  return res;
};

export const SignUp = async (email, password, name, dateOfBirth, gender) => {
  const res = await axios.post("http://localhost:4000/api/v1/user/signup", {
    email,
    password,
    name,
    dateOfBirth,
    gender,
    typeOfAccount: "normal",
  });
  return res;
};

export const SignUpGoogle = async (email, uid, name, dateOfBirth, gender) => {
  const res = await axios.post("http://localhost:4000/api/v1/user/signup", {
    email,
    uid,
    name,
    dateOfBirth,
    gender,
    typeOfAccount: "google",
  });
  return res;
};

export const CheckExistEmail = async (email) => {
  const res = await axios.post(
    "http://localhost:4000/api/v1/user/checkExistEmail",
    {
      email,
    }
  );
  return res;
};
