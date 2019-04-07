const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function(next) {
    // generate salt value
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(erro);
        }
        //use this salt value to hash password
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) {
                return next(erro);
            }
            this.password =hash;
            next();
        });
    });
    
});

UserSchema.methods.isPasswordMatch = function(plainPassword, hashed, callback) {
    bcrypt.compare(plainPassword, hashed, (err, isMatch) => {
        if (err) {
            next(err);
        }
        callback(null, isMatch);
    });
}
const User = mongoose.model('User', UserSchema);

module.exports = User;