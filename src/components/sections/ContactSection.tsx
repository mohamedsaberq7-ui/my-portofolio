"use client";

import React, { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to send message");
      }
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred");
    }
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-[#f3f4f0] to-[#e8e4d8] py-24 px-8 flex flex-col items-center"
    >
      <div className="w-full max-w-lg flex flex-col items-center">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-8 h-[1px] bg-gray-400"></div>
          <h2 className="text-3xl md:text-4xl font-serif text-[#4a4a4a]">
            Get in Touch
          </h2>
        </div>
        <p className="text-gray-500 text-[13px] mb-12 text-center">
          I'm open to new opportunities, collaborations, and conversations.
        </p>

        {status === "success" ? (
          <div className="w-full bg-[#ecfdf5] border border-[#a7f3d0] flex flex-col items-center justify-center p-8 rounded-xl opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards] text-center">
            <h3 className="text-xl font-medium text-[#065f46] mb-2">Message Sent!</h3>
            <p className="text-[#047857] text-sm">Thank you for reaching out. I'll get back to you soon.</p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-[#059669] text-sm font-medium hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[10px] font-medium tracking-widest text-gray-500 uppercase mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
                className="w-full bg-[#fcfcfb] bg-opacity-70 border border-transparent focus:border-[#8eb19d] rounded-xl px-4 py-3 text-sm text-gray-700 outline-none shadow-[0_2px_10px_-5px_rgba(0,0,0,0.05)] transition-all placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium tracking-widest text-gray-500 uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full bg-[#fcfcfb] bg-opacity-70 border border-transparent focus:border-[#8eb19d] rounded-xl px-4 py-3 text-sm text-gray-700 outline-none shadow-[0_2px_10px_-5px_rgba(0,0,0,0.05)] transition-all placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium tracking-widest text-gray-500 uppercase mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What is this regarding?"
                className="w-full bg-[#fcfcfb] bg-opacity-70 border border-transparent focus:border-[#8eb19d] rounded-xl px-4 py-3 text-sm text-gray-700 outline-none shadow-[0_2px_10px_-5px_rgba(0,0,0,0.05)] transition-all placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium tracking-widest text-gray-500 uppercase mb-2">
                Message
              </label>
              <textarea
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell me about your project or inquiry..."
                className="w-full bg-[#fcfcfb] bg-opacity-70 border border-transparent focus:border-[#8eb19d] rounded-xl px-4 py-3 text-sm text-gray-700 outline-none shadow-[0_2px_10px_-5px_rgba(0,0,0,0.05)] transition-all placeholder:text-gray-400 resize-none"
              ></textarea>
            </div>

            {status === "error" && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#fcfcfb] hover:bg-white disabled:bg-opacity-50 disabled:cursor-not-allowed text-gray-600 font-medium py-3.5 px-4 rounded-xl shadow-[0_2px_10px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_15px_-5px_rgba(0,0,0,0.1)] transition-all text-sm mt-2 flex justify-center items-center"
            >
              {status === "loading" ? (
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
