import RQProvider from "@/providers/RQProvider";
import "./globals.css";
import type { Metadata } from "next";
import AuthSession from "@/providers/AuthSession";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export const metadata: Metadata = {
  title: "말모말모",
  description:
    "브레인스토밍을 돕는 여섯 모자들과 함께 아이디어를 확장시켜보아요.",
  openGraph: {
    title: "말모말모",
    description:
      "브레인스토밍을 돕는 여섯 모자들과 함께 아이디어를 확장시켜보아요.",
    images: [
      {
        url: "https://github.com/user-attachments/assets/ad8f20c9-ec03-4778-932d-2186ee52dd42",
        width: 1200,
        height: 600
      }
    ],
    siteName: "말모말모",
    type: "website"
  },
  verification: {
    google: "ENCP1b2GOOB9cZ_5jqglmVek2TNPce1L8PC0MfkEuKU",
    other: {
      "naver-site-verification": ["58265f3e1a282ded635f9c282f1c8dbf5dcbc10a"]
    }
  }
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
              <main className={`w-full ${user ? "pl-[72px]" : ""}`}>
                {children}
              </main>
            </div>
            <div id='portal' />
          </AuthSession>
        </RQProvider>
      </body>
    </html>
  );
}
