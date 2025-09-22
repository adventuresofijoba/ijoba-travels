import Footer from "@/components/website/_shared/footer";

export default function WebSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid">
      {children}
      <Footer />
    </div>
  );
}
