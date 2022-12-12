import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebase.js";

export default class UsersController {
  constructor(userModel) {
    this.userModel = userModel;
  }

  // postProfilePic helper function to upload to firebase
  async firebaseProfilePictureUpload(userId) {
    const storageFilePath = `profilepics/${userId}/profilepic`;
    const storageRef = ref(storage, storageFilePath);
    const uploadTask = await uploadBytesResumable(storageRef, req.file.buffer, {
      contentType: "image/jpg",
    });
    return uploadTask;
  }

  // Post to firebase court pictures and update courts table with url
  async postProfilePic(req, res) {
    const { userId } = req.params;
    try {
      // upload to firebase
      const uploadTask = await this.firebaseProfilePictureUpload(userId);
      // get picture downloadurl and firebasepath as an object
      const pictureUrl = await getDownloadURL(uploadTask.ref);
      const profilePicData = {
        firebasePath: uploadTask.metadata.fullPath,
        downloadUrl: pictureUrl,
      };
      // update users table with profile pic data object
      const updateUsers = await this.userModel.update(
        { profilePicture: profilePicData },
        { where: { id: userId }, returning: true }
      );
      return res.json(updateUsers[1][0]);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
