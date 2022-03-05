const { Users } = require("../models");

module.exports = {
  async getUser(req, res) {
    try {
      const usersData = await Users.find();
      res.status(200).json(usersData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getSingleUser(req, res) {
    try {
      const userData = await Users.findOne({ _id: req.params.id })
        .populate("thoughts")
        .populate("friends")
        .select("-__v");
      if (!userData) {
        res.status(404).json({ message: "No user found with this ID" });
        return;
      }
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async createUser(req, res) {
    try {
      const userData = await Users.create(req.body);
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async deleteUser(req, res) {
    try {
      const userData = await Users.findOneAndDelete({ _id: req.params.id });
      if (!userData) {
        res.status(404).json({ message: "No user found with this ID" });
        return;
      }
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async updateUser(req, res) {
    try {
      const userData = await Users.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      if (!userData) {
        res.status(404).json({ message: "No user found with this ID" });
        return;
      }
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async addNewFriend(req, res) {
    try {
      const userData = await Users.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { friends: req.params.friendId } },
        { new: true }
      )
        .populate("friends")
        .select("-__v");

      if (!userData) {
        res.status(404).json({ message: "No user found with this ID" });
        return;
      }

      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async deleteFriend(req, res) {
    try {
      const userData = await Users.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      )
        .populate("friends")
        .select("-__v");

      if (!userData) {
        res.status(404).json({ message: "No user found with this ID" });
        return;
      }

      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
