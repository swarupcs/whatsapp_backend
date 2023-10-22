import mongoose from "mongoose";
import validator from "validator";


const userSceham = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email addres"],
        unique: [true,"This email address already exist"],
        lowercase:true,
        validate: [validator.isEmail, "Please provide a valid email address"]
    },
    picture: {
        type: String,
        default:  "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png",
    },
    status: {
        type: String,
        default: "Hey there ! I am using whatsapp",
    },
    password: {
        type: String,
        required:[true, "Please provide your password"],
        minLength: [
            6," Please make sure password is atleat 6 characters long",
        ],
        maxLength: [
            128," Please make sure password is less than 128 characters long",
        ],
    },
}, {
    collection: "users",
    timestamps: true,
});

const UserModel = mongoose.models.UserModel || mongoose.model('userModel', userSceham);

export default UserModel;