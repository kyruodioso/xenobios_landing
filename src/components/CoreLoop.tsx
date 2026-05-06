"use client";

import { motion } from "framer-motion";
import { Compass, Swords, Flame, Sparkles } from "lucide-react";

const StepCard = ({ 
  icon: Icon, 
  title, 
  content, 
  index,
  iconColor = "text-cyan-400",
  isMonarch = false
}: { 
  icon: any, 
  title: string, 
  content: string, 
  index: number,
  iconColor?: string,
  isMonarch?: boolean
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-24 last:mb-0 transition-all duration-700 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} ${isMonarch ? 'grayscale saturate-50' : 'saturate-150'}`}
    >
      {/* Icon Section */}
      <div className="relative flex-shrink-0">
        <div className={`absolute inset-0 ${isMonarch ? 'bg-gray-500/20' : 'bg-cyan-500/20'} blur-2xl rounded-full scale-150 animate-pulse`} />
        <div className={`relative w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white/5 backdrop-blur-xl border ${isMonarch ? 'border-gray-500/30' : 'border-white/10'} flex items-center justify-center group-hover:border-cyan-400/50 transition-colors`}>
          <Icon className={`w-10 h-10 md:w-14 md:h-14 ${isMonarch ? 'text-gray-400' : iconColor} ${!isMonarch && 'drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]'}`} />
        </div>
      </div>

      {/* Content Section */}
      <div className={`flex-1 text-center ${isEven ? 'md:text-left' : 'md:text-right'}`}>
        <h3 className="font-cinzel text-2xl md:text-3xl text-white mb-4 tracking-wider flex items-center justify-center md:justify-start gap-3 flex-wrap">
          <span className="text-cyan-500/30 font-sans text-lg font-bold">0{index + 1}.</span>
          {title}
        </h3>
        <p className="text-gray-400 font-sans leading-relaxed text-lg max-w-2xl mx-auto md:mx-0">
          {content}
        </p>
        
        {/* Decorative Line (Mobile) */}
        <div className={`w-12 h-px ${isMonarch ? 'bg-gray-500/30' : 'bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent'} mx-auto mt-8 md:hidden`} />
      </div>
    </motion.div>
  );
};

export default function CoreLoop() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/5 rounded-full blur-[120px] -z-10" />

      <div className="flex flex-col items-center mb-24 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-cinzel text-4xl md:text-6xl text-white mb-6 tracking-[0.2em] glow-text"
        >
          Tu Propósito en la Estasis
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 font-sans text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-10"
        >
          El vacío devora el mundo. Como Ánima recién despertada, tu misión es táctica y brutal.
        </motion.p>

        {/* Archivo Nexo-01 Block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-16 p-6 bg-zinc-900/30 border-l-2 border-[#00FFFF] max-w-4xl mx-auto text-left backdrop-blur-sm"
        >
          <p className="font-mono text-sm text-[#00FFFF]/70 leading-relaxed uppercase tracking-tight">
            <span className="text-[#00FFFF] font-bold">ARCHIVO NEXO-01 // LA ESTASIS:</span> La Estasis no es paz; es una necrosis del tiempo. Es la parálisis artificial del ciclo vital impuesta por los Monarcas al secuestrar el Lúmen. Un mundo en Estasis es un organismo que ha dejado de respirar para no tener que morir. Es el estado de coma que precede a la desaparición absoluta bajo el Vacío.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        {/* Connecting Line (Desktop) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00FFFF]/20 to-transparent hidden md:block" />

        <StepCard
          index={0}
          icon={Compass}
          isMonarch={true}
          title="Explorar la Necrosis"
          content="Adéntrate en los Jardines del Génesis. Recorrerás biomas petrificados, ruinas bioluminiscentes y Templos corruptos donde los Monarcas custodian el Lúmen. Cada paso fuera de la Crisálida Rúnica es un riesgo."
        />

        <StepCard
          index={1}
          icon={Swords}
          iconColor="text-[#DEFF9A]"
          title="La Simbiosis Táctica"
          content="No puedes pelear solo. Captura, cría y vincúlate con los Mofis salvajes. Forma un equipo estratégico combinando elementos (Fuego, Planta, Cristal) para sobrevivir a los combates dinámicos contra la fauna corrompida y otros jugadores."
        />

        <StepCard
          index={2}
          icon={Flame}
          iconColor="text-[#00FFFF]"
          title="Recuperar la Autoridad"
          content="Reclama el Lúmen robado. Enfréntate a las fuerzas de los Monarcas o únete al Nexo Rebelde en eventos multijugador masivos. Tu objetivo final es acumular suficiente poder para forzar la Gran Exhalación y reiniciar el mundo."
        />
      </div>
    </section>
  );
}
