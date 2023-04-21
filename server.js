import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import prisma from "./utils/prismaClient.js";
import { uploadImage } from "./utils/cloudinary.js";
import User from "./routes/UserRouter.js";
import Area from "./routes/DomaineRoute.js";
import Skill from "./routes/SkillsRoute.js";
import Porfolio from "./routes/PortfolioRoute.js";
import Language from "./routes/LanguageRoute.js";
import Formation from "./routes/FormationRoute.js";
import Photo from "./routes/PhotoRoute.js";
import Post from "./routes/PostRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//Route for App Schema
app.use("/api", User);
app.use("/api", Area);
app.use("/api", Skill);
app.use("/api", Porfolio);
app.use("/api", Language);
app.use("/api", Formation);
app.use("/api", Photo);
app.use("/api", Post);

//Avatar
app.post("/avatar", async (req, res) => {
  const { tempFilePath } = req.files.avatar;
  const { userID } = req.body;
  try {
    const imageData = await uploadImage(tempFilePath);

    const result = await prisma.avatar.upsert({
      where: { ownerId: parseInt(userID) },
      update: {
        publicId: imageData.public_id,
        format: imageData.format,
        version: imageData.version.toString(),
        ownerId: parseInt(userID),
      },
      create: {
        publicId: imageData.public_id,
        format: imageData.format,
        version: imageData.version.toString(),
        ownerId: parseInt(userID),
      },
    });
    res.send(result);
  } catch (error) {
    res
      .status(503)
      .json({ message: "Problème de connexion: Service unavailable" });
  }
});

//Recrutor
app.post("/recrutors", async (req, res) => {
  try {
    const recrutor = await prisma.recrutor.create({ data: req.body });

    res.json(recrutor);
  } catch (error) {
    res.json(error);
  }
});

app.get("/recrutors", async (_, res) => {
  try {
    const recrutors = await prisma.recrutor.findMany();

    res.json(recrutors);
  } catch (error) {
    res.json(error);
  }
});

app.listen(7000, () => console.log("Server prisma running at port <7000 "));

// app.get('/feed', async (req, res) => {
//   const posts = await prisma.post.findMany({
//     where: { published: true },
//     include: { author: true },
//   })
//   res.json(posts)
// })

// app.post('/post', async (req, res) => {
//   const { title, content, authorEmail } = req.body
//   const post = await prisma.post.create({
//     data: {
//       title,
//       content,
//       published: false,
//       author: { connect: { email: authorEmail } },
//     },
//   })
//   res.json(post)
// })

// app.put("/publish/:id", async (req, res) => {
//   const { id } = req.params;
//   const post = await prisma.post.update({
//     where: { id },
//     data: { published: true },
//   });
//   res.json(post);
// });

// app.delete('/user/:id', async (req, res) => {
//   const { id } = req.params
//   const user = await prisma.user.delete({
//     where: {
//       id,
//     },
//   })
//   res.json(user)
// })

// app.post("/uploadfile", upload.single("myFile"), (req, res, next) => {
//   const file = req.file;
//   if (!file) {
//     const error = new Error("Please upload a file");
//     error.httpStatusCode = 400;
//     return next(error);
//   }
//   res.send(file);
// });

// app.post("/userPost", async (req, res) => {
//   const userAndPosts = await prisma.user.create({
//     data: {
//       name: "John Doe",
//       email: "johndoe@mail.com",
//       posts: {
//         create: [
//           { title: "Prisma Day 2020" }, // Populates authorId with user's id
//           { title: "How to write a Prisma schema" }, // Populates authorId with user's id
//         ],
//       },
//     },
//   });
//   res.send(userAndPosts);
// });
