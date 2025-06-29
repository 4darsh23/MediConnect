import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({subsets : ["latin"]});



export const metadata = {
  title: "MediConnect",
  description: "Connect with your Doctors",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}`}
      >

{/*Header*/}

<main className=" min-h-screen">

{children}

</main>

{/*Footer*/}
<footer className="bg-muted/50 py-12">
  <div className="container mx-auto px-4 text-center text-gray-200">
    <p> Made by Adarsh </p>
  </div >
</footer>

        
      </body>
    </html>
  );
}
