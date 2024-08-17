const examples = require("./swagger/examples");
const schemas = require("./swagger/schemas");
const swaggerAutogen = require("swagger-autogen")({
  openapi: "3.0.0",
  autoBody: true,
});
const doc = {
  openapi: "3.0.0",
  info: {
    title: "Spotifree",
    description: "API endpoints for music app",
    contact: {
      name: "Long Bui",
      email: "buiduclongit@gmail.com",
      url: "https://github.com/longbui2k3/MERN-Music-App",
    },
    version: "1.0.0",
  },
  servers: [
    { url: "http://localhost:4000/api/v1", description: "Local server" },
  ],
  components: {
    schemas: schemas,
    examples: examples,
  },
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header",
      name: "authorization",
      description: "API Key",
    },
    clientId: {
      type: "apiKey",
      in: "header",
      name: "x-client-id",
      description: "Client ID (User ID)",
    },
  },
};

const routes = ["./src/routers/index.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */
const outputFile = "./swagger-output.json";
swaggerAutogen(outputFile, routes, doc);
