const express = require("express");
const AuthenController = require("../controllers/AuthenController");
const asyncHandler = require("../helpers/asyncHandler");
const { protect } = require("../auth/authUtils");

const router = express.Router();
router.post(
  "/signup",
  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'Sign Up'
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/signUpBodySchema'
          },
          examples: {
            'Normal': {
              $ref: '#/components/examples/signUpNormalExample'
            },
            'Facebook': {
              $ref: '#/components/examples/signUpFacebookExample'
            },
            'Google': {
              $ref: '#/components/examples/signUpGoogleExample'
            }
          }
        }
      }
    }
  */
  /* #swagger.responses[201] = {
      description: "Created",
      content: {
          "application/json": {
            schema:{
              $ref: '#/components/schemas/signUpResponse201Schema'
            }
          }           
      }
    }   
  */
  /* #swagger.responses[400] = {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/signUpResponse400Schema'
          }
        }
      }
    }
  */
  asyncHandler(AuthenController.signUp)
);

router.route("/forgotPassword").post(
  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'Forgot Password'
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/forgotPasswordBodySchema'
          },
        }
      }
    }
  */
  /* #swagger.responses[200] = {
      description: "OK",
      content: {
          "application/json": {
            schema:{
              $ref: '#/components/schemas/forgotPasswordResponse200Schema'
            }
          }           
      }
    }   
  */
  /* #swagger.responses[400] = {
      description: "Bad Request",
      content: {
        "application/json": {
          schema:{
            $ref: '#/components/schemas/forgotPasswordResponse400Schema'
          }
        }           
      }
    }   
  */
  /* #swagger.responses[424] = {
      description: "Failed Dependency",
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/forgotPasswordResponse424Schema'
          }
        }
      }
    }   
  */
  asyncHandler(AuthenController.forgotPassword)
);

router.route("/resetPassword/:token").patch(
  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'Reset Password'
  /* #swagger.parameters['token'] = {
    in: 'path',
    description: 'Reset Password Token',
    type: 'string'
  }
  */
  /* #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: '#/components/schemas/resetPasswordBodySchema'
        },
      }
    }
  }
  */
  /* #swagger.responses[200] = {
      description: "OK",
      content: {
        "application/json": {
          schema:{
            $ref: '#/components/schemas/resetPasswordResponse200Schema'
          }
        }           
      }
    }   
  */
  /* #swagger.responses[400] = {
      description: "Bad Request",
      content: {
        "application/json": {
          schema:{
            $ref: '#/components/schemas/resetPasswordResponse400Schema'
          }
        }           
      }
    }   
  */
  /* #swagger.responses[401] = {
      description: "Auth Failure",
      content: {
        "application/json": {
          schema:{
            $ref: '#/components/schemas/resetPasswordResponse401Schema'
          }
        }           
      }
    }   
  */
  asyncHandler(AuthenController.resetPassword)
);
router.route("/checkExistEmail").post(
  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'Check exist email'
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/checkEmailExistsBodySchema'
          }        
        }
      }
    }
  */
  /* #swagger.responses[200] = {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/checkEmailExistsResponse200Schema'
          }
        }           
      }
    }
  */
  /* #swagger.responses[400] = {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/checkEmailExistsResponse400Schema'
          }
        }           
      }
    }
  */
  asyncHandler(AuthenController.checkExistEmail)
);

router.route("/login").post(
  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'Login'
  /* #swagger.parameters['type'] = {
      in: 'query',
      description: 'Type of account',
      schema: {
        $ref: '#/components/schemas/logInType'   
      }, 
    }
  */
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/logInBodySchema'
          },
          examples: {
            'Normal': {
              $ref: '#/components/examples/logInNormalExample'
            },
            'Facebook': {
              $ref: '#/components/examples/logInFacebookExample'
            },
            'Google': {
              $ref: '#/components/examples/logInGoogleExample'
            }
          }
        }
      }
    } 
  */
  /* #swagger.responses[200] = {
      description: "OK",
      content: {
          "application/json": {
            schema:{
              $ref: '#/components/schemas/logInResponse200Schema'
            }
          }           
      }
    }   
  */
  /* #swagger.responses[400] = {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/signUpResponse400Schema'
          }
        }
      }
    }
  */
  asyncHandler(AuthenController.logIn)
);
router.use(protect);
router.route("/logout").get(
  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'Log out'
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */
  asyncHandler(AuthenController.logOut)
);
module.exports = router;
