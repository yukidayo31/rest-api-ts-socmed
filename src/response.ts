import { Response } from "express";

const response = (
  statusCode: Number,
  data: any,
  message: String,
  res: Response
) => {
  res.json({
    statusCode: statusCode,
    data: data,
    message: message,
  });
};

export default response;
