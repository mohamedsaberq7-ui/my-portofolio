"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import type { HeroData, AboutData, ExperienceData, CertificateData, ExperienceItem, CertificateItem } from "@/interface";

const defaultHero: HeroData = {
  jobTitle: "Agricultural Engineer",
  firstName: "Your",
  lastName: "Full Name",
  bio: "Dedicated agricultural engineer with a passion for sustainable farming, modern agri-tech, and bridging the gap between science and field practice. Committed to driving food security and rural development.",
  cvUrl: "#",
  linkedinUrl: "#",
  profileImage: "",
};

const defaultAbout: AboutData = {
  paragraphs: [
    "I am an agricultural engineer with a deep commitment to sustainable land management and modern agricultural practices. My work bridges scientific research and real-world field application, ensuring that crops thrive while ecosystems are preserved.",
    "My professional goal is to contribute to food security through precision agriculture, smart irrigation systems, and soil health optimization. I am driven by a genuine passion for the land and a belief that technology and nature can coexist harmoniously.",
  ],
};

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

export default function AdminPage() {
  const [heroData, setHeroData] = useState<HeroData>(defaultHero);
  const [aboutData, setAboutData] = useState<AboutData>(defaultAbout);
  const [experienceData, setExperienceData] = useState<ExperienceData>(defaultExperience);
  const [certificateData, setCertificateData] = useState<CertificateData>(defaultCertificate);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingHero, setIsSavingHero] = useState(false);
  const [isSavingAbout, setIsSavingAbout] = useState(false);
  const [isSavingExperience, setIsSavingExperience] = useState(false);
  const [isSavingCertificate, setIsSavingCertificate] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Fetch existing data on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const [heroRes, aboutRes, expRes, certRes] = await Promise.allSettled([
          axios.get("/api/hero"),
          axios.get("/api/about"),
          axios.get("/api/experience"),
          axios.get("/api/certificate"),
        ]);

        if (heroRes.status === "fulfilled") {
          setHeroData(heroRes.value.data);
        }
        if (aboutRes.status === "fulfilled") {
          setAboutData(aboutRes.value.data);
        }
        if (expRes.status === "fulfilled") {
          setExperienceData(expRes.value.data);
        }
        if (certRes.status === "fulfilled") {
          setCertificateData(certRes.value.data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // ─── Hero Handlers ───
  const handleHeroChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setHeroData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingHero(true);

    try {
      const { data } = await axios.put("/api/hero", {
        jobTitle: heroData.jobTitle,
        firstName: heroData.firstName,
        lastName: heroData.lastName,
        bio: heroData.bio,
        cvUrl: heroData.cvUrl,
        linkedinUrl: heroData.linkedinUrl,
        profileImage: heroData.profileImage,
      });

      setHeroData(data);
      setToast({
        message: "Hero section saved successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Save error:", error);
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to save"
        : "Something went wrong";
      setToast({ message, type: "error" });
    } finally {
      setIsSavingHero(false);
    }
  };

  // ─── About Handlers ───
  const handleAboutParagraphChange = (index: number, value: string) => {
    setAboutData((prev) => {
      const updated = [...prev.paragraphs];
      updated[index] = value;
      return { ...prev, paragraphs: updated };
    });
  };

  const addParagraph = () => {
    setAboutData((prev) => ({
      ...prev,
      paragraphs: [...prev.paragraphs, ""],
    }));
  };

  const removeParagraph = (index: number) => {
    if (aboutData.paragraphs.length <= 1) return;
    setAboutData((prev) => ({
      ...prev,
      paragraphs: prev.paragraphs.filter((_, i) => i !== index),
    }));
  };

  const handleAboutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingAbout(true);

    try {
      const { data } = await axios.put("/api/about", {
        paragraphs: aboutData.paragraphs,
      });

      setAboutData(data);
      setToast({
        message: "About section saved successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Save error:", error);
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to save"
        : "Something went wrong";
      setToast({ message, type: "error" });
    } finally {
      setIsSavingAbout(false);
    }
  };

  // ─── Experience Handlers ───
  const handleExperienceChange = (
    index: number,
    field: keyof ExperienceItem,
    value: string
  ) => {
    setExperienceData((prev) => {
      const updated = [...prev.items];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, items: updated };
    });
  };

  const addExperience = () => {
    setExperienceData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { jobTitle: "", company: "", period: "", description: "" },
      ],
    }));
  };

  const removeExperience = (index: number) => {
    setExperienceData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleExperienceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingExperience(true);

    try {
      const { data } = await axios.put("/api/experience", {
        items: experienceData.items,
      });

      setExperienceData(data);
      setToast({
        message: "Experience section saved successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Save error:", error);
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to save"
        : "Something went wrong";
      setToast({ message, type: "error" });
    } finally {
      setIsSavingExperience(false);
    }
  };

  // ─── Certificate Handlers ───
  const handleCertificateChange = (
    index: number,
    field: keyof CertificateItem,
    value: string
  ) => {
    setCertificateData((prev) => {
      const updated = [...prev.items];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, items: updated };
    });
  };

  const addCertificate = () => {
    setCertificateData((prev) => ({
      ...prev,
      items: [...prev.items, { title: "", org: "", year: "" }],
    }));
  };

  const removeCertificate = (index: number) => {
    setCertificateData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleCertificateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingCertificate(true);

    try {
      const { data } = await axios.put("/api/certificate", {
        items: certificateData.items,
      });

      setCertificateData(data);
      setToast({
        message: "Certifications saved successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Save error:", error);
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to save"
        : "Something went wrong";
      setToast({ message, type: "error" });
    } finally {
      setIsSavingCertificate(false);
    }
  };

  // ─── Loading State ───
  if (isLoading) {
    return (
      <main className="max-w-4xl mx-auto px-8 py-16">
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3 text-gray-400">
            <svg
              className="w-5 h-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span className="text-sm font-medium">Loading data...</span>
          </div>
        </div>
      </main>
    );
  }

  const SaveButton = ({
    isSaving,
    label = "Save Changes",
  }: {
    isSaving: boolean;
    label?: string;
  }) => (
    <button
      type="submit"
      disabled={isSaving}
      className="flex items-center gap-2 bg-gradient-to-r from-[#8eb19d] to-[#7da38e] hover:from-[#7da38e] hover:to-[#6d9b7e] text-white px-8 py-3 rounded-full text-sm font-semibold shadow-[0_4px_15px_-4px_rgba(142,177,157,0.4)] hover:shadow-[0_6px_20px_-4px_rgba(142,177,157,0.5)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isSaving ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Saving...
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          {label}
        </>
      )}
    </button>
  );

  return (
    <main className="max-w-4xl mx-auto px-8 py-12 space-y-16">
      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium transition-all animate-[slideIn_0.3s_ease] ${
            toast.type === "success"
              ? "bg-[#8eb19d] text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* HERO SECTION FORM                          */}
      {/* ═══════════════════════════════════════════ */}
      <section id="hero" className="scroll-mt-8">
        <div className="mb-10">
          <h2 className="text-2xl font-serif text-gray-800 mb-2">
            Hero Section
          </h2>
          <p className="text-sm text-gray-400">
            Edit the content displayed in your portfolio&apos;s hero section.
          </p>
        </div>

        <form onSubmit={handleHeroSubmit} className="space-y-8">
          {/* Profile Image Preview */}
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#cce0cf] via-[#e2dec4] to-[#e4d9bc] flex items-center justify-center shadow-inner overflow-hidden shrink-0">
              {heroData.profileImage ? (
                <img
                  src={heroData.profileImage}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  className="w-8 h-8 text-white/80"
                  fill="none"
                  stroke="currentColor"
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
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-500 tracking-wide uppercase mb-2">
                Profile Image URL
              </label>
              <input
                type="url"
                name="profileImage"
                value={heroData.profileImage}
                onChange={handleHeroChange}
                placeholder="https://example.com/your-photo.jpg"
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200/80 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8eb19d]/30 focus:border-[#8eb19d] transition-all"
              />
            </div>
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 tracking-wide uppercase mb-2">
              Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              value={heroData.jobTitle}
              onChange={handleHeroChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200/80 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8eb19d]/30 focus:border-[#8eb19d] transition-all"
            />
          </div>

          {/* Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-500 tracking-wide uppercase mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={heroData.firstName}
                onChange={handleHeroChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200/80 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8eb19d]/30 focus:border-[#8eb19d] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 tracking-wide uppercase mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={heroData.lastName}
                onChange={handleHeroChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200/80 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8eb19d]/30 focus:border-[#8eb19d] transition-all"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 tracking-wide uppercase mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={heroData.bio}
              onChange={handleHeroChange}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200/80 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8eb19d]/30 focus:border-[#8eb19d] transition-all resize-none"
            />
          </div>

          {/* Links Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-500 tracking-wide uppercase mb-2">
                CV Download URL
              </label>
              <input
                type="url"
                name="cvUrl"
                value={heroData.cvUrl}
                onChange={handleHeroChange}
                placeholder="https://example.com/cv.pdf"
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200/80 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8eb19d]/30 focus:border-[#8eb19d] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 tracking-wide uppercase mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                name="linkedinUrl"
                value={heroData.linkedinUrl}
                onChange={handleHeroChange}
                placeholder="https://linkedin.com/in/your-profile"
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200/80 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8eb19d]/30 focus:border-[#8eb19d] transition-all"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200/60">
            <SaveButton isSaving={isSavingHero} />
          </div>
        </form>
      </section>

      {/* Divider */}
      <hr className="border-gray-200/60" />

      {/* ═══════════════════════════════════════════ */}
      {/* ABOUT SECTION FORM                         */}
      {/* ═══════════════════════════════════════════ */}
      <section id="about" className="scroll-mt-8">
        <div className="mb-10">
          <h2 className="text-2xl font-serif text-gray-800 mb-2">
            About Me Section
          </h2>
          <p className="text-sm text-gray-400">
            Edit the paragraphs displayed in the About Me section.
          </p>
        </div>

        <form onSubmit={handleAboutSubmit} className="space-y-6">
          {aboutData.paragraphs.map((paragraph, index) => (
            <div key={index} className="relative">
              <label className="block text-xs font-semibold text-gray-500 tracking-wide uppercase mb-2">
                Paragraph {index + 1}
              </label>
              <div className="flex gap-3">
                <textarea
                  value={paragraph}
                  onChange={(e) =>
                    handleAboutParagraphChange(index, e.target.value)
                  }
                  required
                  rows={4}
                  className="flex-1 px-4 py-3 rounded-xl bg-white border border-gray-200/80 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8eb19d]/30 focus:border-[#8eb19d] transition-all resize-none"
                />
                {aboutData.paragraphs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParagraph(index)}
                    className="self-start p-2 text-red-300 hover:text-red-500 transition-colors"
                    title="Remove paragraph"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add Paragraph Button */}
          <button
            type="button"
            onClick={addParagraph}
            className="flex items-center gap-2 text-sm text-[#8eb19d] hover:text-[#6d9b7e] font-medium transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Paragraph
          </button>

          {/* Save Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200/60">
            <SaveButton isSaving={isSavingAbout} />
          </div>
        </form>
      </section>

      {/* Divider */}
      <hr className="border-gray-200/60" />

      {/* ═══════════════════════════════════════════ */}
      {/* EXPERIENCE SECTION FORM                      */}
      {/* ═══════════════════════════════════════════ */}
      <section id="experience" className="scroll-mt-8">
        <div className="mb-10">
          <h2 className="text-2xl font-serif text-gray-800 mb-2">
            Work Experience
          </h2>
          <p className="text-sm text-gray-400">
            Edit your work experience items.
          </p>
        </div>

        <form onSubmit={handleExperienceSubmit} className="space-y-8">
          {experienceData.items.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl border border-gray-200/80 shadow-sm relative"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-semibold text-gray-700 tracking-wide uppercase">
                  Job {index + 1}
                </h3>
                {experienceData.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="text-red-300 hover:text-red-500 transition-colors p-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Job Title</label>
                    <input
                      type="text"
                      value={item.jobTitle}
                      onChange={(e) => handleExperienceChange(index, "jobTitle", e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#f5f3eb]/30 border border-gray-200/80 text-sm focus:ring-[#8eb19d]/30 focus:border-[#8eb19d] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Company</label>
                    <input
                      type="text"
                      value={item.company}
                      onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#f5f3eb]/30 border border-gray-200/80 text-sm focus:ring-[#8eb19d]/30 focus:border-[#8eb19d] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Period</label>
                  <input
                    type="text"
                    value={item.period}
                    onChange={(e) => handleExperienceChange(index, "period", e.target.value)}
                    required
                    placeholder="e.g., 2021 — Present"
                    className="w-full px-4 py-3 rounded-xl bg-[#f5f3eb]/30 border border-gray-200/80 text-sm focus:ring-[#8eb19d]/30 focus:border-[#8eb19d] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Description</label>
                  <textarea
                    value={item.description}
                    onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-[#f5f3eb]/30 border border-gray-200/80 text-sm focus:ring-[#8eb19d]/30 focus:border-[#8eb19d] transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addExperience}
            className="flex items-center gap-2 text-sm text-[#8eb19d] hover:text-[#6d9b7e] font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Job
          </button>

          <div className="flex justify-end pt-4 border-t border-gray-200/60">
            <SaveButton isSaving={isSavingExperience} />
          </div>
        </form>
      </section>

      {/* Divider */}
      <hr className="border-gray-200/60" />

      {/* ═══════════════════════════════════════════ */}
      {/* CERTIFICATES SECTION FORM                    */}
      {/* ═══════════════════════════════════════════ */}
      <section id="certifications" className="scroll-mt-8">
        <div className="mb-10">
          <h2 className="text-2xl font-serif text-gray-800 mb-2">
            Certifications
          </h2>
          <p className="text-sm text-gray-400">
            Manage your certificates and awards.
          </p>
        </div>

        <form onSubmit={handleCertificateSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {certificateData.items.map((item, index) => (
              <div
                key={index}
                className="p-5 bg-white rounded-2xl border border-gray-200/80 shadow-sm relative flex flex-col md:flex-row gap-4 items-start md:items-center"
              >
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleCertificateChange(index, "title", e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-[#f5f3eb]/30 border border-gray-200/80 text-sm focus:ring-[#8eb19d]/30 focus:border-[#8eb19d] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Organization</label>
                    <input
                      type="text"
                      value={item.org}
                      onChange={(e) => handleCertificateChange(index, "org", e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-[#f5f3eb]/30 border border-gray-200/80 text-sm focus:ring-[#8eb19d]/30 focus:border-[#8eb19d] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Year</label>
                    <input
                      type="text"
                      value={item.year}
                      onChange={(e) => handleCertificateChange(index, "year", e.target.value)}
                      required
                      placeholder="e.g., 2022"
                      className="w-full px-3 py-2 rounded-lg bg-[#f5f3eb]/30 border border-gray-200/80 text-sm focus:ring-[#8eb19d]/30 focus:border-[#8eb19d] transition-all"
                    />
                  </div>
                </div>

                {certificateData.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCertificate(index)}
                    className="text-red-300 hover:text-red-500 transition-colors p-2 mt-4 md:mt-0"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addCertificate}
            className="flex items-center gap-2 text-sm text-[#8eb19d] hover:text-[#6d9b7e] font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Certificate
          </button>

          <div className="flex justify-end pt-4 border-t border-gray-200/60">
            <SaveButton isSaving={isSavingCertificate} />
          </div>
        </form>
      </section>
    </main>
  );
}
