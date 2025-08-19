import mongoose from "mongoose";
export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://saravanan06:saravanan06@cluster0.gfons8x.mongodb.net/food-del').then(()=> console.log("DB Connected"));
}