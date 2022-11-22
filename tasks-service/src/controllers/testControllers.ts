import { Request, Response } from "express";

let isDelayed: boolean = false;
const DELAY_MS = 10_000;

export const initDelay = async (req: Request, res: Response) => {
  isDelayed = true;
  res.end('delay inited!')
};

export const testDelay = async (req: Request, res: Response) => {
  if (!isDelayed) {
    return res.end('tested~');
  }
  setTimeout(() => {
    res.end("tested~");
  }, DELAY_MS);
};
