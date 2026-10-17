import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Owners } from "@/components/Owners";
import { AppPromotion } from "@/components/AppPromotion";
import { Faq } from "@/components/Faq";
import { FinalCall } from "@/components/FinalCall";
import { IconDefinitions } from "@/components/IconDefinitions";
import { RentalProvider } from "@/components/rental/RentalProvider";
import { RentalDialog } from "@/components/rental/VehicleDialog";
import { SearchForm } from "@/components/rental/SearchForm";
import { VehicleCatalogue } from "@/components/rental/VehicleCatalogue";
import { Occasions } from "@/components/rental/Occasions";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <SiteHeader />
      <RentalProvider>
        <main id="contenu">
          <Hero />
          <SearchForm />
          <VehicleCatalogue />
          <Occasions />
          <HowItWorks />
          <Owners />
          <AppPromotion />
          <Faq />
          <FinalCall />
        </main>
        <RentalDialog />
      </RentalProvider>
      <SiteFooter />
      <IconDefinitions />
    </>
  );
}
