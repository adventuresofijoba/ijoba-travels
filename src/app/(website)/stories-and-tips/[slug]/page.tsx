import Header from "@/components/website/_shared/header";
import DetailsPage from "@/components/website/stories-and-tips-page/details-page";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <main>
      <Header variant="variant-2" />
      <DetailsPage slug={slug} />
    </main>
  );
}
