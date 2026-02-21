import FeatureCard from "./FeatureCard";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features?: Feature[];
  columns?: 2 | 3 | 4;
}

const defaultFeatures: Feature[] = [
  {
    icon: "✨",
    title: "Simple & Clean",
    description: "Intuitive interface designed for focus",
  },
  {
    icon: "🔒",
    title: "Secure & Private",
    description: "Your tasks are yours alone",
  },
  {
    icon: "☁️",
    title: "Cloud Synced",
    description: "Access anywhere, anytime",
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    description: "Built for speed and performance",
  },
];

export default function FeatureGrid({
  features = defaultFeatures,
  columns = 4,
}: FeatureGridProps) {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
