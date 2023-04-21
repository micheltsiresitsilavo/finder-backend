import prisma from "../utils/prismaClient.js";
export const store = async (req, res) => {
  try {
    const { languages } = req.body;
    const language = await prisma.langKnowledge.createMany({ data: languages });
    res.status(201).json({ languages: language });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const language = async (req, res) => {
  try {
    const { userId } = req.params;
    const language = await prisma.langKnowledge.findMany({
      where: { userId: parseInt(userId) },
    });
    res.status(200).json({ language: language });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const destroy = async (req, res) => {
  try {
    const { languageId } = req.params;
    await prisma.langKnowledge.delete({
      where: { id: parseInt(languageId) },
    });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateLanguages = async (req, res) => {
  const { language, level } = req.body;
  try {
    const { id } = req.params;
    const LanguageUpdate = await prisma.langKnowledge.update({
      where: { id: parseInt(id) },
      data: {
        language,
        level,
      },
    });
    res.status(200).json(LanguageUpdate);
  } catch (error) {
    res.status(500).json(error);
  }
};
