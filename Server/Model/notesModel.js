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
         ref: "user"
         },
  },
  {
    timestamps: true,
  }
);

noteSchema.index({title: "text"});
noteSchema.index({content: "text"});

export default model("note", noteSchema);
