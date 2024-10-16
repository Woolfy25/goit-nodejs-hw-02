const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const routerApi = require("./routes/index");

const corsOptions = require("./cors");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("tiny"));

app.use("/api", routerApi);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Ruta nu exista!",
    data: "Not Found!",
  });
});

app.use((err, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Serverul ruleaza pe port ${PORT}`);
});
