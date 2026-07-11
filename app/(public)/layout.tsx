export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Public Navbar */}
      {children}
      {/* Public Footer */}
    </>
  );
}