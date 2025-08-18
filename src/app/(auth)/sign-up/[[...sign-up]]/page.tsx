import CustomSignUp from "@/components/auth/CustomSignUp";
import ThemeToggle from "@/components/auth/ThemeToggle";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 relative">
      <ThemeToggle />
      <CustomSignUp />
    </div>
  );
}
