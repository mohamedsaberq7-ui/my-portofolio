import dbConnect from "@/lib/dbConnect";
import About from "@/models/About";

const defaultParagraphs = [
  "I am an agricultural engineer with a deep commitment to sustainable land management and modern agricultural practices. My work bridges scientific research and real-world field application, ensuring that crops thrive while ecosystems are preserved.",
  "My professional goal is to contribute to food security through precision agriculture, smart irrigation systems, and soil health optimization. I am driven by a genuine passion for the land and a belief that technology and nature can coexist harmoniously.",
];

async function getAboutData(): Promise<string[]> {
  try {
    await dbConnect();
    const about = await About.findOne().lean();
    if (about && about.paragraphs) {
      return JSON.parse(JSON.stringify(about.paragraphs));
    }
    return defaultParagraphs;
  } catch (error) {
    console.error("Failed to fetch about data:", error);
    return defaultParagraphs;
  }
}

export default async function AboutSection() {
  const paragraphs = await getAboutData();

  return (
    <section
      id="about"
      className="bg-[#fbfaf8] py-16 sm:py-24 px-6 sm:px-8 md:px-16 lg:px-32 flex justify-center"
    >
      <div className="w-full max-w-5xl">
        <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          <div className="w-6 sm:w-8 h-[1px] bg-gray-400"></div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#4a4a4a]">
            About Me
          </h2>
        </div>

        <div className="max-w-4xl space-y-6 text-[15px] leading-loose text-gray-500 ml-0 md:ml-12">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
