import BetaForm from "@/components/BetaForm";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import BenefitCards from "@/components/BenefitCards";
import ImageCarousel from "@/components/ImageCarousel";
import LoreSection from "@/components/LoreSection";

export default function Home() {
  return (
    <main className="flex-1 relative overflow-hidden flex flex-col">
      {/* Bioluminescence Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px]" />
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col justify-center">
        <h1 className="font-cinzel text-6xl md:text-8xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-6 drop-shadow-[0_0_25px_rgba(0,255,255,0.4)]">
          XENOBIOS
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 font-sans max-w-3xl mx-auto leading-relaxed">
          El Despertar de las Ánimas.<br />
          <span className="text-gray-500 text-lg">Un RPG multijugador de supervivencia, alianzas y magia ancestral.</span>
        </p>

        {/* Carousel de Imágenes */}
        <ImageCarousel />

        {/* Componente Beta Cerrada */}
        <BetaForm />
      </section>

      {/* Beneficios Glassmorphism */}
      <BenefitCards />

      {/* Features Section */}
      <Features />

      {/* Lore Section (Ecos de la Estasis) */}
      <LoreSection />

      <Footer />
    </main>
  );
}
