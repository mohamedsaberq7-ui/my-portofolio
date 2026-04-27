import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISkillItem {
  name: string;
  category: string;
}

export interface ISkill extends Document {
  items: ISkillItem[];
}

const SkillSchema = new Schema<ISkill>(
  {
    items: {
      type: [
        {
          name: { type: String, required: true },
          category: { type: String, required: true },
        },
      ],
      default: [
        { name: "Soil Analysis", category: "Technical Skills" },
        { name: "Precision Agriculture", category: "Technical Skills" },
        { name: "Irrigation Systems", category: "Technical Skills" },
        { name: "GIS & Remote Sensing", category: "Technical Skills" },
        { name: "Crop Management", category: "Domain Expertise" },
        { name: "Pest & Disease Control", category: "Domain Expertise" },
        { name: "Sustainable Farming", category: "Domain Expertise" },
        { name: "Data Analysis", category: "Tools & Software" },
        { name: "AutoCAD", category: "Tools & Software" },
        { name: "MS Office Suite", category: "Tools & Software" },
      ],
    },
  },
  {
    timestamps: true,
  },
);

const Skill: Model<ISkill> =
  mongoose.models.Skill ||
  mongoose.model<ISkill>("Skill", SkillSchema);

export default Skill;
