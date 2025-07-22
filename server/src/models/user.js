import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String, // String is shorthand for {type: String}
  phoneNumber: String,
  role: { type:String,
          enum: ['user', 'admin'],
          default: 'user'
  },
  password: String,
  isApproved: { type: Boolean, default: false },
  // location: String

});
const User = mongoose.model('User', userSchema);
export default User;