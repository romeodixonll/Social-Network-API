const { Schema, model, Types } = require("mongoose");

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => {
          return new Types.ObjectId();
        },
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => {
          return `${new Date(date).getMonth() + 1}/${new Date(
            date
          ).getDate()}/${new Date(date).getFullYear()}`;
        },
      },
    },
    {
      toJSON: { getters: true, virtuals: true },
    }
  );
  
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(
          date
        ).getDate()}/${new Date(date).getFullYear()}`;
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);



thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thoughts = model("Thoughts", thoughtSchema);

module.exports = Thoughts;
