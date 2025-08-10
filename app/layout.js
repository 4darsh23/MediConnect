import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme.provider";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MediConnect",
  description: "Connect with your Doctors",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html
        lang="en"
        suppressHydrationWarning
      >
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen w-full relative bg-black">
              {/* App Content */}
              <div className="relative z-10">
                {/*Header*/}
                <Header />

                <main className="min-h-screen pt-20">{children}</main>

                {/*Footer*/}
                <footer className="bg-muted/50 py-12">
                  <div className="container mx-auto px-4 text-center text-gray-200">
                    <p> Made by Adarsh </p>
                  </div>
                </footer>
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
