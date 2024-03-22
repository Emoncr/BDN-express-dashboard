import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Handling CORS origin
if (process.env.NODE_ENV === "local") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: "*",
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    })
  );
}

// Import routes
import NewsRouter from "./routes/news.route.js";
import { errorMiddleware } from "./middleware/ErrorMiddleware.js";

// Routes
app.use("/api/news", NewsRouter);

// Using Error Middleware
app.use(errorMiddleware);

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
