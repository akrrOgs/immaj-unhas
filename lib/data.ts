import { prisma } from "./prisma";

const ITEMS_PER_PAGE = 10;

export const getArticles = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const result = await prisma.articels.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        category: {
          name: {
            startsWith: "Artikel",
            mode: "insensitive",
          },
        },
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            category: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getArticlePages = async (query: string) => {
  try {
    const result = await prisma.articels.count({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            category: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });
    const totalPages = Math.ceil(Number(result) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log(error);
  }
};

export const getAllArticles = async () => {
  try {
    const result = await prisma.articels.findMany({
      where: {
        category: {
          name: {
            startsWith: "Artikel",
            mode: "insensitive",
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getAllArticlesById = async (articlesId: string) => {
  try {
    const result = await prisma.articels.findUnique({
      where: { id: articlesId },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

// CATEGORIES DATA
export const getCategories = async () => {
  try {
    const result = await prisma.category.findMany();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategoryById = async (categoryId: string) => {
  try {
    const result = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoriesBySearch = async (
  query: string,
  currentPage: number
) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const result = await prisma.category.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryPages = async (query: string) => {
  try {
    const result = await prisma.category.count({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });
    const totalPages = Math.ceil(Number(result) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log(error);
  }
};

// USERS DATA
export const getUsers = async () => {
  try {
    const result = await prisma.user.findMany();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getUsersBySearch = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const result = await prisma.user.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            role: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getUsersPages = async (query: string) => {
  try {
    const result = await prisma.user.count({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });
    const totalPages = Math.ceil(Number(result) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsersById = async (usersId: string) => {
  try {
    const result = await prisma.user.findUnique({
      where: { id: usersId },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

// GALLERY DOCUMENTATION DATA
export const getAllDocs = async () => {
  try {
    const result = await prisma.gallery.findMany({
      where: {
        category: {
          name: "Documentation",
        },
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getDocsBySearch = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const result = await prisma.gallery.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        category: {
          name: "Documentation", // filter kategori harus Documentation
        },
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            category: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getGalleryPagesDocs = async (query: string) => {
  try {
    const result = await prisma.gallery.count({
      where: {
        AND: [
          {
            category: {
              name: "Documentation",
            },
          },
          {
            OR: [
              {
                title: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                category: {
                  name: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              },
            ],
          },
        ],
      },
    });
    const totalPages = Math.ceil(Number(result) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log(error);
  }
};

// GALLERY STRUCTURE DATA
export const getAllStruc = async () => {
  try {
    const result = await prisma.gallery.findMany({
      where: {
        category: {
          name: "Structure",
        },
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getStrucBySearch = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const result = await prisma.gallery.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        category: {
          name: "Structure", // filter kategori harus Documentation
        },
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            category: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getGalleryPagesStruc = async (query: string) => {
  try {
    const result = await prisma.gallery.count({
      where: {
        category: {
          name: "Structure", // filter kategori harus sama dengan "Structure"
        },
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            category: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });
    const totalPages = Math.ceil(Number(result) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log(error);
  }
};

export const getAllHistory = async () => {
  try {
    const result = await prisma.gallery.findMany({
      where: {
        category: {
          name: "History",
        },
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getAllGalleryById = async (docsId: string) => {
  try {
    const result = await prisma.gallery.findUnique({
      where: { id: docsId },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getAllGallery = async () => {
  try {
    const result = await prisma.gallery.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

// WORK PROGRAM DATA
export const getProgramsBySearch = async (
  query: string,
  currentPage: number
) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const result = await prisma.articels.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        category: {
          name: "Work Program",
        },
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            category: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getProgramsPages = async (query: string) => {
  try {
    const result = await prisma.articels.count({
      where: {
        category: {
          name: "Work Program",
        },
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            category: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });
    const totalPages = Math.ceil(Number(result) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPrograms = async () => {
  try {
    const result = await prisma.articels.findMany({
      where: {
        category: {
          name: "Work Program",
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
