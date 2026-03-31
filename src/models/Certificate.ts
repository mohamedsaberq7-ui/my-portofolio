import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICertificateItem {
  title: string;
  org: string;
  year: string;
}

export interface ICertificate extends Document {
  items: ICertificateItem[];
}

const CertificateSchema = new Schema<ICertificate>(
  {
    items: {
      type: [
        {
          title: { type: String, required: true },
          org: { type: String, required: true },
          year: { type: String, required: true },
        },
      ],
      default: [
        {
          title: "Certified Crop Advisor (CCA)",
          org: "American Society of Agronomy",
          year: "2022",
        },
        {
          title: "Precision Agriculture Specialist",
          org: "International Society of Precision Agriculture",
          year: "2021",
        },
        {
          title: "Irrigation Design Professional",
          org: "Irrigation Association",
          year: "2020",
        },
        {
          title: "Sustainable Agriculture Certification",
          org: "FAO / United Nations",
          year: "2020",
        },
        {
          title: "GIS for Agriculture",
          org: "Esri — ArcGIS Training",
          year: "2019",
        },
        {
          title: "Soil Health & Fertility Management",
          org: "Soil Science Society of America",
          year: "2018",
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

const Certificate: Model<ICertificate> =
  mongoose.models.Certificate ||
  mongoose.model<ICertificate>("Certificate", CertificateSchema);

export default Certificate;
