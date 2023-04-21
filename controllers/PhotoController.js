import prisma from "../utils/prismaClient.js";
import { uploadPhoto } from "../utils/cloudinary.js";

export const store = async (req, res) => {
  const { tempFilePath } = req.files.photo;
  const { userID } = req.body;
  console.log(tempFilePath);
  console.log(parseInt(userID));
  try {
    const imageData = await uploadPhoto(tempFilePath);
    console.log(imageData);
    const result = await prisma.photo.create({
      data: {
        url: imageData.url,
        ownerId: parseInt(userID),
      },
    });

    res.send(result);
  } catch (error) {
    res
      .status(503)
      .json({ message: "Problème de connexion: Service unavailable" });
  }
};

export const photos = async (req, res) => {
  try {
    const { userId } = req.params;
    const photos = await prisma.photo.findMany({
      where: { ownerId: parseInt(userId) },
    });
    res.status(200).json({ photos: photos });
  } catch (error) {
    res.status(500).send(error);
  }
};
