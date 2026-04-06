import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/Button";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "laurent.sauzetpro@gmail.com",
    href: "mailto:laurent.sauzetpro@gmail.com",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "06 20 81 49 72",
    href: "tel:+33620814972",
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: "192 rue de Bourgogne, 03000 Moulins, France",
    href: "https://maps.app.goo.gl/6QfAzTiFkxzbrK4k7",
  },
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: null, // 'success' or 'error'
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const sanitizeInput = (value) => {
    const sanitizedValue = value.toString().trim();
    return sanitizedValue
      .replace(/<[^>]*>/g, "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    const errors = {
      name:
        !trimmedName || trimmedName.length > 100
          ? !trimmedName
            ? "Le nom est requis."
            : "Le nom ne doit pas dépasser 100 caractères."
          : "",
      email:
        !trimmedEmail || !validateEmail(trimmedEmail)
          ? !trimmedEmail
            ? "L'email est requis."
            : "Veuillez saisir une adresse email valide."
          : "",
      message:
        !trimmedMessage || trimmedMessage.length > 1000
          ? !trimmedMessage
            ? "Le message est requis."
            : "Le message ne doit pas dépasser 1000 caractères."
          : "",
    };

    setFormErrors(errors);

    if (errors.name || errors.email || errors.message) {
      setSubmitStatus({
        type: "error",
        message: "Veuillez corriger les erreurs du formulaire avant d'envoyer.",
      });
      return;
    }

    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      const missingEnvVars = [
        !serviceId && "VITE_EMAILJS_SERVICE_ID",
        !templateId && "VITE_EMAILJS_TEMPLATE_ID",
        !publicKey && "VITE_EMAILJS_PUBLIC_KEY",
      ].filter(Boolean);

      if (missingEnvVars.length > 0) {
        throw new Error(
          `EmailJS configuration is missing. Please check ${missingEnvVars.join(", ")}.`,
        );
      }

      const sanitizedData = {
        name: sanitizeInput(trimmedName),
        email: sanitizeInput(trimmedEmail),
        message: sanitizeInput(trimmedMessage),
      };

      await emailjs.send(
        serviceId,
        templateId,
        sanitizedData,
        publicKey,
      );

      setSubmitStatus({
        type: "success",
        message: "Message bien envoyé ! Je reviendrais vers vous rapidement.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setSubmitStatus({
        type: "error",
        message:
          err?.text || err?.message ||
          "Erreur d'envoi de message. Veuillez réessayer plus tard.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Construisons{" "}
            <span className="font-serif italic font-normal text-white">
              quelque chose de grand.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            Vous avez un projet en tête ? Je serais ravi d’en discuter.
            Envoyez-moi un message et voyons ensemble comment nous pouvons
            collaborer.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="glass p-8 rounded-3xl border border-primary/30 animate-fade-in animation-delay-300">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Nom
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Votre nom..."
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    setFormErrors({ ...formErrors, name: "" });
                  }}
                  className={`w-full px-4 py-3 bg-surface rounded-xl border focus:ring-1 outline-none transition-all ${
                    formErrors.name
                      ? "border-red-500/40 focus:border-red-500 focus:ring-red-500"
                      : "border-border focus:border-primary focus:ring-primary"
                  }`}
                />
                {formErrors.name && (
                  <p className="mt-2 text-sm text-red-400">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setFormErrors({ ...formErrors, email: "" });
                  }}
                  className={`w-full px-4 py-3 bg-surface rounded-xl border focus:ring-1 outline-none transition-all ${
                    formErrors.email
                      ? "border-red-500/40 focus:border-red-500 focus:ring-red-500"
                      : "border-border focus:border-primary focus:ring-primary"
                  }`}
                />
                {formErrors.email && (
                  <p className="mt-2 text-sm text-red-400">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    setFormErrors({ ...formErrors, message: "" });
                  }}
                  placeholder="Votre message..."
                  className={`w-full px-4 py-3 bg-surface rounded-xl border focus:ring-1 outline-none transition-all resize-none ${
                    formErrors.message
                      ? "border-red-500/40 focus:border-red-500 focus:ring-red-500"
                      : "border-border focus:border-primary focus:ring-primary"
                  }`}
                />
                {formErrors.message && (
                  <p className="mt-2 text-sm text-red-400">{formErrors.message}</p>
                )}
              </div>

              <Button
                className="w-full"
                type="submit"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>Envoi en cours...</>
                ) : (
                  <>
                    Envoyer le message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </Button>

              {submitStatus.type && (
                <div
                  className={`flex items-center gap-3
                     p-4 rounded-xl ${
                       submitStatus.type === "success"
                         ? "bg-green-500/10 border border-green-500/20 text-green-400"
                         : "bg-red-500/10 border border-red-500/20 text-red-400"
                     }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <p className="text-sm">{submitStatus.message}</p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 animate-fade-in animation-delay-400">
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-semibold mb-6">
                Informations de contact
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {item.label}
                      </div>
                      <div className="font-medium">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Card */}
            <div className="glass rounded-3xl p-8 border border-primary/30">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">Actuellement disponible</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Je suis actuellement ouvert aux nouvelles opportunités et
                projets passionnants. Que vous ayez besoin d'un ingénieur à
                temps plein ou d'un consultant freelance, parlons-en !
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
