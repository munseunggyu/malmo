import RQProvider from "@/providers/RQProvider";
import "./globals.css";
import type { Metadata } from "next";
import AuthSession from "@/providers/AuthSession";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export const metadata: Metadata = {
  title: "말모말모",
  description: "말모말모"
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <html lang='en'>
      <body>
        <RQProvider>
          <AuthSession>
            <div className='flex relative h-full'>
              {user && <Navbar />}
              <main className={`w-full ${user ? "pl-[84px]" : ""}`}>
                {children}
              </main>
              <h1 className='fixed top-lg right-[62px]'>말모말모</h1>
            </div>
            <div id='portal' />
          </AuthSession>
        </RQProvider>
      </body>
    </html>
  );
}
