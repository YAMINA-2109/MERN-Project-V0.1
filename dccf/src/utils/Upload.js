import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverr");

  try {
    const res = await axios.post("https://api.cloudinary.com/v1_1/dng8v8c3c/image/upload", data);

    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};

const uploadServices = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "demandes");

  try {
    const res = await axios.post("https://api.cloudinary.com/v1_1/dng8v8c3c/image/upload", data);

    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};

export {
  upload,
  uploadServices,
};