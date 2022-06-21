import axios from "axios";

const imageUpload = (imageFile, callback) => {
    const formData = new FormData();

    formData.append("file", imageFile);
    formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    axios
        .post(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
        )
        .then(res => res.data.secure_url)
        .then(url => callback(url))
        .catch(err => new Error(err));
};

export default imageUpload;