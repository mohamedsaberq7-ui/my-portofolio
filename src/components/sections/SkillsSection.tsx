import dbConnect from "@/lib/dbConnect";
import Skill from "@/models/Skill";
import type { SkillItem, SkillData } from "@/interface";

const defaultSkills: SkillData = {
  items: [
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
};

async function getSkillData(): Promise<SkillItem[]> {
  try {
    await dbConnect();
    const skill = await Skill.findOne().lean();
    if (skill && skill.items) {
      return JSON.parse(JSON.stringify(skill.items));
    }
    return defaultSkills.items;
  } catch (error) {
    console.error("Failed to fetch skill data:", error);
    return defaultSkills.items;
  }
}

function groupByCategory(items: SkillItem[]): Record<string, SkillItem[]> {
  return items.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, SkillItem[]>,
  );
}

export default async function SkillsSection() {
  const items = await getSkillData();
  const grouped = groupByCategory(items);
  const categories = Object.keys(grouped);

  return (
    <section
      id="skills"
      className="bg-[#f2efe9] py-16 sm:py-24 px-6 sm:px-8 md:px-16 lg:px-32 flex justify-center"
    >
      <div className="w-full max-w-5xl">
        <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-16">
          <div className="w-6 sm:w-8 h-[1px] bg-gray-400"></div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#4a4a4a]">
            Skills
          </h2>
        </div>

        <div className="ml-0 md:ml-12 space-y-10">
          {categories.map((category) => (
            <div key={category}>
              {/* Category Header */}
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-2 h-2 rounded-full bg-[#8eb19d]"></div>
                <h3 className="text-sm font-semibold text-[#6d8a77] tracking-wide uppercase">
                  {category}
                </h3>
              </div>

              {/* Skill Cards */}
              <div className="flex flex-wrap gap-3">
                {grouped[category].map((skill, idx) => (
                  <div
                    key={idx}
                    className="bg-[#fcfcfb] rounded-xl px-5 py-3 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.06)] border border-white/80 hover:shadow-[0_4px_20px_-8px_rgba(142,177,157,0.25)] hover:border-[#d4e4d9] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                  >
                    <span className="text-sm font-medium text-[#4a4a4a]">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
