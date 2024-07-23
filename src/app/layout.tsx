import RQProvider from "@/providers/RQProvider";
import "./globals.css";
import type { Metadata } from "next";
import AuthSession from "@/providers/AuthSession";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "말모말모",
  description: "말모말모"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <RQProvider>
          <AuthSession>
            <div className='flex relative'>
              <Navbar />
              <main className='max-w-[1200px] w-full mx-auto flex flex-col items-center'>
                {children}
              </main>
              <h1 className='fixed top-lg right-[62px]'>말모말모</h1>
            </div>
          </AuthSession>
        </RQProvider>
      </body>
    </html>
  );
}
