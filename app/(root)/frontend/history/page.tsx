import { getAllHistory } from "@/lib/data";
import HTMLReactParser from "html-react-parser/lib/index";

const HistoryPages = async () => {
  const historys = await getAllHistory();

  return (
    <div className="min-h-screen p-10">
      {historys?.map((h) => (
        <article
          key={h.id}
          className="grid gap-4 text-slate-950 bg-white p-3 rounded-xl"
        >
          <p className="text-2xl font-semibold text-center">{h.title}</p>
          <main>{HTMLReactParser(h.content || "")}</main>
        </article>
      ))}
    </div>
  );
};

export default HistoryPages;
