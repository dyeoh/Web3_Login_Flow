import express from "express";
import "./db.ts";

import { router } from "./routes";

const port = 3000;

const app = express();

app.use(express.json());

app.use("/api", router);

app.listen(port, () => {
	console.log(`Server running at on ${port}`);
});