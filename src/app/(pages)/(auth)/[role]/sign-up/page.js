"use client";

import SignUp from "@/app/components/authComponent/signUpForm/SignUp";
import { useParams } from "next/navigation";

export default function LoginPage() {
  const { role } = useParams();

  return <SignUp role={role} />;
}
