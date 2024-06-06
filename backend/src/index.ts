import express from "express";
import { authRouter } from "./routes/auth.route";

const app = express();

const PORT = 5000;
app.use(express.json());
app.use("/api/auth", authRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
