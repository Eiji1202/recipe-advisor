export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="absolute inset-0 bg-wallpaper-auth bg-cover bg-center" />
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </>
  );
}
