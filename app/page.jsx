import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Link } from "lucide-react";
import { image } from "next/image";

export default function Home() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Badge
                variant="outline"
                className="bg-emerald-900/30 border-emerald-700/30 px-4 py-2 text-emerald-300 text-sm font-medium"
              >
                {" "}
                Trusted Care, Anytime, Anywhere{" "}
              </Badge>
              <h1 className=" text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Connect With Doctors <br /> Anytime anywhere{" "}
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-mid"> Book appointments, consult via video and manage your healthcare journey all in one secure platform </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Get started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald-700/30 hover:bg-muted/80"
                >
                  {" "}
                  Find Doctors{" "}
                </Button>
              </div>
            </div>

            <div className="relative h-[400px] lg:h-[500px] rounded-xl  overflow-hidden   ">
              <img
                src="/banner2.png"
                alt="doctor consultation"
                className="object-cover md:pt-14 rounded-xl  "
              />
            </div>
            <div></div>
          </div>
        </div>
      </section>
    </div>
  );
}
