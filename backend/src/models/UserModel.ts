import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";


interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  createdAt?: Date;
  updatedAt?: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}


export type UserDocument = IUser;

const userSchema = new mongoose.Schema<IUser>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: [true, `Please enter your email`],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, `Please enter your password`],
    trim: true,
  },
}, {timestamps:true});

//pre save hook for saving password
userSchema.pre("save", async function (this: IUser, next: (err?: any) => void) {
  //calls the function only when the password is modified or created
  if(!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

//comparing password
userSchema.methods.matchPassword = async function (this: IUser, enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
}

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
