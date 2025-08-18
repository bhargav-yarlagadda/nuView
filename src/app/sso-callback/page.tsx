"use client";

import { useEffect } from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function SSOCallbackPage() {
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const router = useRouter();

  useEffect(() => {
    if (!signInLoaded || !signUpLoaded) return;

    const handleSSOCallback = async () => {
      try {
        // Handle the OAuth callback
        const result = await signIn.attemptFirstFactor({
          strategy: "oauth_google",
          redirectUrl: "/sso-callback",
        });

        if (result.status === "complete") {
          router.push("/");
        } else if (result.status === "needs_second_factor") {
          // Handle 2FA if needed
          router.push("/");
        } else {
          // Something went wrong
          router.push("/sign-in?error=oauth_failed");
        }
      } catch (error) {
        console.error("SSO callback error:", error);
        router.push("/sign-in?error=oauth_failed");
      }
    };

    handleSSOCallback();
  }, [signIn, signUp, signInLoaded, signUpLoaded, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
        <h2 className="text-xl font-semibold text-foreground">
          Completing sign in...
        </h2>
        <p className="text-muted-foreground">
          Please wait while we complete your authentication.
        </p>
      </div>
    </div>
  );
}
