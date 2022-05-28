class CustomErrorHandler extends Error {
  constructor(status, msg) {
    super();
    this.status = status;
    this.message = msg;
  }
  static customError(
    message = {
      status: "fail",
      message: "Something went wrong",
    }
  ) {
    return new CustomErrorHandler(404, message);
  }
}

export default CustomErrorHandler;
