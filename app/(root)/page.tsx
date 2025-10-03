import SectionFour from "@/components/Frontend/Home/section_four";
import SectionOne from "@/components/Frontend/Home/section_one";
import SectionThree from "@/components/Frontend/Home/section_three";
import SectionTwo from "@/components/Frontend/Home/section_two";

export default function Home() {
  return (
    <div className="grid gap-20">
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
    </div>
  );
}
