const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary=async(file,folder,height,quality  )=>{
    const options = {folder , resource_type:"auto"};

     if(height){
        options.height = height;
    }
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}






// exports.uploadVideoToCloudinary = async (file, folder) => {
//   try {
//     const options = {
//       folder,
//       resource_type: "video",
//     };

//     console.log("Uploading video:", file.tempFilePath);

//     const result = await cloudinary.uploader.upload(
//       file.tempFilePath,
//       options
//     );

//     console.log("Video uploaded successfully");

//     return result;
//   } catch (error) {
//     console.log("VIDEO UPLOAD ERROR:", error);
//     throw error;
//   }
// };


