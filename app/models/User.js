const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {type: String, require: true },
    email: {type: String, require: true, unique: true },
    password: {type:String, required: true },
    updated_at: Date,
    created_at: Date
});

UserSchema.pre('save', async function(next) {

    try {
        //encrypt password
        const salt = await bcrypt.genSalt(10);
        console.log(this.password);
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;
        
        //update timestamps
        this.updated_at = Date.now();
        if(!this.created_at) {
            this.created_at = Date.now();
        }
        next();
    } catch(err) {
        next(err);
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;