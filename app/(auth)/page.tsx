import SignInForm from "@/components/form/SignInForm";
import SignUpForm from "@/components/form/SignUpForm";

export default function SignUp() {
  return (
    <>
      <SignUpForm />
      <div className="flex items-center lg:hidden">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-400">または</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <SignInForm />
    </>
  );
}
