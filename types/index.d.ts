interface User {
  name: string;
  username: string;
  password: string;
  role: string;
}

interface SiginInWithCredentials {
  username: string;
  password: string;
}

interface Articles {
  title: string;
  content: string;
  categoryId: string;
  userId: string;
}

interface Category {
  name: string;
}

interface Gallery {
  title: string;
  division?: string | "";
  categoryId: string;
  content?: string | "";
}
