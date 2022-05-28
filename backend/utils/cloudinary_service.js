var cloudinary = require("./cloudinary_config");

const blogStorage = (filename) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      filename,
      {
        folder: "blog_images",
      },
      (err, result) => {
        resolve({
          id: result.id,
          url: result.url,
        });
      }
    );
  });
};

module.exports = blogStorage;
