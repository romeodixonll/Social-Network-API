const { Thought, Users } = require("../models");

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughtsData = await Thought.find()
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v");
      res.status(200).json(thoughtsData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thoughtsData = await Thought.findOne({ _id: req.params.id })
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v");
      if (!thoughtsData) {
        res.status(404).json({
          message: "No Thoughts found with this ID",
        });
      }
      res.status(200).json(thoughtsData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async updateThought(req, res) {
    try {
      const thoughtsData = await Thought.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body,
        { new: true, runValidators: true }
      )
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v");
      if (!thoughtsData) {
        res.status(404).json({ message: "No thoughs found with this id" });
      }
      res.status(200).json(thoughtsData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async deleteThought(req, res) {
    try {
      const thoughtsData = await Thought.findOneAndDelete({
        _id: req.params.id,
      });
      if (!thoughtsData) {
        res.status(404).json({ message: "No Thoughts found with this ID" });
      }
      res.status(200).json(thoughtsData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async createReaction(req, res) {
    try {
      const thoughtsData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      )
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v");

      if (!thoughtsData) {
        res.status(404).json({ message: "No thoughts found with this ID" });
      }
      res.status(200).json(thoughtsData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async removeReaction(req, res) {
    try {
      const thoughtsData = await Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!thoughtsData) {
        res.status(404).json({ message: "No thoughts found with this ID" });
      }
      res.status(200).json(thoughtsData)
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async createThoughts(req, res) {
    try {
      const thoughtsData = await Thought.create(req.body);
      await Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { thoughts: thoughtsData._id } },
        { new: true }
      );
      console.log(thoughtsData)
      res.status(200).json(thoughtsData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
