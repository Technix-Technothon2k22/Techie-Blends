import Pod from "../models/podcast";
import { catchAsync, CustomErrorHandler } from "../utils/";
const podcastStorage = require("../utils/cloudinary_pod");
const formidable = require("formidable");

export const createPod = catchAsync((req, res, next) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.multiples = true;

  const listofImages = [];

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return next(new CustomErrorHandler("error in form parse", 404));
    }
    const blog = new Pod(fields);

    if (files.image) {
      if (files.image.size > 2097152) {
        return next(new CustomErrorHandler("File size too big", 400));
      }
      let imageArray = files.image;

      if (!Array.isArray(files.image)) {
        imageArray = [files.image];
      }

      for (var i = 0; i < imageArray.length; i++) {
        const result = await podcastStorage(imageArray[i].path);

        listofImages.push({
          url: result.url,
        });
      }

      blog.image = listofImages;
    }

    blog
      .save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        return next(
          new CustomErrorHandler(400, `Failed to create blogs ${err}`)
        );
      });
  });
});

export const getAllPods = catchAsync((req, res, next) => {
  Pod.find({})

    .then((cat) => {
      if (cat !== null) {
        res.status(200).json({
          status: "success",
          data: cat,
        });
      } else {
        return next(new CustomErrorHandler("No Podcasts found", 404));
      }
    })
    .catch((err) => {
      next(new CustomErrorHandler(err, 500));
    });
});

export const getPodById = catchAsync((req, res, next) => {
  const { podId } = req.params;
  if (!podId) {
    return res.status(400).json("please enter valid blof id");
  }
  Pod.findOne({ _id: podId })
    .populate("advisor")
    .then((blog) => {
      return res.status(200).json(blog);
    })
    .catch((err) => {
      return next(new CustomErrorHandler(err, 400));
    });
});
