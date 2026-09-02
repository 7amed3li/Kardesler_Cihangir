import BestKebabTaksimPage, { generateMetadata as localizedMetadata } from "../[lang]/best-kebab-taksim/page";

export async function generateMetadata() {
  return await localizedMetadata({ params: { lang: "tr" } });
}

export default function RootBestKebabTaksimPage() {
  return <BestKebabTaksimPage params={{ lang: "tr" }} />;
}
