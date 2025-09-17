"use client";

const examples = [
  {
    before: "https://placehold.co/600x800/292438/FFFFFF?text=Before",
    after: "https://placehold.co/600x800/7F56D9/FFFFFF?text=After",
    description: "Elegant Bob",
  },
  {
    before: "https://placehold.co/600x800/292438/FFFFFF?text=Before",
    after: "https://placehold.co/600x800/00C49A/FFFFFF?text=After",
    description: "Bold Pixie Cut",
  },
  {
    before: "https://placehold.co/600x800/292438/FFFFFF?text=Before",
    after: "https://placehold.co/600x800/7F56D9/FFFFFF?text=After",
    description: "Long Waves",
  },
];

const BeforeAfterCard = ({ before, after, description }: { before: string; after: string; description: string }) => (
  <div className="group relative overflow-hidden rounded-lg border border-border bg-card">
    <div className="flex">
      <div className="w-1/2 relative">
        <img src={before} alt="Before" width={300} height={400} className="object-cover w-full h-full" />
        <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 text-xs rounded">BEFORE</div>
      </div>
      <div className="w-1/2 relative">
        <img src={after} alt="After" width={300} height={400} className="object-cover w-full h-full" />
        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 text-xs rounded">AFTER</div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
      <h3 className="text-lg font-semibold text-white">{description}</h3>
    </div>
  </div>
);

const Examples = () => {
  return (
    <section id="examples" className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get Inspired by Our Creations
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See how GlamAI Look Lab can transform any look.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map((example, index) => (
            <BeforeAfterCard key={index} {...example} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Examples;

