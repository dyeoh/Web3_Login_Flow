import express from "express";
import cors from "cors";
import "./db.ts";

import { router } from "./routes";

const port = 3000;

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server running at on ${port}`);
});
