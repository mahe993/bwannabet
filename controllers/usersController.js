import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebase.js";
import db from "../db/models/index.js";

export default class UsersController {
  constructor(userModel) {
    this.userModel = userModel;
  }

  // find or create specific user
  async getUser(req, res) {
    const { userId, email } = req.params;
    try {
      const [user, created] = await this.userModel.findOrCreate({
        where: { id: userId },
        defaults: { email: email },
      });
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // update user details
  async updateDetails(req, res) {
    const { userId } = req.params;
    try {
      const transaction = await db.sequelize.transaction(async (t) => {
        const user = await this.userModel.findByPk(userId, { transaction: t });
        const update = await user.update(
          {
            username: req.body.username,
            contactNumber: req.body.contactNumber,
          },
          {
            transaction: t,
          }
        );
        return update;
      });
      return res.json(transaction);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // postProfilePic helper function to upload to firebase
  async firebaseProfilePictureUpload(userId, file) {
    const storageFilePath = `profilepics/${userId}/profilepic`;
    const storageRef = ref(storage, storageFilePath);
    const uploadTask = await uploadBytesResumable(storageRef, file, {
      contentType: "image/jpg",
    });
    return uploadTask;
  }

  // Post to firebase court pictures and update courts table with url
  async postProfilePic(req, res) {
    const { userId } = req.params;
    try {
      console.log("start");
      // upload to firebase
      const uploadTask = await this.firebaseProfilePictureUpload(
        userId,
        req.file.buffer
      );
      // get picture downloadurl and firebasepath as an object
      const pictureUrl = await getDownloadURL(uploadTask.ref);
      const profilePicData = {
        firebasePath: uploadTask.metadata.fullPath,
        downloadUrl: pictureUrl,
      };
      console.log("success");
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
