"use client";

import { motion } from "framer-motion";

const LoreCard = ({ title, subtitle, content, className = "", isMonarch = false }: { title: string, subtitle?: string, content: string, className?: string, isMonarch?: boolean }) => {
  return (
    <motion.div
      initial={false}
      whileHover="hover"
      className={`relative p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden group transition-all duration-700 hover:border-[#00FFFF]/30 hover:shadow-[0_0_30px_rgba(0,255,255,0.05)] ${className} ${isMonarch ? 'grayscale saturate-50 hover:grayscale-0 hover:saturate-100' : 'saturate-100 hover:saturate-200'}`}
    >
      {/* Brillo de fondo sutil en hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${isMonarch ? 'from-gray-500/5' : 'from-[#00FFFF]/5'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      
      <div className="relative z-10 h-full flex flex-col">
        <h3 className={`font-cinzel ${isMonarch ? 'text-gray-400' : 'text-[#00FFFF]'} text-xs tracking-[0.3em] uppercase mb-2 font-bold transition-colors duration-700`}>
          {title}
        </h3>
        {subtitle && (
          <h4 className="font-cinzel text-2xl text-white mb-4 tracking-wider">
            {subtitle}
          </h4>
        )}
        <motion.p
          variants={{
            hover: { opacity: 1, y: 0 },
          }}
          initial={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-gray-400 font-sans leading-relaxed text-sm mt-auto"
        >
          {content}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default function LoreSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="font-cinzel text-4xl md:text-5xl text-white mb-4 tracking-[0.2em] glow-text">
          Los Ecos de la Estasis
        </h2>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
        {/* Tarjeta 1: El Árbol del Aliento (Featured) */}
        <LoreCard
          title="El Árbol del Aliento"
          subtitle="El Último Reflejo"
          content="Xenobios no es una roca inerte, sino un organismo en coma inducido. Ese coma es lo que los Monarcas llaman Orden, y lo que nosotros conocemos como Estasis. El Árbol del Aliento es su último órgano funcional, el único acto de rebelión biológica que mantiene al mundo lejos del olvido."
          className="md:col-span-2 md:row-span-2"
        />

        {/* Tarjeta 2: Simbiosis Vital */}
        <LoreCard
          title="Simbiosis Vital"
          subtitle="Ánimas y Mofis"
          content="Las Ánimas son anticuerpos espectrales sin pasado. Para no ser borradas por el Vacío, deben vincularse a un Mofi, el último recipiente orgánico del planeta que actúa como su ancla de realidad."
          className="md:col-span-1 md:row-span-1"
        />

        {/* Tarjeta 3: Los Arquitectos de la Inmovilidad */}
        <LoreCard
          isMonarch={true}
          title="Arquitectos de la Inmovilidad"
          subtitle="Los Monarcas"
          content="Antiguos guías corrompidos por el terror a desaparecer. Han secuestrado el Lúmen construyendo Templos sobre los nodos vitales para alimentar su propia inmortalidad, condenando al mundo a una paz artificial."
          className="md:col-span-1 md:row-span-2"
        />

        {/* Tarjeta 4: El Nexo Rebelde */}
        <LoreCard
          title="El Nexo Rebelde"
          subtitle="Los Proscritos"
          content="En las sombras de los Jardines del Génesis aguardan los proscritos. Han comprendido que la salvación de Xenobios exige sacrificar el paraíso actual para que el mundo vuelva a morir y renacer."
          className="md:col-span-1 md:row-span-1"
        />
      </div>
    </section>
  );
}
