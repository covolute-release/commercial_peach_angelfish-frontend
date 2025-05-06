import { Button } from "@/components/button";
import { Heading } from "@/components/heading";

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading level="h1" className="text-3xl leading-10 text-ui-fg-base font-normal">
            Ecommerce Starter Template
          </Heading>
          <Heading level="h2" className="text-3xl leading-10 text-ui-fg-subtle font-normal">
            Template by Shopable
          </Heading>
        </span>
        <a
          href="https://shopable.dev/"
          target="_blank"
          rel="noopener noreferrer" // Added rel for security best practices
        >
          <Button variant="secondary">
            Learn More about Shopable
            <span className="ml-2">🛍️</span> {/* Replaced sparkle emoji with shopping bag emoji */}
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Hero;
