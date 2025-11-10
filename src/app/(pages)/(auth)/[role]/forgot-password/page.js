"use client";

import ForgotPassword from "@/app/components/authComponent/ForgotPassword";
import { useParams } from "next/navigation";

export default function LoginPage() {
  const { role } = useParams();

  return <ForgotPassword role={role} />;
}
