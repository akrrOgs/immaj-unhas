import Image from "next/image";

const LogoPages = () => {
  return (
    <div className="pt-10 px-10 flex flex-col md:flex-row gap-8 items-start">
      <Image
        src="/logo.jpg"
        alt="Logo"
        width={350}
        height={350}
        className="rounded-full wrapper bg-black self-start flex-shrink-0"
      />
      <p className="text-lg font-medium text-slate-950 flex-1 text-justify">
        SALURAN SIMBOL IMMAS Sejak berdirinya IMMAJ pada 17 Desember 1982,
        lambang IMMAJ telah beberapa kali (4 kali) mengalami perubahan. Lambang
        yang sekarang ini sebenarnya bukanlah lambang baru, namun lebih ke
        metamorfosa dari lambung yang lama. Alasan mendasar agar ada sedikit
        perubahan dan pencarahan yang terjadi di IMMAJ, walaupun ada sedikit
        komentar dari pendahulu-pendahulu IMMAJ akan perubahan lambang tersebut
        dengan alasan bahwa perubahan lambang bukanlah yang diperlukan oleh
        keluarga melainkan sebuah perubahan dalam tatanan dan jalannya
        organisasi Tapi menurut kanda Acha 97, tidak ada langkah basar yang
        dimulai dengan langkah kecil. Berubahnya lambang adalah langkah kecil
        untuk sebuah perubahan di IMMAJ Peruluhannya lambang IMMAJ hanya berubah
        dari awalnya kotak menjadi lingkaran sempurna yang sebelumnya dibuat
        oleh kanda Sadat 93 Tujuan perubahan tersebut agar keluarga besar
        Manajemen tidak ada lagi pengkotak-kotakan baik angkatan, starata
        sosial, suku, dan semua yang bisa menghambat seseorang untuk membaur ke
        dalam keluarga besar IMMAJ yang pada waktu itu sangat kental terasa.
        Dengan berubah menjadi lingkaran sempurna dengan harapan bahwa tidak ada
        lagi pengkotak-kotakan dan seluruh mahasiswa manajemen FE-UH mempunyai
        hak dan kewajiban yang sama terhadap IMMAJ. Lambang terakhir yang dibuat
        oleh kanda Acha ini dicanakan sampai sekarang yang resmi digunakan pada
        kepengurusan periode 2000-2001.
      </p>
    </div>
  );
};

export default LogoPages;
