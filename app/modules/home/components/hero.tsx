import { Button } from "@/components/button";
import { Heading } from "@/components/heading";

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading level="h1" className="text-3xl leading-10 text-ui-fg-base font-normal">
            Petopia Emporium
          </Heading>
          <Heading level="h2" className="text-3xl leading-10 text-ui-fg-subtle font-normal">
            Your One-Stop Shop for Pet Joy!
          </Heading>
        </span>
        <LocalizedClientLink href="/store">
          <Button variant="primary"> {/* Ensure this uses the new primary color (purple) */}
            Explore Pet Goodies
            <span className="ml-2">🐾</span>
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default Hero;