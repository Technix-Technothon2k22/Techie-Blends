var cloudinary = require("./cloudinary_config");

const podcastStorage = (filename) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      filename,
      {
        folder: "pod_images",
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

module.exports = podcastStorage;
