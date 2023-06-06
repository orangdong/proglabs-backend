import config from "../../../../config/config.js";
import { format } from "util";
import { Storage } from "@google-cloud/storage";
const storage = new Storage();
const bucket = storage.bucket(config.bucket);

const storageUpload = (file) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;
    const folderName = "photos";

    const blob = bucket.file(
      `${folderName}/${
        new Date().getTime() + "-" + originalname.replace(/ /g, "_")
      }`
    );
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream
      .on("finish", () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
      })
      .on("error", () => {
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer);
  });

export default storageUpload;
