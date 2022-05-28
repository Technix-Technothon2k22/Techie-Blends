import { ValidationError } from "joi";
import CustomErrorHandler from "./CustomErrorHandler";

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let data = {
    message: "internal server error !!!",
  };
  if (err instanceof ValidationError) {
    statusCode = 422 || 400;

    data = {
      status: "fail",
      message: err.message,
    };
  }

  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
    data = {
      status: "fail",
      message: err.message,
    };
  }
  return res.status(statusCode).json(data);
};

export default errorHandler;
