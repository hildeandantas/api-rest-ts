import "dotenv/config";
import App from "./app";

const PORT = process.env.PORT;

const app = new App().app;

app.listen(PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
