import Image from "next/image";

const SectionOne = () => {
  return (
    <section className="overflow-hidden min-h-screen bg-gradient-to-b from-blue-500 to-slate-50">
      <div className="flex xl:items-center items-start justify-center">
        {/* LEFT SIDE */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5 mt-10">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col justify-center md:text-[60px] text-[30px] font-semibold relative z-10 pointer-events-none">
              <h1>IMMAJ</h1>
              <h1>Ikatan Mahasiswa</h1>
              <h1>Manajemen</h1>
            </div>
            <p className="md:text-lg pointer-events-none">
              Ikatan Mahasiswa Fakultas Ekonomi dan Bisnis Universitas
              Hasanuddin (IMMAJ FEB-UH) merupakan lembaga mahasiswa tingkat
              jurusan yang berada dalam naungan Fakultas Ekonomi dan Bisnis
              Universitas Hasanuddin dengan minat dan keahlian dalam bidang
              manajemen. IMMAJ FEB-UH Mengembangkan dan menerapkan
              prinsip-prinsip manajemen dalam berbagai konteks organisasi dengan
              berlandaskan nilai Keluarga Mahasiswa Fakultas Ekonomi dan Bisnis
              Universitas Hasanuddin (KEMA FEB-UH).
            </p>
          </div>
        </header>

        {/* RIGHT SIDE */}
        <div className="absolute top-27 right-60">
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={300}
            height={300}
            className="rounded-full wrapper"
          />
        </div>
      </div>
    </section>
  );
};

export default SectionOne;
