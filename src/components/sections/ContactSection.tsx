import React from "react";

export default function ContactSection() {
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

        <form className="w-full space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-[10px] font-medium tracking-widest text-gray-500 uppercase mb-2">
              Full Name
            </label>
            <input
              type="text"
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
              placeholder="your@email.com"
              className="w-full bg-[#fcfcfb] bg-opacity-70 border border-transparent focus:border-[#8eb19d] rounded-xl px-4 py-3 text-sm text-gray-700 outline-none shadow-[0_2px_10px_-5px_rgba(0,0,0,0.05)] transition-all placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium tracking-widest text-gray-500 uppercase mb-2">
              Message
            </label>
            <textarea
              rows={4}
              placeholder="Tell me about your project or inquiry..."
              className="w-full bg-[#fcfcfb] bg-opacity-70 border border-transparent focus:border-[#8eb19d] rounded-xl px-4 py-3 text-sm text-gray-700 outline-none shadow-[0_2px_10px_-5px_rgba(0,0,0,0.05)] transition-all placeholder:text-gray-400 resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#fcfcfb] hover:bg-white text-gray-600 font-medium py-3.5 px-4 rounded-xl shadow-[0_2px_10px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_15px_-5px_rgba(0,0,0,0.1)] transition-all text-sm mt-2"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
