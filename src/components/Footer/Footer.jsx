import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  CreditCard,
  Truck,
  Shield,
  Headphones,
  ArrowUp,
  Heart,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Productos",
      links: [
        { label: "Tarjetas Gráficas", href: "#productos" },
        { label: "Procesadores", href: "#productos" },
        { label: "Memoria RAM", href: "#productos" },
        { label: "Almacenamiento", href: "#productos" },
        { label: "Motherboards", href: "#productos" },
        { label: "Fuentes de Poder", href: "#productos" },
      ],
    },
    {
      title: "Servicios",
      links: [
        { label: "Ensamblaje PC", href: "#ensambles" },
        { label: "Configurador", href: "#" },
        { label: "Soporte Técnico", href: "#soporte" },
        { label: "Instalación", href: "#" },
        { label: "Garantía", href: "#soporte" },
        { label: "RMA", href: "#" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { label: "Sobre Nosotros", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Carreras", href: "#" },
        { label: "Prensa", href: "#" },
        { label: "Afiliados", href: "#" },
        { label: "Mayoristas", href: "#" },
      ],
    },
    {
      title: "Ayuda",
      links: [
        { label: "Centro de Soporte", href: "#soporte" },
        { label: "Contacto", href: "#contacto" },
        { label: "FAQ", href: "#soporte" },
        { label: "Envíos", href: "#" },
        { label: "Devoluciones", href: "#" },
        { label: "Términos", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", name: "Facebook" },
    { icon: Twitter, href: "#", name: "Twitter" },
    { icon: Instagram, href: "#", name: "Instagram" },
    { icon: Youtube, href: "#", name: "YouTube" },
    { icon: Linkedin, href: "#", name: "LinkedIn" },
  ];

  const trustFeatures = [
    {
      icon: Truck,
      text: "Envío Gratis",
      subtext: "En pedidos +$500",
    },
    {
      icon: Shield,
      text: "Garantía 3 años",
      subtext: "En todos los productos",
    },
    {
      icon: Headphones,
      text: "Soporte 24/7",
      subtext: "Expertos disponibles",
    },
    {
      icon: CreditCard,
      text: "Pago Seguro",
      subtext: "Múltiples métodos",
    },
  ];

  const scrollToTop = () => {
    const startPosition = window.pageYOffset;
    const distance = startPosition;
    const duration = Math.min(1500, Math.max(800, distance / 3));
    let start = null;

    const easeOutCubic = (t) => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animateScroll = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      window.scrollTo(0, startPosition - distance * easedProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const handleLinkClick = (href) => {
    if (href.startsWith("#")) {
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);

      if (element) {
        const offset = 80;
        const startPosition = window.pageYOffset;
        const elementPosition = element.getBoundingClientRect().top;
        const targetPosition = elementPosition + startPosition - offset;
        const distance = targetPosition - startPosition;
        const duration = Math.min(1500, Math.max(800, Math.abs(distance) / 2));
        let start = null;

        const easeInOutCubic = (t) => {
          return t < 0.5
            ? 4 * t * t * t
            : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };

        const animateScroll = (currentTime) => {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const progress = Math.min(timeElapsed / duration, 1);
          const easedProgress = easeInOutCubic(progress);

          window.scrollTo(0, startPosition + distance * easedProgress);

          if (timeElapsed < duration) {
            requestAnimationFrame(animateScroll);
          }
        };

        requestAnimationFrame(animateScroll);
      }
    } else {
      console.log(`Navegando a: ${href}`);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.text}
                  className="flex items-center gap-3 text-center md:text-left justify-center md:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-gray-300" />
                  </div>
                  <div className="hidden md:block">
                    <div className="font-semibold text-sm text-white">
                      {feature.text}
                    </div>
                    <div className="text-xs text-gray-400">
                      {feature.subtext}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Zap className="text-gray-900" size={20} />
              </div>
              <span className="text-2xl font-bold">SweetCore</span>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Tu destino definitivo para componentes de PC de alta calidad.
              Construye la PC de tus sueños con los mejores productos y el
              soporte de expertos.
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-gray-300">
                <Mail size={16} />
                <span className="text-sm">contacto@sweetcore.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone size={16} />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin size={16} />
                <span className="text-sm">Silicon Valley, CA</span>
              </div>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300 group relative overflow-hidden"
                    whileHover={{
                      scale: 1.1,
                      y: -2,
                      rotate: [0, -10, 10, 0],
                      transition: { rotate: { duration: 0.6 } },
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                    />
                    <Icon
                      size={16}
                      className="text-gray-300 group-hover:text-white transition-colors duration-300 relative z-10"
                    />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (sectionIndex + 1) * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="font-bold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: linkIndex * 0.05, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <motion.button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-gray-300 hover:text-white transition-all duration-300 text-sm relative group"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">{link.label}</span>
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-white origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
              <span>
                © {currentYear} SweetCore. Todos los derechos reservados.
              </span>
              <div className="flex gap-4">
                <motion.button
                  className="hover:text-white transition-colors duration-300 relative group"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Privacidad</span>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white origin-center"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
                <motion.button
                  className="hover:text-white transition-colors duration-300 relative group"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Términos</span>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white origin-center"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
                <motion.button
                  className="hover:text-white transition-colors duration-300 relative group"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Cookies</span>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white origin-center"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
