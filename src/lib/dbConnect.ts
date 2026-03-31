import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    // التحقق من وجود رابط قاعدة البيانات أولاً
    if (!uri) {
      throw new Error("Please define the MONGODB_URI environment variable");
    }

    // محاولة الاتصال بقاعدة البيانات
    await mongoose.connect(uri);
  } catch (error) {
    // لو حصل مشكلة في الاتصال هيطبعلك الخطأ
    console.log(error);
  }
};

export default connectDB;
