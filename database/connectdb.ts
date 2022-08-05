import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URI_MONGO as string)
    console.log("\n✅ Connected to MongoDB")
} catch (error) {
    console.log("\n❌ Error connecting to MongoDB", error)
}

