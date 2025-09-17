"use client";

import { UploadCloud, Sparkles, Download } from "lucide-react";

const features = [
  {
    icon: <UploadCloud className="h-10 w-10 text-primary" />,
    title: "Upload Your Photo",
    description:
      "Choose a clear, front-facing photo with good lighting for the best results.",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: "Choose a Style & Get Your Result",
    description:
      "Our AI will analyze your photo and generate dozens of hairstyle options in seconds.",
  },
  {
    icon: <Download className="h-10 w-10 text-primary" />,
    title: "Save Your Favorite Looks",
    description:
      "Download your favorite transformations in high quality and share them with friends.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-16 sm:py-24 bg-secondary">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three simple steps to your new look.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="feature-card flex flex-col items-center text-center p-8">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

