import Link from "next/link";

export interface RelatedCalculator {
  title: string;
  slug: string;
  description: string;
  icon: string; // emoji
}

interface RelatedCalculatorsProps {
  calculators: RelatedCalculator[];
}

/**
 * Grid of related calculator cards.
 * Responsive: 1 col mobile, 2 cols sm, 3 cols md, 4 cols lg.
 * Each card shows an emoji icon, title, short description, and links to the
 * calculator page.
 */
export function RelatedCalculators({ calculators }: RelatedCalculatorsProps) {
  if (calculators.length === 0) return null;

  return (
    <section className="mt-16" aria-labelledby="related-heading">
      <h2
        id="related-heading"
        className="mb-6 text-2xl font-semibold text-[#F1F5F9]"
      >
        Related Calculators
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {calculators.map((calc) => (
          <Link
            key={calc.slug}
            href={`/${calc.slug}`}
            className="group flex flex-col rounded-lg border border-[#1E293B] bg-[#162032] p-5 transition-all duration-200 hover:border-[#3B82F6]/40 hover:bg-[#162032]/80 hover:shadow-lg hover:shadow-[#3B82F6]/5"
          >
            <span
              className="mb-3 text-3xl"
              role="img"
              aria-hidden="true"
            >
              {calc.icon}
            </span>

            <h3 className="mb-1.5 text-base font-semibold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
              {calc.title}
            </h3>

            <p className="text-sm leading-relaxed text-[#94A3B8]">
              {calc.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
