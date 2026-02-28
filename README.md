# CalcEngine

A comprehensive suite of free, privacy-first financial calculators built with Next.js 16, React 19, and Tailwind CSS 4.

**Live Site:** [calcengine.org](https://calcengine.org)

## Features

- **30+ Financial Calculators** covering mortgages, retirement, taxes, salary, loans, and more
- **Privacy-First Design** — All calculations run client-side in your browser. No data is ever sent to servers.
- **Modern UI** — Dark theme with smooth animations and responsive design
- **SEO Optimized** — Dynamic sitemaps, OpenGraph images, JSON-LD schemas
- **Accessible** — ARIA labels, keyboard navigation, skip links
- **PWA Ready** — Web app manifest with shortcuts to popular calculators

## Calculator Categories

| Category | Calculators |
|----------|-------------|
| **Mortgage & Housing** | Mortgage, Home Affordability, Rent vs Buy |
| **Retirement & Investing** | 401(k), Retirement, Compound Interest, TSP |
| **Salary & Career** | Salary to Hourly, Hourly to Salary, Raise, Overtime, Freelance Rate |
| **Tax Calculators** | Federal Tax, Self-Employment Tax, Take-Home Pay |
| **Debt & Loans** | Loan, Auto Loan, Student Loan, Debt Payoff |
| **Government Pay** | GS Pay, Military Pay, FERS Retirement, TSP |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4
- **Charts:** Recharts
- **Testing:** Vitest
- **Deployment:** Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/williamDalston/niche-financial-calculator-suite.git
cd niche-financial-calculator-suite

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Environment Variables

Edit `.env.local` with your values:

```bash
# Site URL (used for metadata and canonical URLs)
NEXT_PUBLIC_SITE_URL=https://calcengine.org

# Google AdSense Publisher ID (leave blank to disable ads)
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=

# Google Analytics Measurement ID (leave blank to disable analytics)
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Search Engine Verification (leave blank if not yet registered)
NEXT_PUBLIC_GOOGLE_VERIFICATION=
NEXT_PUBLIC_BING_VERIFICATION=
```

### Development

```bash
# Start development server
npm run dev

# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run typecheck

# Build for production
npm run build
```

The development server runs at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── calculators/        # Individual calculator pages
│   ├── category/           # Category listing pages
│   ├── compare/            # Comparison tool pages
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── privacy/            # Privacy policy
│   └── terms/              # Terms of service
├── components/             # Reusable React components
│   └── ui/                 # UI primitives (inputs, sliders, etc.)
├── data/                   # Static data (pay tables, CPI, etc.)
├── hooks/                  # Custom React hooks
└── lib/                    # Utility functions and calculators
    └── calculators/        # Core calculation logic with tests
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Monetization Setup

### Google AdSense

1. Get your AdSense publisher ID from [Google AdSense](https://www.google.com/adsense)
2. Add it to `.env.local` as `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID`
3. Update `public/ads.txt` with your publisher ID:
   ```
   google.com, pub-YOURPUBLISHERID, DIRECT, f08c47fec0942fa0
   ```

### Google Analytics

1. Create a property in [Google Analytics](https://analytics.google.com)
2. Add the Measurement ID to `.env.local` as `NEXT_PUBLIC_GA_MEASUREMENT_ID`

## Testing

The project uses Vitest for testing. Core calculation logic has comprehensive test coverage:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Contact

- **Email:** info@alstonanalytics.com
- **GitHub:** [@williamDalston](https://github.com/williamDalston)

---

Built with precision by [Alston Analytics](https://alstonanalytics.com)
