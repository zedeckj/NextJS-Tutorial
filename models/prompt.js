import {Schema, model, models} from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",    
  },
  prompt : {
    type : String,
    required : [true, "Prompt is required"],
  },
  tag : {
    type : String,
    required : [true, "Tag is required"],
    match : [/#.{1,39}/, "Tag is invalid, it should begin with a # and have between 2-40 characters"]
  }
});

const Prompt = models.prompt || model("prompt", PromptSchema);

export default Prompt;
