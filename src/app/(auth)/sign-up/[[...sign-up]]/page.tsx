import CustomSignUp from "@/components/auth/CustomSignUp";
import ThemeToggle from "@/components/auth/ThemeToggle";
import DotGridBackground from "@/components/common/DotGridBackground";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 relative overflow-hidden">
      <DotGridBackground />
      <ThemeToggle />
      <CustomSignUp />
    </div>
  );
}
