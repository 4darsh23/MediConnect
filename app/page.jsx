import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden py-32">
        <div className="container mx-auto px-4">
          <div>
            <div>
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
            </div>
            <div></div>
          </div>
        </div>
      </section>
    </div>
  );
}
