import CustomSignIn from "@/components/auth/CustomSignIn";
import ThemeToggle from "@/components/auth/ThemeToggle";
import DotGridBackground from "@/components/common/DotGridBackground";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 relative overflow-hidden">
      <DotGridBackground />
      <ThemeToggle />
      <CustomSignIn />
    </div>
  );
}
