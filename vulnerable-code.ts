// delibarately vulnerable express app
import express from "express";
import * as cp from "child_process";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.end("Hello World!");
});

// vulnerable endpoint, the param is executed as a shell command
app.get("/cmd/:cmd", (req, res) => {
  const cmd = req.params.cmd;
  const out = cp.execSync(cmd);
  res.end(out);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});