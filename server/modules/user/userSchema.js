const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  avatar: { type: String },
  image: { type: schema.Types.Mixed },
  date_of_birth: { type: Date,required:false },
//   email_verification_code: { type: String },
//   email_verified: { type: Boolean, required: true, default: false },
  updated_at: { type: Date },
  added_at: { type: Date, default: Date.now, required: true },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  is_active: { type: Boolean, required: true, default: false },
  register_method: { type: String, default: 'email', enum: ['email', 'google', 'facebook'] },
  description: { type: String },
  is_deleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  deleted_by: {
    type: schema.Types.ObjectId,
  },
  deleted_at: {
    type: Date,
  },
});
module.exports = User = mongoose.model('users', userSchema);
