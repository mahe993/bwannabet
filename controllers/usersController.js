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
        [Op.and]: [
          {
            [Op.or]: [
              { username: { [Op.like]: `%${query}%` } },
              { email: { [Op.like]: `%${query}%` } },
            ],
          },
          { id: { [Op.ne]: userId } },
        ],
      },
    });

    // if no such user exists, return blank
    if (users.length === 0) return res.json(users);

    // search for connection for all persons that match query
    const friends = await db.friend.findAll({
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

    // get the user details of the friend
    const outputPromisesArr = friends.map(async (connection) => {
      const friendId =
        connection.requestee === userId
          ? connection.requestor
          : connection.requestee;
      const idx = users.findIndex((user) => user.id === friendId);
      // if
      if (idx === -1) {
      }
      const friendDetails = await this.userModel.findByPk(friendId);
      return { ...connection.dataValues, ...friendDetails.dataValues };
    });
    const output = await Promise.all(outputPromisesArr);

    // mutate output to be an object seperated by status keys
    const outputByStatus = output.reduce((acc, curr) => {
      if (acc[curr.status]) {
        acc[curr.status].push(curr);
      } else {
        acc[curr.status] = [curr];
      }
      return acc;
    }, {});

    // further mutate such that the Pending key holds values further seperated by requestee/requestor
    if (outputByStatus["pending"]) {
      outputByStatus.pending = outputByStatus.pending.reduce(
        (innerAcc, innerCurr) => {
          if (innerCurr.requestee === userId) {
            if (innerAcc.requestee) {
              innerAcc.requestee.push(innerCurr);
            } else {
              innerAcc.requestee = [innerCurr];
            }
          } else {
            if (innerAcc.requestor) {
              innerAcc.requestor.push(innerCurr);
            } else {
              innerAcc.requestor = [innerCurr];
            }
          }

          return innerAcc;
        },
        {}
      );
    }

    // finalize output to include users that are not friends
    const strangers = users.filter((user) => {
      const friendId = friends.find((friend) => {
        return friend.requestee === user.id || friend.requestor === user.id;
      });
      return !friendId;
    });
    outputByStatus["strangers"] = strangers;

    res.json(outputByStatus);
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
