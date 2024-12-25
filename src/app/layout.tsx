import type { Metadata } from "next";
import "./globals.css";
import Wrapper from "@/components/Wrapper/Wrapper";

export const metadata: Metadata = {
  title: "Interior",
  description: "Furniture Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
