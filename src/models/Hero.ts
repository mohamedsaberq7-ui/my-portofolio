import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHero extends Document {
  jobTitle: string;
  firstName: string;
  lastName: string;
  bio: string;
  cvUrl: string;
  linkedinUrl: string;
  profileImage: string;
}

const HeroSchema = new Schema<IHero>(
  {
    jobTitle: {
      type: String,
      required: true,
      default: "Agricultural Engineer",
    },
    firstName: {
      type: String,
      required: true,
      default: "Your",
    },
    lastName: {
      type: String,
      required: true,
      default: "Full Name",
    },
    bio: {
      type: String,
      required: true,
      default:
        "Dedicated agricultural engineer with a passion for sustainable farming, modern agri-tech, and bridging the gap between science and field practice. Committed to driving food security and rural development.",
    },
    cvUrl: {
      type: String,
      default: "#",
    },
    linkedinUrl: {
      type: String,
      default: "#",
    },
    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Hero: Model<IHero> =
  mongoose.models.Hero || mongoose.model<IHero>("Hero", HeroSchema);

export default Hero;
