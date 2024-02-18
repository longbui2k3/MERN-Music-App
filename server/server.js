const app = require("./src/app");

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is listening to PORT ${PORT}`);
});
