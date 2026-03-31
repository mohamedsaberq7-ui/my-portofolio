import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // محاولة الاتصال بقاعدة البيانات
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    // لو حصل مشكلة في الاتصال هيطبعلك الخطأ
    console.log(error);
  }
};

export default connectDB;
