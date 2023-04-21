import prisma from "../utils/prismaClient.js";
export const store = async (req, res) => {
  try {
    const { skills } = req.body;
    const skill = await prisma.skills.createMany({ data: skills });
    res.status(201).json({ skills: skill });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const skill = async (req, res) => {
  try {
    const { userId } = req.params;
    const skill = await prisma.skills.findMany({
      where: { userId: parseInt(userId) },
    });
    res.status(200).json({ skill: skill });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const destroy = async (req, res) => {
  try {
    const { skillId } = req.params;
    await prisma.skills.delete({
      where: { id: parseInt(skillId) },
    });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateSkills = async (req, res) => {
  const { description, tools } = req.body;
  try {
    const { id } = req.params;
    const SkillUpdate = await prisma.skills.update({
      where: { id: parseInt(id) },
      data: {
        description,
        tools,
      },
    });
    res.status(200).json(SkillUpdate);
  } catch (error) {
    res.status(500).json(error);
  }
};
