import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExperienceItem {
  jobTitle: string;
  company: string;
  period: string;
  description: string;
}

export interface IExperience extends Document {
  items: IExperienceItem[];
}

const ExperienceSchema = new Schema<IExperience>(
  {
    items: {
      type: [
        {
          jobTitle: { type: String, required: true },
          company: { type: String, required: true },
          period: { type: String, required: true },
          description: { type: String, required: true },
        },
      ],
      default: [
        {
          jobTitle: "Senior Agricultural Engineer",
          company: "Green Horizons Agricultural Co.",
          period: "2021 — Present",
          description:
            "Led a team of field engineers to implement precision irrigation systems across 2000+ hectares. Developed crop rotation schedules that improved yield by 18% while reducing water consumption. Conducted soil analysis and provided data-driven recommendations for fertilization and pest management.",
        },
        {
          jobTitle: "Junior Agricultural Engineer",
          company: "AgroTech Solutions Ltd.",
          period: "2018 — 2021",
          description:
            "Supported the design and installation of drip irrigation systems for smallholder farmers. Collaborated with agronomists to analyze satellite imagery for crop health monitoring. Prepared technical reports and presented findings to stakeholders and government bodies.",
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

const Experience: Model<IExperience> =
  mongoose.models.Experience ||
  mongoose.model<IExperience>("Experience", ExperienceSchema);

export default Experience;
