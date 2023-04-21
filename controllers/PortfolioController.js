import prisma from "../utils/prismaClient.js";
export const store = async (req, res) => {
  try {
    const { portfolios } = req.body;
    const portfolio = await prisma.portfolio.createMany({ data: portfolios });
    res.status(201).json({ portfolios: portfolio });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const portfolio = async (req, res) => {
  try {
    const { userId } = req.params;
    const portfolio = await prisma.portfolio.findMany({
      where: { userId: parseInt(userId) },
    });
    res.status(200).json({ portfolio: portfolio });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const destroy = async (req, res) => {
  try {
    const { portfolioId } = req.params;
    await prisma.portfolio.delete({
      where: { id: parseInt(portfolioId) },
    });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updatePortfolio = async (req, res) => {
  const { description, link, gitrepo } = req.body;
  try {
    const { id } = req.params;
    const PortfolioUpdate = await prisma.portfolio.update({
      where: { id: parseInt(id) },
      data: {
        description,
        link,
        gitrepo,
      },
    });
    res.status(200).json(PortfolioUpdate);
  } catch (error) {
    res.status(500).json(error);
  }
};
