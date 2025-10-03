import { Music2 } from "lucide-react";
import Image from "next/image";

const MarsPages = () => {
  return (
    <div className="p-10 grid md:grid-cols-2 grid-cols-1 gap-5 place-content-center place-items-center">
      <div className="grid space-y-5">
        <div className="flex gap-3">
          <Music2 className="size-20" />
          <div>
            <p className="text-2xl font-semibold text-slate-950">Mars IMMAJ</p>
            <p className="text-lg font-semibold text-gray-500">
              Ciptaan Kanda Rivo 95
            </p>
          </div>
        </div>
        <audio controls autoPlay>
          <source src="/audio/music.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <div className="text-base xl:pl-20 pl-0 italic space-y-5 text-gray-500">
          <p>
            IKATAN MAHASISWA MANAJEMEN
            <br />
            BERJALAN BERSAMA
            <br />
            MENJUNJUNG KEBENARAN
            <br />
            ROBOHKAN KEANGKUHAN
          </p>
          <p>
            LEPASKAN SEGALA BELENGGU
            <br />
            MENYONGSONG PENCERAHAN ZAMAN
            <br />
            IKATAN MAHASISWA MANAJEMEN
          </p>
          <p>
            BERKARYA BERSAMA
            <br />
            MENGHADIRKAN CINTA
            <br />
            WUJUDKAN PERDAMAIAN
            <br />
            LEPASKAN SEGALA BELENGGU
            <br />
            MENYONGSONG PENCERAHAN ZAMAN
            <br />
            IKATAN MAHASISWA MANAJEMEN
            <br />
            TUMBUH BERSAMA...
          </p>
        </div>
      </div>
      <div className="">
        <Image
          src="/img/Music.jpg"
          alt="Music Image"
          width={550}
          height={550}
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default MarsPages;
