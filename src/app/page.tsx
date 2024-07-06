import Link from "next/link";
import Header from "@/components/Header";
import Image from "next/image";
import landing_image from "../../public/landing-image.png";
import LandingCard from "@/components/LandingCard";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="grid grid-rows-1 grid-cols-1 w-full gap-5 md:gap-10 ">
      <div className="flex flex-col md:flex-row justify-center items-center w-full">
        <div className="flex flex-col  justify-center items-center">
          <Image
            className="w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] h-auto"
            src={landing_image}
            alt="landing_image"
            width={400}
            height={400}
          />
        </div>
        <div className="flex flex-col  gap-4">
          <h1 className="flex justify-center items-center text-2xl md:text-4xl lg:text-5xl font-bold w-full mt-5">
            Virtual Carrier Fair
          </h1>
          <LandingCard
            cardClasses="bg-blue-600 w-full md:w-2/3 text-white"
            divClasses="flex justify-center  items-center mx-5"
            title="Become an Employer"
            description="Register to become an employer and post job openings for students to apply."
            user_type="employer"
          />
          <LandingCard
            cardClasses="bg-slate-300  w-full md:w-2/3"
            divClasses="flex justify-center items-center mb-5 mx-5"
            title="Become a Candidate"
            description="Register to become a candidate and apply for job openings posted by employers."
            user_type="employee"
          />
        </div>
      </div>
    </div>
  );
}
