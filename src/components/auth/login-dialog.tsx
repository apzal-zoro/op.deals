'use client';

import { Button } from "@/components/ui/button"
import { UserCircle } from "lucide-react";
import Link from "next/link";

export function LoginDialog() {
  return (
    <Button asChild variant="ghost" size="icon">
      <Link href="/login">
        <UserCircle />
        <span className="sr-only">Login</span>
      </Link>
    </Button>
  )
}
