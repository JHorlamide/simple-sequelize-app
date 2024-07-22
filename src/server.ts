import { app, port } from "./app";

async function init() {
  try {
    app.listen(port, () => {
      console.log(`Server listening on Port ${port}...`);
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}

init();