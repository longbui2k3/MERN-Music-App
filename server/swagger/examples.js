module.exports = {
  signUpNormalExample: {
    summary: "Normal",
    value: {
      name: "Long",
      email: "mernmusicapp@gmail.com",
      typeOfAccount: "normal",
      password: "12345678",
      dateOfBirth: "2003-09-04",
      gender: "Man",
    },
  },
  signUpGoogleExample: {
    summary: "Google",
    value: {
      name: "App Music",
      email: "mernmusicapp@gmail.com",
      typeOfAccount: "google",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocJ0-h2Qn4tn1pd-FwX3Id-3WuhLmPudV8uiOKnbEq_WfEOKww=s100-c",
      dateOfBirth: "2003-04-12",
      gender: "Man",
      uid: "FFpqbYnYhHX8DwcjxtafMI9GSnN2",
    },
  },
  signUpFacebookExample: {
    summary: "Facebook",
    value: {
      name: "Bui Duc Long",
      email: "mernmusicapp@gmail.com",
      typeOfAccount: "facebook",
      avatar:
        "https://graph.facebook.com/1412679882990798/picture?width=100&height=100",
      dateOfBirth: "2003-09-12",
      gender: "Man",
      federatedId: "1412679882990798",
      uid: "VxCjRonU3ONqGLc08DNIzqrACol2",
    },
  },
  logInNormalExample: {
    summary: "Normal",
    value: {
      email: "tranvanc@gmail.com",
      password: "123",
    },
  },
  logInGoogleExample: {
    summary: "Google",
    value: {
      email: "buiduclong911@gmail.com",
      authentication:
        "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlMzcxNzMwZWY4NmViYT…1e8yVMcBKXuAwIE0mezpVN2KrO3nBdDT3PHLoybbzwXXM3S_A",
    },
  },
  logInFacebookExample: {
    summary: "Facebook",
    value: {
      authentication:
        "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlMzcxNzMwZWY4NmViYT…Fvyp-dCTGjzbllDc5AP0neWsJZLvaeA4sSyee5XujxddimIfg",
      federatedId: "1412679882990798",
    },
  },
};
