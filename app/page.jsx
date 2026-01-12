"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, Link, Stethoscope } from "lucide-react";
import { creditBenefits, features, testimonials } from "@/lib/data";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Pricing from "@/components/pricing";
import { CometCard } from "@/components/ui/comet-card";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex-right justify-center">
      <section className="relative overflow-hidden py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-9">
              <Badge
                variant="outline"
                className="bg-emerald-900/30 border-emerald-700/30 px-4 py-2 text-emerald-300 text-sm font-medium"
              >
                {" "}
                Trusted Care, Anytime, Anywhere , AnyPlace, Always{" "}
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
          </div>
        </div>
      </section>

      <section className=" py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How it works
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto"> Our platform is designed to make healthcare more accessible and convenient for everyone. </p>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              return (
                <CometCard
                  key={index}
                  className="border-emerald-900/20 hover:border-emerald-900/40 transition-all duration-300"
                >
                  <CardHeader className="pb-2 px-10 py-5">
                    <div className="bg-emerald-900/20 p-3 rounded-lg w-fit mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl font-semibold text-white"> {feature.title} </CardTitle>

                    <CardAction>Card Action</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground"> {feature.description} </p>
                  </CardContent>
                </CometCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className=" py-20 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="bg-emerald-900/30 border-emerald-700/30 px-4 py-2 text-emerald-300 text-sm font-medium mb-4"
            >
              affordable and reliable
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Consultation Packages
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto"> Our platform is designed to make healthcare more accessible and convenient for everyone. </p>
            </h2>
          </div>

          <div>
            {/*pricing table*/}
            <Pricing />

            <Card className="mt-12 bg-muted/20 border-emerald-900/30">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <Stethoscope className="h-5 w-5 mr-2 text-emerald-400" />
                  Credit System
                </CardTitle>

                <CardAction>
                  <ul className="space-y-3">
                    {" "}
                    {creditBenefits.map((benefit, index) => {
                      return (
                        <li
                          key={index}
                          className="flex items-start"
                        >
                          <div className="mr-3 mt-1 bg-emerald-900/20 p-1 rounded-full">
                            <Check className="h-4 w-4 text-emerald-400" />
                          </div>
                          <p
                            className="text-muted-foreground"
                            dangerouslySetInnerHTML={{ __html: benefit }}
                          />
                        </li>
                      );
                    })}{" "}
                  </ul>
                </CardAction>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className=" py-20 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="bg-emerald-900/30 border-b-emerald-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4 "
            >
              {" "}
              Success Stories{" of people "}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Users Feedbacks
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto"> Hear from out Patients and Doctors </p>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonials, index) => {
              return (
                <Card
                  key={index}
                  className="border-emerald-900/20 hover:border-emerald-900/40 transition-all duration-300"
                >
                  <CardContent className="pt-6">
                    <div className=" flex items-center mb-4">
                      <div className=" w-12 h-12 rounded-full bg-emerald-900/20  justify-center mr-4  flex items-center">
                        <span className="text-emerald-400 font-bold">{testimonials.initials}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{testimonials.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonials.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground    ">&quot;{testimonials.quote}&quote</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="justify-center px-20">Connecting people all across</div>
      </section>

      <section className=" py-30">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-emerald-900/30 to-emerald-950/20 border-emerald-800/20">
            <CardContent className="p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">ready to take care of the health</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-8">join thousands of users who have simplified their healthcare jounrney with out platform. Get started today and experience healthcare the way it should be</p>
              <div className="flex flex-col sm:flex-row gap-5">
                <Button
                  size="lg"
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                  asChild
                >
                  <Link href="/sign-up"> Sign up now </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-emerald-700/30 hover:bg-muted/80"
                >
                  <Link href="/pricing"> View Pricing </Link>
                </Button>
                <Button className="bg-lime-600">size = "lg"</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <footer className="justify-center , flex-col , px-5 , py-4"></footer>
      </section>
    </div>
  );
}
