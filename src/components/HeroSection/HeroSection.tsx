import ClientComponent from "./ClientComponent";
import { heading, imagesSection } from "./ServerComponent";

const HeroSection = () => {
  return (
    <>
      <ClientComponent imagesSection={imagesSection} heading={heading} />
    </>
  );
};

export default HeroSection;
