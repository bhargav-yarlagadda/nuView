import CustomSignIn from "@/components/auth/CustomSignIn";
import ThemeToggle from "@/components/auth/ThemeToggle";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 relative">
      <ThemeToggle />
      <CustomSignIn />
    </div>
  );
}
