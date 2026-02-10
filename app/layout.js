import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";
import { checkUser } from "@/lib/checkUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Doctors Appointment App",
  description: "Connect with doctors anytime, anywhere",
};

export default async function RootLayout({ children }) {
  // Ensure a corresponding User row exists in Postgres for the logged-in Clerk user
  await checkUser();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html
        lang="en"
        suppressHydrationWarning
      >
        <head>
          <link
            rel="icon"
            href="/logo.png"
            sizes="any"
          />
        </head>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Made By Adarsh </p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
