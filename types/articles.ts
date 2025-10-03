import { Prisma } from "@/app/generated/prisma";

export type ArticlesProps = Prisma.ArticelsGetPayload<{
  include: {
    category: {
      select: {
        id: true;
        name: true;
      };
    };
    user: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;

export type ArticlesWithUserProps = Prisma.ArticelsGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;
