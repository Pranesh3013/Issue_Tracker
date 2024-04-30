import express from "express";
import dotenv from "dotenv";
dotenv.config();
import routes from "./routes/index.js";
import { db } from "./config/mongoose.js";

const app = express();
const port = 3000;

const PORT = process.env.PORT || 8001;
console.log(PORT);

app.use(express.urlencoded({ extended: true }));
// app.use(express.json())

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("./assets"));

app.use("/", routes);

// await connectDB();
// app.listen(port, async (error)=>{
//   if(error){
//     console.log(`error in running the server :: ${error}`);
//     return;
//   }
//   console.log(`server is running on port :: ${port}`)
// })

app.listen(port, (err)=>{
  if(err){
      console.log(`Error in running the server : ${err}`)
  }
  console.log(`Server in listening on ${port}`);
})

