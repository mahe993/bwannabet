import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebase.js";
import db from "../db/models/index.js";
import { Op } from "sequelize";

export default class UsersController {
  constructor(userModel) {
    this.userModel = userModel;
  }

  // get all users that fit the criteria
  async searchUsers(req, res) {
    const { userId, query } = req.params;
    const users = await this.userModel.findAll({
      where: {
        [Op.or]: [
          { username: { [Op.like]: `%${query}%` } },
          { email: { [Op.like]: `%${query}%` } },
        ],
      },
    });

    if (users.length === 0) return res.json(users);

    const friendRequests = await db.friend.findAll({
      where: {
        [Op.or]: [
          {
            requestee: userId,
            requestor: { [Op.in]: users.map((user) => user.id) },
          },
          {
            requestor: userId,
            requestee: { [Op.in]: users.map((user) => user.id) },
          },
        ],
      },
    });
    res.json(friendRequests);
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
