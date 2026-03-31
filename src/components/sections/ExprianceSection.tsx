import dbConnect from "@/lib/dbConnect";
import Experience from "@/models/Experience";
import type { ExperienceItem, ExperienceData } from "@/interface";

const defaultExperience: ExperienceData = {
  items: [
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
};

async function getExperienceData(): Promise<ExperienceItem[]> {
  try {
    await dbConnect();
    const experience = await Experience.findOne().lean();
    if (experience && experience.items) {
      return JSON.parse(JSON.stringify(experience.items));
    }
    return defaultExperience.items;
  } catch (error) {
    console.error("Failed to fetch experience data:", error);
    return defaultExperience.items;
  }
}

export default async function ExprianceSection() {
  const items = await getExperienceData();

  return (
    <section
      id="experience"
      className="bg-[#f2efe9] py-24 px-8 md:px-16 lg:px-32 flex justify-center"
    >
      <div className="w-full max-w-5xl">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-8 h-[1px] bg-gray-400"></div>
          <h2 className="text-4xl md:text-5xl font-serif text-[#4a4a4a]">
            Work Experience
          </h2>
        </div>

        <div className="ml-0 md:ml-12 border-l border-[#d3ceb7] pl-8 pb-4 relative">
          {items.map((job, idx) => (
            <div
              key={idx}
              className="bg-[#fcfcfb] rounded-2xl p-8 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] mb-10 relative"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-4">
                <div>
                  <h3 className="text-2xl font-serif text-[#4a4a4a]">
                    {job.jobTitle}
                  </h3>
                  <p className="text-[#8eb19d] text-sm mt-1">{job.company}</p>
                </div>
                {job.period && (
                  <div className="bg-[#e9ece5] text-[#6d8a77] text-xs font-medium px-4 py-1.5 rounded-full whitespace-nowrap inline-flex self-start">
                    {job.period}
                  </div>
                )}
              </div>
              <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
