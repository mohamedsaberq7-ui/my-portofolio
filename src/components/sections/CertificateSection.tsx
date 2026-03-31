import dbConnect from "@/lib/dbConnect";
import Certificate from "@/models/Certificate";
import type { CertificateItem, CertificateData } from "@/interface";

const defaultCertificate: CertificateData = {
  items: [
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
};

async function getCertificateData(): Promise<CertificateItem[]> {
  try {
    await dbConnect();
    const certificate = await Certificate.findOne().lean();
    if (certificate && certificate.items) {
      return JSON.parse(JSON.stringify(certificate.items));
    }
    return defaultCertificate.items;
  } catch (error) {
    console.error("Failed to fetch certificate data:", error);
    return defaultCertificate.items;
  }
}

export default async function CertificateSection() {
  const items = await getCertificateData();

  return (
    <section
      id="certifications"
      className="bg-[#fbfaf8] py-24 px-8 md:px-16 lg:px-32 flex justify-center"
    >
      <div className="w-full max-w-5xl">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-8 h-[1px] bg-gray-400"></div>
          <h2 className="text-4xl md:text-5xl font-serif text-[#4a4a4a]">
            Certifications
          </h2>
        </div>

        <div className="ml-0 md:ml-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((cert, idx) => (
            <div
              key={idx}
              className="bg-[#fcfcfb] rounded-xl p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col"
            >
              <div className="w-8 h-8 rounded-full bg-[#f2efe9] flex items-center justify-center mb-4">
                <span className="text-[#8eb19d] text-sm">☆</span>
              </div>
              <h3 className="font-serif text-[#4a4a4a] text-lg mb-1">
                {cert.title}
              </h3>
              <p className="text-[#8eb19d] text-[11px] mb-2">{cert.org}</p>
              <p className="text-gray-400 text-[11px] mt-auto">{cert.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
