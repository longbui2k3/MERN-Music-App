module.exports = {
  signUpBodySchema: {
    $name: "Your Name",
    $email: "youremail@gmail.com",
    password: "",
    $gender: {
      type: "string",
      default: "Prefer not to say",
      "@enum": [
        "Man",
        "Woman",
        "Non-binary",
        "Something else",
        "Prefer not to say",
      ],
    },
    $dateOfBirth: "",
    $typeOfAccount: {
      type: "string",
      default: "normal",
      "@enum": ["normal", "google", "facebook"],
    },
    uid: "",
    avatar: "",
    federatedId: "",
  },
  signUpResponse201Schema: {
    $status: 201,
    $message: "Sign up successfully!",
    $metadata: {
      $tokens: {
        $accessToken: "string",
        $refreshToken: "string",
      },
      $user: {
        $_id: "string",
        $name: "string",
        $email: "string",
        $role: "string",
        $typeOfAccount: "string",
        $dateOfBirth: "string",
        $gender: "string",
      },
    },
  },
  signUpResponse400Schema: {
    $status: 400,
    $message: "string",
  },
  logInBodySchema: {
    email: "youremail@gmail.com",
    password: "",
    authentication: "",
    federatedId: "",
  },
  logInType: {
    type: "string",
    default: "normal",
    "@enum": ["google", "facebook", "normal"],
  },
  logInResponse200Schema: {
    $status: 200,
    $message: "Log in successfully!",
    $metadata: {
      $tokens: {
        $accessToken: "string",
        $refreshToken: "string",
      },
      $user: {
        $_id: "string",
        $name: "string",
        $email: "string",
        $role: "string",
        $typeOfAccount: "string",
      },
    },
  },
  forgotPasswordBodySchema: {
    $email: "youremail@gmail.com",
  },
  forgotPasswordResponse200Schema: {
    $status: 200,
    $message: "Password reset email sent",
    $metadata: {},
  },
  forgotPasswordResponse400Schema: {
    $status: 400,
    $message: "No account with the supplied email exists!",
  },
  forgotPasswordResponse424Schema: {
    $status: 424,
    $message: "Password reset email failed!",
  },
  resetPasswordBodySchema: {
    $password: "string",
    $passwordConfirm: "string",
  },
  resetPasswordResponse200Schema: {
    $status: 200,
    $message: "Reset password successfully!",
    $metadata: {
      $tokens: {
        $accessToken: "string",
        $refreshToken: "string",
      },
      $user: {
        $_id: "string",
        $name: "string",
        $email: "string",
        $role: "string",
        $typeOfAccount: "string",
        $dateOfBirth: "string",
        $gender: "string",
      },
    },
  },
  resetPasswordResponse400Schema: {
    $status: 400,
    $message: "string",
  },
  resetPasswordResponse401Schema: {
    $status: 401,
    $message: "string",
  },
  checkEmailExistsBodySchema: {
    $email: "youremail@gmail.com",
  },
  checkEmailExistsResponse400Schema: {
    $status: 400,
    $message: "Email has already existed!",
  },
  checkEmailExistsResponse200Schema: {
    $status: 200,
    $message: "OK",
    $metadata: {},
  },
};
