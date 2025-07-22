import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
  },
  mail: {
    type: String,
    default: "",
  },
  occupation: {
    type: String,
    default: "",
  },
  phone: {
    type: Number,
    default: "",
  },
  location:{
    type:String,
    default:"",
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
