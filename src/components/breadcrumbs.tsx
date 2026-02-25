import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb navigation trail.
 * Renders: Home > Category > Calculator Name
 *
 * This is a server component. The matching BreadcrumbList JSON-LD schema is
 * emitted by CalculatorLayout so structured data stays in one place.
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[#94A3B8]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && (
                <span className="select-none text-[#1E293B]" aria-hidden="true">
                  /
                </span>
              )}

              {isLast ? (
                <span className="text-[#F1F5F9]" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[#F1F5F9]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
