const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,

  },
  lastName: {
    type: String,
   
  },
  email: {
    type: String,
   
    unique: true,
  },
  password: String,
  profileImage:{
    type:String
}
    
   
  ,
});

const User = mongoose.model('users',UserSchema);
module.exports = User;
