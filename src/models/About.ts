import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAbout extends Document {
  paragraphs: string[];
}

const AboutSchema = new Schema<IAbout>(
  {
    paragraphs: {
      type: [String],
      required: true,
      default: [
        "I am an agricultural engineer with a deep commitment to sustainable land management and modern agricultural practices. My work bridges scientific research and real-world field application, ensuring that crops thrive while ecosystems are preserved.",
        "My professional goal is to contribute to food security through precision agriculture, smart irrigation systems, and soil health optimization. I am driven by a genuine passion for the land and a belief that technology and nature can coexist harmoniously.",
      ],
    },
  },
  {
    timestamps: true,
  },
);

const About: Model<IAbout> =
  mongoose.models.About || mongoose.model<IAbout>("About", AboutSchema);

export default About;
