const server = require("express")();
const cors = require('cors');
const port = 23456;

process.env.BASEDIR = process.cwd();

server.use(cors());
server.use("/api", require("./routes"));

server.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});
