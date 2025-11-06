"use client";

import LoginForm from "@/app/components/authComponent/LoginForm";
import { useParams } from "next/navigation";

export default function LoginPage() {
  const { role } = useParams();

  return <LoginForm role={role} />;
}
