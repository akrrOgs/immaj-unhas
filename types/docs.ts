import { Prisma } from "@/lib/generated/prisma";

export type GalleryProps = Prisma.GalleryGetPayload<{
  include: {
    category: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;
