import Blog from "../models/blog";
import { catchAsync, CustomErrorHandler } from "../utils/";
const blogStorage = require("../utils/cloudinary_service");
const formidable = require("formidable");

export const createBlog = catchAsync((req, res, next) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.multiples = true;

  const listofImages = [];

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return next(new CustomErrorHandler("error in form parse", 404));
    }
    const blog = new Blog(fields);

    if (files.image) {
      if (files.image.size > 2097152) {
        return next(new CustomErrorHandler("File size too big", 400));
      }
      let imageArray = files.image;

      if (!Array.isArray(files.image)) {
        imageArray = [files.image];
      }

      for (var i = 0; i < imageArray.length; i++) {
        const result = await blogStorage(imageArray[i].path);

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
        return next(new CustomErrorHandler(400, `Failed to create blogs ${err}`));
      });
  });
});

export const getAllBlogs = catchAsync((req, res, next) => {
  Blog.find({})

    .then((cat) => {
      if (cat !== null) {
        res.status(200).json({
          status: "success",
          data: cat,
        });
      } else {
        return next(new CustomErrorHandler("No BLogs found", 404));
      }
    })
    .catch((err) => {
      next(new CustomErrorHandler(err, 500));
    });
});

export const getAllFilteredBlogs = catchAsync((req, res, next) => {
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let findArgs = {};
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }
  Blog.find(findArgs)
    .populate("advisor")
    .exec((err, products) => {
      if (err) {
        return next(new CustomErrorHandler(400, "no blogs found", 400));
      }
      res.status(200).json(products);
    });
});

export const getBlogById = catchAsync((req, res, next) => {
  const { blogId } = req.params;

  if (!blogId) {
    return res.status(400).json("please enter valid blof id");
  }
  Blog.findOne({ _id: blogId })
    .populate("advisor")
    .populate("feedbacks.user")
    .then((blog) => {
      return res.status(200).json(blog);
    })
    .catch((err) => {
      return next(new CustomErrorHandler(err, 400));
    });
});

export const ReactToBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { operation, uid } = req.body;

  Blog.findOne({ _id: id }).then((blog) => {
    var newArray, newArray2;

    if (blog.likes.length !== 0) {
      newArray = blog.likes.filter(function (el) {
        return el.id === uid;
      });
    }
    if (blog.dislikes.length !== 0) {
      newArray2 = blog.dislikes.filter(function (el) {
        return el.id === uid;
      });
    }
    if (newArray === undefined && newArray2 === undefined) {
      if (operation === "like") {
        console.log(blog.likes);
        blog.likes.push({ id: uid });
      } else {
        blog.dislikes.push({ id: uid });
      }
    } else if (newArray !== undefined && newArray2 === undefined) {
      if (operation === "like") {
        console.log("already liked");
      } else {
        blog.dislikes.push({ id: uid });
        const indexFound = blog.likes.findIndex((item) => {
          return item.id.toString() === uid;
        });
        if (indexFound !== -1) {
          blog.likes.splice(indexFound, 1);
        }
      }
    } else if (newArray === undefined && newArray2 !== undefined) {
      if (operation === "like") {
        blog.likes.push({ id: uid });
        const indexFound = blog.dislikes.findIndex((item) => {
          return item.id.toString() === uid;
        });
        if (indexFound !== -1) {
          blog.dislikes.splice(indexFound, 1);
        }
      } else {
        console.log("already disliked");
      }
    }
    blog.save();
    return res.status(200).json({
      status: "success",
      message: `blog ${operation}d successfully`,
    });
  });
});

export const createFeedback = catchAsync((req, res, next) => {
  const { userId, blogId, feedback } = req.body;

  if (!userId || !blogId || !feedback) {
    return res.status(400).json("please provide all fields");
  }

  Blog.findOne({ _id: blogId })
    .then((play) => {
      play.feedbacks.push({
        user: userId,

        comment: feedback,
      });

      play.save();
      return res.status(200).json(play);
    })
    .catch((err) => {
      return next(new CustomErrorHandler(err, 400));
    });
});

export const getFeedbackByBlog = catchAsync((req, res, next) => {
  const { blogId } = req.params;

  if (!blogId) {
    return res.status(400).json("please provide blog id in params");
  }
  Blog.findOne({ _id: blogId })
    .populate("feedbacks.user")
    .then((play) => {
      return res.status(200).json(play.feedbacks);
    })
    .catch((err) => {
      return next(new CustomErrorHandler(err, 400));
    });
});
