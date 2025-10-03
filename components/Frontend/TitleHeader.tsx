const TitleHeader = ({ title, sub }: { title: string; sub: string }) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="bg-blue-400/20 py-2 px-4 rounded-full w-fit text-sm md:text-base text-slate-950 text-nowrap font-semibold">
        <p>{sub}</p>
      </div>
      <div className="font-bold italic md:text-5xl text-3xl uppercase text-center text-slate-950/20">
        {title}
      </div>
    </div>
  );
};

export default TitleHeader;
