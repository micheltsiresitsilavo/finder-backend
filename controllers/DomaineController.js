import prisma from "../utils/prismaClient.js";
export const store = async (req, res) => {
  try {
    const { domaines } = req.body;
    const domaine = await prisma.area.createMany({ data: domaines });
    res.status(201).json({ area: domaine });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const area = async (req, res) => {
  try {
    const { userId } = req.params;
    const area = await prisma.area.findMany({
      where: { userId: parseInt(userId) },
    });
    res.status(200).json({ area: area });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const destroy = async (req, res) => {
  try {
    const { areaId } = req.params;
    await prisma.area.delete({
      where: { id: parseInt(areaId) },
    });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateArea = async (req, res) => {
  const { area, experience } = req.body;
  try {
    const { id } = req.params;
    const areaUpdate = await prisma.area.update({
      where: { id: parseInt(id) },
      data: {
        area,
        experience,
      },
    });
    res.status(200).json(areaUpdate);
  } catch (error) {
    res.status(500).json(error);
  }
};
