import Gallery from "@/components/Gallery/Gallery";
import HeroSection from "@/components/HeroSection/HeroSection";
import NewsLetter from "@/components/NewsLetter/NewsLtter";
import PageSearch from "@/components/PageSearch/PageSearch";

export default function Home() {
  return (
    <>
      <div>
        {/* Hero Section */}
        <HeroSection />
        {/* Page Search Section */}
        <PageSearch />
        {/* Gallery Section */}
        <Gallery />
        {/* NewsLetter */}
        <NewsLetter />
      </div>
    </>
  );
}
