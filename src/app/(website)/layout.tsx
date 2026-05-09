import WhatsAppFAB from "@/components/website/_shared/whatsapp-fab";

export default function WebSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <WhatsAppFAB />
    </>
  );
}
