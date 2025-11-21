import mongoose, { Document, Schema, Model, Types } from "mongoose";

// nterface for TypeScript
interface ITodo extends Document {
  content: string;
  isCompleted: boolean;
  user: Types.ObjectId; // The ID of the user who owns this todo
  createdAt?: Date;
  updatedAt?: Date;
}


const todoSchema = new Schema<ITodo>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1, 
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
  },
  { timestamps: true }
);

export const Todo: Model<ITodo> = mongoose.model<ITodo>("Todo", todoSchema);
