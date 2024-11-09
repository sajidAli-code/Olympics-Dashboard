import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import HeadBar from "@/components/HeadBar";
import { AppProvider } from "./context/AppContext";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Olympics Stats",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased min-h-screen overflow-hidden`}>
        <AppProvider>
          <div className="h-screen grid grid-cols-[0.75fr_3fr] grid-rows-[0.12fr_1fr] gap-0">
            <div className="row-span-2 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
              <Sidebar />
            </div>

            {/* HeadBar (smaller height) */}
            <div className="col-span-2">
              <HeadBar />
            </div>

            {/* Main content (overflow control here) */}
            <div
              className="col-span-2 col-start-2 row-start-2 bg-gray-100 px-2 pt-2 pb-8 overflow-y-scroll hide-scrollbar"
              style={{ minHeight: 'calc(100vh - 10%)' }}
            >
              {children}
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}