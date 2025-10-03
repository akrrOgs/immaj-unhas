import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";

const Widget = ({
  titleCard,
  bgColor,
  link,
  value,
}: {
  titleCard: string;
  bgColor: string;
  link?: string;
  value: number | string;
}) => {
  return (
    <>
      {link ? (
        <Link
          href={link}
          className={`${bgColor} p-5 rounded-xl grid gap-8 text-white cursor-pointer uppercase`}
        >
          <div className="flex justify-between items-center">
            <p className="text-5xl font-bold">{value}</p>
            <ArrowRightCircle className="size-6" />
          </div>
          <h1 className="text-xl font-bold">{titleCard}</h1>
        </Link>
      ) : (
        <div
          className={`${bgColor} p-5 rounded-xl grid gap-8 text-white uppercase`}
        >
          <div className="flex justify-between items-center">
            <p className="text-5xl font-bold">{value}</p>
          </div>
          <h1 className="text-xl font-bold">{titleCard}</h1>
        </div>
      )}
    </>
  );
};

export default Widget;
