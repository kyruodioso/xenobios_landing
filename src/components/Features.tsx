import { Shield, Coins, Swords } from "lucide-react";

const features = [
  {
    title: "Compañeros Mofis",
    description: "Entidades de energía vital, inseparables. Te guiarán y protegerán en tu viaje.",
    icon: <Shield className="w-8 h-8 text-cyan-400 mb-4" />,
  },
  {
    title: "Economía de Lúmenes",
    description: "Riesgo y recompensa total en el Valle. Forja tu destino y tu fortuna.",
    icon: <Coins className="w-8 h-8 text-cyan-400 mb-4" />,
  },
  {
    title: "Combate Dinámico",
    description: "El nivel de tu Ánima depende de tus Mofis. Adáptate y vence a las sombras.",
    icon: <Swords className="w-8 h-8 text-cyan-400 mb-4" />,
  },
];

export default function Features() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative bg-[#0a0a0a] border border-[#333] rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.1)] hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            <div className="relative z-10">
              {feature.icon}
              <h3 className="text-xl font-cinzel font-bold text-gray-100 mb-3 group-hover:text-cyan-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
