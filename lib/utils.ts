import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials({ name }: { name: string }) {
  const names = name.split(" ");
  const initials = names.map((name) => name.charAt(0).toUpperCase());
  return initials.join(" "); // tambahkan spasi di sini
}

export const formatDateWithTimezone = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Makassar",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedDate = formatter.format(date);
  return formattedDate;
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export function formatRelativeTimeWithMakassarTimezone(
  createdAt: Date
): string {
  // Parse tanggal ke Date object (UTC)
  const date = new Date(createdAt);

  // Buat formatter untuk zona waktu Makassar
  const makassarTime = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Makassar",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).formatToParts(date);

  // Rekonstruksi tanggal Makassar dari parts (untuk akurasi)
  // Ini adalah cara sederhana untuk mendapatkan timestamp di zona Makassar
  const makassarDate = new Date(
    Date.UTC(
      parseInt(makassarTime.find((part) => part.type === "year")?.value || "0"),
      parseInt(
        makassarTime.find((part) => part.type === "month")?.value || "1"
      ) - 1, // Month 0-indexed
      parseInt(makassarTime.find((part) => part.type === "day")?.value || "1"),
      parseInt(makassarTime.find((part) => part.type === "hour")?.value || "0"),
      parseInt(
        makassarTime.find((part) => part.type === "minute")?.value || "0"
      ),
      parseInt(
        makassarTime.find((part) => part.type === "second")?.value || "0"
      )
    )
  );

  // Hitung difference dalam milidetik dari sekarang (di zona Makassar)
  const now = new Date(); // Now di zona lokal, tapi kita adjust ke Makassar untuk konsistensi
  const makassarNow = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Makassar" })
  );
  const diffInMs = makassarNow.getTime() - makassarDate.getTime();

  if (diffInMs < 0) {
    return "Baru saja"; // Jika tanggal di masa depan
  }

  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30); // Approksimasi
  const diffInYears = Math.floor(diffInDays / 365);

  // Format relative time dalam bahasa Indonesia
  if (diffInSeconds < 60) {
    return "Baru saja";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} menit lalu`;
  } else if (diffInHours < 24) {
    return `${diffInHours} jam lalu`;
  } else if (diffInDays < 7) {
    return `${diffInDays} hari lalu`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks} minggu lalu`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} bulan lalu`;
  } else {
    return `${diffInYears} tahun lalu`;
  }
}
