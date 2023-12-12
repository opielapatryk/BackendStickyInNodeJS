const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friendsRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isPrivate: { type: Boolean, default: false },
    askBeforeStick: { type: Boolean, default: false },
    stickersOnBoard: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sticker' }],
    pending: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sticker' }],
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true,minlength: 8, },
    password2: { type: String, required: true,minlength: 8, },
});

userSchema.pre('save', async function (next) {
    const user = this;

    // Hash password and password2 only if they are modified
    if (user.isModified('password') || user.isModified('password2')) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);
        const hashPassword2 = await bcrypt.hash(user.password2, salt);

        user.password = hashPassword;
        user.password2 = hashPassword2;
    }

    // Check if password and password2 are the same
    if (user.isModified('password') && user.isModified('password2') && user.password !== user.password2) {
        return next(new Error('Password and password2 do not match'));
    }

    next();
  });

const User = mongoose.model('User', userSchema);

module.exports = User;
