import React from "react";
import DetailsRegisterForm from "@/components/DetailsRegisterForm";
type Props = {
  params: {
    user_type: string;
  };
};
export default function RegisterUserDetails({ params }: Props) {
  return (
    <div className="flex flex-col justify-center items-center">
      <DetailsRegisterForm user_type={params.user_type} />
    </div>
  );
}
