import mongoose from "mongoose";

interface UserAttr {
    email: string,
    password: string
};

interface UserModel extends mongoose.Model<UserDoc> {
    build(attr: UserAttr): UserDoc;
}

interface UserDoc extends mongoose.Document {
    email: string,
    password: string,
    isAdmin: boolean
};

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

userSchema.statics.build = (attr: UserAttr) => {
    return new User(attr);
}

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

const user = User.build({
    email: 'something',
    password: 'password'
});



export {User};


