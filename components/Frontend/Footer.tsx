import { SOCIAL_FOOTER } from "@/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="sm:px-10 px-5 pt-7 pb-3 border-t border-black/55 bg-black/40 flex justify-between items-center flex-wrap gap-5">
      <div className="text-white flex gap-2">
        <p>Terms & Conditions</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div>

      <div className="flex gap-3">
        {SOCIAL_FOOTER.map((sf) => (
          <Link
            href={sf.href}
            key={sf.title}
            className="w-12 h-12 rounded-full flex justify-center items-center bg-black/50 border border-black/70"
          >
            <img src={sf.icon} alt={sf.title} className="size-1/2" />
          </Link>
        ))}
      </div>

      <p className="text-white">@ 2025 IMMAJ. All rights reserved.</p>
    </div>
  );
};

export default Footer;
