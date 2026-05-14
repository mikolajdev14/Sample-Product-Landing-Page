import BackgroundFX from "@/components/BackgroundFX";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoCloud from "@/components/LogoCloud";
import Features from "@/components/Features";
import Dashboard from "@/components/Dashboard";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

/**
 * FlowSync AI — landing page entry point.
 *
 * Composition order matches the brief:
 *  1. Sticky Navbar
 *  2. Hero
 *  3. Logo Cloud
 *  4. Features
 *  5. Interactive Dashboard
 *  6. Testimonials
 *  7. Pricing
 *  8. FAQ
 *  9. Final CTA
 *  10. Footer
 */
export default function Page() {
  return (
    <>
      {/* Decorative background lives at the document level */}
      <BackgroundFX />

      {/* Bespoke animated cursor (auto-disabled on touch + reduced-motion) */}
      <CustomCursor />

      {/* Top scroll-progress bar */}
      <ScrollProgress />

      <Navbar />

      <main id="main" className="relative">
        <Hero />
        <LogoCloud />
        <Features />
        <Dashboard />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />

      {/* Organisation structured data for SEO */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "FlowSync AI",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "19",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "2412",
            },
          }),
        }}
      />
    </>
  );
}
