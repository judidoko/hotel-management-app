import FeaturedRoom from "@/components/FeaturedRoom/FeaturedRoom";
import Gallery from "@/components/Gallery/Gallery";
import HeroSection from "@/components/HeroSection/HeroSection";
import NewsLetter from "@/components/NewsLetter/NewsLtter";
import PageSearch from "@/components/PageSearch/PageSearch";
import { getFeaturedRoom } from "./../../libs/api";

export default async function Home() {
  const featuredRoom = await getFeaturedRoom();

  return (
    <>
      <div>
        {/* Hero Section */}
        <HeroSection />
        {/* Page Search Section */}
        <PageSearch />
        {/* Featured Rooms */}
        <FeaturedRoom featuredRoom={featuredRoom} />
        {/* Gallery Section */}
        <Gallery />
        {/* NewsLetter */}
        <NewsLetter />
      </div>
    </>
  );
}
