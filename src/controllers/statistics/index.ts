import { Request, Response } from "express";
import { Statistic } from "../../models/statistic";

export const getStatistics = async (req: Request, res: Response) => {
  let statData = await Statistic.find();

  res.status(200).send({ payload: statData, message: "Got Statistics Data" });
}