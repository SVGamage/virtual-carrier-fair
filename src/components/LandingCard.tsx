import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
type CardProps = {
  divClasses: string;
  cardClasses: string;
  title: string;
  description: string;
  user_type: string;
};
export default function LandingCard({
  cardClasses,
  divClasses,
  title,
  description,
  user_type,
}: CardProps) {
  return (
    <div className={divClasses}>
      <Card className={cardClasses}>
        <CardContent>
          <CardHeader className="px-1">
            <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
          </CardHeader>
          <p className="px-1 text-sm md:text-md mb-2">{description}</p>
          <CardFooter className="p-0 px-1">
            <RegisterLink
              className="bg-white rounded-md py-1 px-2 text-blue-600 font-bold"
              postLoginRedirectURL={`http:localhost:3000/${user_type}`}
            >
              Register
            </RegisterLink>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
