/** This is the server you created in server.js.
 * If you decided to export a function that creates a server, you will have to modify this
 * */
const { setupServer } = require("./server");
const config = require("../config");

const server = setupServer();

server.listen(config.express.port, () => {
  console.log(`Server up and listening on port ${config.express.port}`);
});
