import { Code2, Lightbulb, Rocket, Users } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Écrire un code maintenable et évolutif, pensé pour durer.",
  },
  {
    icon: Rocket,
    title: "Performance",
    description:
      "Optimiser la performance pour offrir des expériences ultra-rapides.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Travailler en étroite collaboration avec les équipes pour concrétiser les idées.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Rester à la pointe avec les dernières technologies et les meilleures pratiques.",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
                A propos
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
              Imaginer le futur,
              <span className="font-serif italic font-normal text-white">
                {" "}
                un composant à la fois.
              </span>
            </h2>

            <div className="space-y-4 text-muted-foreground animate-fade-in animation-delay-200">
              <p>
                Développeur fullstack passionné avec plus de 5 ans d’expérience,
                je conçois des produits numériques utiles et performants. Mon
                parcours a commencé par une curiosité pour le fonctionnement du
                web, devenue aujourd’hui une véritable expertise des
                technologies modernes.
              </p>
              <p>
                Spécialisé en React, Next.js et TypeScript, je développe aussi
                bien des landing pages soignées que des applications complexes.
                Mon approche allie exigence technique, sens du détail et
                attention portée à l’expérience utilisateur.
              </p>
              <p>
                En dehors du code, j’explore de nouvelles technologies,
                contribue à des projets open source et partage mes connaissances
                avec la communauté des développeurs.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300">
              <p className="text-lg font-medium italic text-foreground">
                "La mission que je me suis fixée ? Créer des expériences
                numériques à la fois performantes et agréables des produits
                pensés pour les utilisateurs autant que pour les développeurs."
              </p>
            </div>
          </div>

          {/* Right Column - Hilights */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="glass p-6 rounded-2xl animate-fade-in"
                style={{ animationDelay: `${(idx + 1) * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
