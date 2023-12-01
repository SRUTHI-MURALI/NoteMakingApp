import { model, Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
    },
    content: {
      type: String,
    },
    image: {
      type: String,
    },
    files: {
      type: String,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    tagged: {
      type: Boolean,
      default: false,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

noteSchema.index({ title: "text" });
noteSchema.index({ content: "text" });

export default model("note", noteSchema);
