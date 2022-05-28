//auth
import { catchAsync, sendEmail, CustomErrorHandler } from "../utils";
import {
  User,
  OtpToken as otpToken,
  AccessToken as accessToken,
  UserDetails,
  Advisor,
  Chat,
} from "../models";
import OtpService from "../services/OtpService";
import joi from "joi";
import { message } from "../services/OtpService";

export const Signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  console.log(req.body);

  if (!email || !password || !name) {
    return res.status(400).json({
      status: "fail",
      message: "Provide all fields",
    });
  }

  const schema = joi.object({
    name: joi.string().min(3).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    role: joi.string().valid("user", "advisor").required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(403).json({
      status: "fail",
      message: "Invalid Input",
    });
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({
      status: "fail",
      message: "User already exist",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  if (role === "user") {
    const userDetails = await UserDetails.create({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } else {
    const advisor = await Advisor.create({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  }

  const otp = OtpService.generateOtp();
  sendEmail(email, "OTP for Signup", message(otp));

  try {
    await otpToken.create({ _id: user._id, otpToken: otp });
  } catch (err) {
    return next(err);
  }

  res.status(201).json({
    status: "success",
    message: "OTP sent to your email",
  });
});

export const VerifyUser = catchAsync(async (req, res, next) => {
  const { otp, email } = req.body;
  if (!otp || !email) {
    return res.status(400).json({
      status: "fail",
      message: "Provide all fields",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(403).json({
      status: "fail",
      message: "User does not exist",
    });
  }

  let Token;
  Token = await otpToken.findOne({
    $and: [{ _id: user._id }, { otpToken: otp }],
  });

  if (!Token) {
    return res.status(400).json({
      status: "fail",
      message: "invalid otp",
    });
  }
  user.verified = true;
  await user.save();
  //

  const token = user.generateToken();

  await accessToken.deleteOne({ _id: user._id });
  await accessToken.create({ _id: user._id, accessToken: token });

  res.status(200).json({
    status: "success",
    token,
  });
});

export const Login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Provide all fields",
    });
  }

  var user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(403).json({
      status: "fail",
      message: "We couldn't find you. Please signup to continue",
    });
  }

  if (!user.verified) {
    return next(new CustomErrorHandler(400, "Verify your account first"));
  }

  const isMatch = await user.validatePassword(password);

  if (!isMatch) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid Credentials",
    });
  }
  var sendadvisor;
  user.password = undefined;
  if (user.role === "advisor") {
    const advisor = await Advisor.findOne(
      { email },
      {
        _v: 0,
        _id: 0,
        email: 0,
        name: 0,
      }
    );
    sendadvisor = advisor;
  }
  const token = user.generateToken();

  await accessToken.deleteOne({ _id: user._id });
  await accessToken.create({ _id: user._id, accessToken: token });
  if (user.role === "advisor") {
    res.status(200).json({
      status: "success",
      token,
      sendadvisor,
    });
  }
  res.status(200).json({
    status: "success",
    token,
  });
});

export const Logout = catchAsync(async (req, res, next) => {
  const access_token = req.headers.authorization.split(" ")[1];

  try {
    await accessToken.deleteOne({ accessToken: access_token });
  } catch (err) {
    return next(new CustomErrorHandler(400, "Invalid Token"));
  }
  res.json({ status: "success", message: "successfully logout" });
});

export const addDetails = catchAsync(async (req, res, next) => {
  const { id, role } = req.user;

  if (role == "user") {
    const { age, gender, state, healthIssues, categories } = req.body;

    const user = await UserDetails.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          age,
          gender,
          state,
          healthIssues,
          categories,
        },
      },
      {
        new: true,
      }
    );

    if (!user) {
      return next(new CustomErrorHandler(404, "User Not found"));
    }

    let group;

    healthIssues.map(
      async (category) => {
        group = await Chat.findOneAndUpdate(
          {
            chatName: category,
          },
          {
            $push: {
              users: {
                _id: id,
              },
            },
          }
        );
      },
      {
        new: true,
      }
    );

    let setdetails = await User.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          details: true,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      status: "success",
      message: "User details added",
    });
  } else {
    const { areaOfExpertise, qualification, age, gender, state, district, verified } = req.body;

    const advisor = await Advisor.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          areaOfExpertise,
          qualification,
          age,
          gender,
          state,
          district,
          verified,
        },
      },
      {
        new: true,
      }
    );

    if (!advisor) {
      return next(new CustomErrorHandler(404, "User Not found"));
    }
    try {
      const message = () => {
        return `
              Hey admin, psychiatrist ${advisor.name} has applied for psychiatrist role with id ${advisor._id} and qualification ${advisor.qualification}
              .
              `;
      };
      await sendEmail("aggarwalnilesh6@gmail.com", "Psychiatrist Form Recieved", message);
    } catch (err) {
      return next(new CustomErrorHandler(`Error in sending mail`, 400));
    }
    return res.status(200).json({
      status: "success",
      message: "Advisor details added",
    });
  }
});

export const getAdvisorFormById = catchAsync(async (req, res, next) => {
  console.log(req.params.advisorId);
  Advisor.findById(req.params.advisorId).exec((err, artist) => {
    if (err || !artist) {
      return next(new CustomErrorHandler("Advisor Form not found", 404));
    }
    req.form = artist;
    next();
  });
});

export const approveAdvisor = catchAsync(async (req, res, next) => {
  const newadvisor = req.form;
  console.log(newadvisor);
  newadvisor.verified = req.body.status;
  const querycheck = { _id: req.params.advisorId };
  Advisor.findOneAndUpdate(querycheck, newadvisor, {
    new: true,
    useFindAndModify: false,
  }).then(async (form, err) => {
    if (err) {
      return next(new CustomErrorHandler("Error updating Advisor form status", 404));
    }
    if (req.body.status === "rejected") {
      try {
        const message = () => {
          return `
                Hey ${form.name},Sorry your form has been  rejected by us.Still you can share stories for people.
                .
                `;
        };
        await sendEmail(form.email, "Psychiatrist Form Application", message);
        const [changeUserRole, deleteAdvisor] = await Promise.all([
          User.findByIdAndUpdate(
            {
              _id: req.params.advisorId,
            },
            {
              $set: {
                role: "user",
              },
            },
            {
              new: true,
            }
          ),
          Advisor.findByIdAndDelete({ _id: req.params.advisorId }),
        ]);
      } catch (err) {
        return next(new CustomErrorHandler(`Error in sending mail`, 400));
      }
    } else {
      try {
        const message = () => {
          return `
                Hey ${form.name}, Your form has been  accepted.You can post blogs and poscasts and provide them knowledge through chat groups for welfare of people.
                .
                `;
        };
        await sendEmail(form.email, "Psychiatrist Form Application", message);

        const advisor = await Advisor.findById(req.params.advisorId);

        const categories = advisor.areaOfExpertise;
        let group;

        categories.map(
          async (category) => {
            group = await Chat.findOneAndUpdate(
              {
                chatName: category,
              },
              {
                $push: {
                  users: {
                    _id: advisor._id,
                  },
                },
              }
            );
          },
          {
            new: true,
          }
        );
      } catch (err) {
        return next(new CustomErrorHandler(`Error in sending mail`, 400));
      }
    }

    return res.status(200).json(form);
  });
});

export const isAdvisorVerified = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const user = await Advisor.findById({
    _id: id,
  });
  console.log(user);
  if (user.verified === "verified") {
    return res.status(200).json({
      status: "success",
      message: "advisor is verified",
    });
  }

  res.status(200).json({
    status: "fail",
    message: "advisor is not  verified",
  });
});
