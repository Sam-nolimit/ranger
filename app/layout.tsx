// import Modal from "@/components/Modal";
import Modal from "@/components/Modal";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ATWS Ranger",
  description:
    "Project planning and tracking tool used by project development team member",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-blue-700/10">
        {children}
        <Modal />
      </body>
    </html>
  );
}
