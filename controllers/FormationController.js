import prisma from "../utils/prismaClient.js";
export const store = async (req, res) => {
  try {
    const { formations } = req.body;
    const formation = await prisma.formation.createMany({ data: formations });
    res.status(201).json({ formations: formation });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const formation = async (req, res) => {
  try {
    const { userId } = req.params;
    const formation = await prisma.formation.findMany({
      where: { userId: parseInt(userId) },
    });
    res.status(200).json({ formation: formation });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const destroy = async (req, res) => {
  try {
    const { formationId } = req.params;
    await prisma.formation.delete({
      where: { id: parseInt(formationId) },
    });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateFormations = async (req, res) => {
  const { school, yearsStudy, degree } = req.body;
  try {
    const { id } = req.params;
    const FormationUpdate = await prisma.formation.update({
      where: { id: parseInt(id) },
      data: {
        school,
        yearsStudy,
        degree,
      },
    });
    res.status(200).json(FormationUpdate);
  } catch (error) {
    res.status(500).json(error);
  }
};
