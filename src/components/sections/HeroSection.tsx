import dbConnect from "@/lib/dbConnect";
import Hero from "@/models/Hero";
import type { HeroData } from "@/interface";
import profileImage from "../../../public/images/IMG_20260413_143831.jpg";
import Image from "next/image";

const defaultHero: HeroData = {
  jobTitle: "Agricultural Engineer",
  firstName: "Your",
  lastName: "Full Name",
  bio: "Dedicated agricultural engineer with a passion for sustainable farming, modern agri-tech, and bridging the gap between science and field practice. Committed to driving food security and rural development.",
  cvUrl: "#",
  linkedinUrl: "#",
  profileImage: "",
};

async function getHeroData(): Promise<HeroData> {
  try {
    await dbConnect();
    const hero = await Hero.findOne().lean();
    if (hero) {
      return JSON.parse(JSON.stringify(hero));
    }
    return defaultHero;
  } catch (error) {
    console.error("Failed to fetch hero data:", error);
    return defaultHero;
  }
}

function getCorrectImageUrl(url: string) {
  if (!url) return url;
  const driveRegex = /drive\.google\.com\/file\/d\/([^/]+)\//;
  const match = url.match(driveRegex);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
}

export default async function HeroScreen() {
  const hero = await getHeroData();

  return (
    <section className="relative flex flex-col min-h-screen bg-gradient-to-r from-[#f5f3eb] via-[#f1eee3] to-[#dce5d9] overflow-hidden">
      {/* Navigation */}

      {/* Hero Content */}
      <main className="flex-1 flex items-center px-6 sm:px-8 md:px-16 lg:px-24 z-10 pt-28 pb-16 lg:py-0">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="flex flex-col max-w-lg order-2 lg:order-1">
            <p className="text-[#8eb19d] text-xs font-bold tracking-[0.2em] uppercase mb-6">
              {hero.jobTitle}
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#333333] mb-6 sm:mb-8 leading-[1.1]">
              {hero.firstName} <br className="hidden sm:block" />
              <span className="italic text-gray-600 font-light">
                {hero.lastName}
              </span>
            </h1>

            <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-md">
              {hero.bio}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto">
              <a
                href={hero.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 bg-[#fdfdfc] bg-opacity-80 backdrop-blur-sm border border-white shadow-[0_4px_15px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-all px-6 py-3.5 sm:py-3 rounded-full text-sm text-gray-700 font-medium w-full sm:w-auto"
              >
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span>Download CV</span>
              </a>

              <a
                href={hero.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 bg-[#fdfdfc] bg-opacity-80 backdrop-blur-sm border border-white shadow-[0_4px_15px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-all px-6 py-3.5 sm:py-3 rounded-full text-sm text-gray-700 font-medium w-full sm:w-auto"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>

          {/* Right Column (Profile Image / Gradient Circle) */}
          <div className="flex justify-center lg:justify-end relative order-1 lg:order-2">
            <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] rounded-full bg-gradient-to-br from-[#cce0cf] via-[#e2dec4] to-[#e4d9bc] flex items-center justify-center shadow-inner relative z-10 overflow-hidden">
              {hero.profileImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <Image
                  src={profileImage}
                  alt={`${hero.firstName} ${hero.lastName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  className="w-20 h-20 text-white stroke-current opacity-80"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="0.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-3 opacity-60 z-10">
        <span className="text-[10px] tracking-[0.2em] text-gray-400 font-medium">
          SCROLL
        </span>
        <div className="w-px h-8 bg-gray-300"></div>
      </div>
    </section>
  );
}
