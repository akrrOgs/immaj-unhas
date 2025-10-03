"use client";

import { CONTACT } from "@/constants";
import TitleHeader from "../TitleHeader";
import { useState } from "react";

const Map = () => {
  return (
    <iframe
      className="px-3 lg:px-0 border-none w-[30rem] h-[100%]"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31790.45819917527!2d119.4368051176009!3d-5.134713976122635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbefcb70a4fef89%3A0x4427b765b3d16a6f!2sFakultas%20Ekonomi%20dan%20Bisnis%20Universitas%20Hasanuddin!5e0!3m2!1sid!2sid"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
};

const SectionFour = () => {
  const [hasCopy, setHasCopy] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("086943437179");

    setHasCopy(true);

    setTimeout(() => {
      setHasCopy(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 my-8">
      <TitleHeader title="Contact Us" sub="☎️ Contact Information" />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <Map />
        <div className="grid grid-cols-1 gap-4">
          {CONTACT.map((c) => (
            <div className="col-span-1 xl:row-span-3" key={c.title}>
              <div className="w-full h-full border border-slate-200 bg-slate-100 rounded-lg sm:p-7 p-4 flex flex-col gap-5 justify-center items-center">
                <img src={c.icon} alt="grid-1" className="" />

                <h1 className="text-xl font-semibold text-slate-950 font-generalsans">
                  {c.title}
                </h1>
                <div
                  className="cursor-pointer flex justify-center items-center gap-2"
                  onClick={handleCopy}
                >
                  {c.title === "Contact" && (
                    <img
                      src={hasCopy ? "/img/tick.svg" : "/img/copy.svg"}
                      alt="Copy"
                    />
                  )}

                  <p className="text-[#afb0b6] text-base font-semibold font-generalsans">
                    {c.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionFour;
