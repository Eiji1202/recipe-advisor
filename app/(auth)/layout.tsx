export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row justify-center w-full p-6 gap-4 lg:gap-6">
      {children}
    </div>
  );
}
