import HTMLReactParser from "html-react-parser";

const CardHistory = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <main className="grid w-full gap-2">
      <h1 className="text-2xl font-bold text-center text-black">{title}</h1>
      <article className="text-black text-justify text-md font-normal">
        {HTMLReactParser(content)}
      </article>
    </main>
  );
};

export default CardHistory;
