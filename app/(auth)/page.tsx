import Auth from "@/components/form/Auth/Auth";

export default function AuthPage() {
  return (
    <div className="container flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 py-8 min-h-full">
      <Auth />
    </div>
  );
}
