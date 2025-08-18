"use client"
import Image from "next/image"
import Link from "next/link"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import CustomUserButton from "./CustomUserButton"

const Navbar = () => {
  return (
    <nav className="p-4 bg-transparent fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-transparent">
      <div className="max-w-5xl w-full mx-auto">
        <div className="mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/new-view.svg" alt="Lumina" width={24} height={24} />
            <span className="font-semibold text-lg">Lumina</span>
          </Link>

          {/* Auth actions */}
          <div className="flex items-center gap-2">
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="default" size="sm">Sign Up</Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <CustomUserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
