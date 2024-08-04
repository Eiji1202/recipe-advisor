import SignInForm from "@/components/form/SignInForm";
import SignUpForm from "@/components/form/SignUpForm";

export default function SignUp() {
  return (
    <div className="container flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
      <SignUpForm />
      <SignInForm />
    </div>
  );
}
