import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Globe,
  Headphones,
  Building,
  Calendar,
  Zap,
  Shield,
  Award,
} from "lucide-react";
import { useNotification } from "../../context/NotificationContext";
import oficinaImage from "../../assets/images/oficina.avif";
import centroDistribucionImage from "../../assets/images/centro_distribucion.jpg";
import servicioImage from "../../assets/images/servicio.webp";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeOffice, setActiveOffice] = useState(0);
  const { showSuccess, showError, showInfo } = useNotification();

  const contactInfo = [
    {
      icon: Phone,
      title: "Teléfono",
      primary: "+1 (555) 123-4567",
      secondary: "Lun - Vie: 9:00 AM - 6:00 PM",
      color: "bg-gray-900",
    },
    {
      icon: Mail,
      title: "Email",
      primary: "contacto@sweetcore.com",
      secondary: "Respuesta en 24 horas",
      color: "bg-gray-700",
    },
    {
      icon: Headphones,
      title: "Soporte Técnico",
      primary: "soporte@sweetcore.com",
      secondary: "Para problemas técnicos",
      color: "bg-gray-600",
    },
    {
      icon: Building,
      title: "Ventas Corporativas",
      primary: "ventas@sweetcore.com",
      secondary: "Para empresas y mayoristas",
      color: "bg-gray-500",
    },
  ];

  const offices = [
    {
      id: 0,
      name: "Oficina Principal",
      address: "1234 Tech Avenue, Silicon Valley, CA 94000",
      phone: "+1 (555) 123-4567",
      email: "info@sweetcore.com",
      hours: "Lun - Vie: 9:00 AM - 6:00 PM",
      image: oficinaImage,
    },
    {
      id: 1,
      name: "Centro de Distribución",
      address: "5678 Warehouse Blvd, Los Angeles, CA 90000",
      phone: "+1 (555) 987-6543",
      email: "distribucion@sweetcore.com",
      hours: "Lun - Sab: 8:00 AM - 8:00 PM",
      image: centroDistribucionImage,
    },
    {
      id: 2,
      name: "Centro de Servicio",
      address: "9012 Service Road, Austin, TX 73000",
      phone: "+1 (555) 456-7890",
      email: "servicio@sweetcore.com",
      hours: "Lun - Vie: 10:00 AM - 7:00 PM",
      image: servicioImage,
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: "Facebook",
      url: "#",
      color: "hover:text-grey-950",
    },
    { icon: Twitter, name: "Twitter", url: "#", color: "hover:text-grey-950" },
    {
      icon: Instagram,
      name: "Instagram",
      url: "#",
      color: "hover:text-grey-950",
    },
    { icon: Youtube, name: "YouTube", url: "#", color: "hover:text-grey-950" },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "#",
      color: "hover:text-grey-950",
    },
  ];

  const categories = [
    { value: "general", label: "Consulta General" },
    { value: "technical", label: "Soporte Técnico" },
    { value: "sales", label: "Ventas" },
    { value: "warranty", label: "Garantía" },
    { value: "partnership", label: "Asociaciones" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      showSuccess(
        "¡Mensaje enviado!",
        `Gracias ${formData.name}, hemos recibido tu mensaje. Te responderemos pronto.`,
        {
          duration: 5000,
          action: {
            label: "Ver estado",
            onClick: () =>
              showInfo("Estado", "Tu mensaje está en cola de respuesta"),
          },
        }
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        category: "general",
      });
    } catch (error) {
      showError(
        "Error al enviar",
        "Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialClick = (social) => {
    showInfo(
      `${social.name}`,
      "Próximamente tendremos nuestras redes sociales activas",
      {
        duration: 3000,
      }
    );
  };

  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = Math.max(800, Math.min(1500, Math.abs(distance) / 2));
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
  };

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Hablemos de tu <span className="text-gray-600">PC Ideal</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Estamos aquí para ayudarte a construir la PC de tus sueños.
            Contáctanos y nuestros expertos te guiarán en cada paso.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Zap, number: "< 2h", label: "Tiempo de respuesta" },
              { icon: Shield, number: "24/7", label: "Soporte disponible" },
              { icon: Award, number: "98%", label: "Satisfacción cliente" },
              {
                icon: CheckCircle,
                number: "5000+",
                label: "Consultas resueltas",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon size={20} className="text-gray-700" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            className="bg-gray-50 rounded-2xl p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                <MessageSquare size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Envíanos un mensaje
                </h3>
                <p className="text-gray-600">
                  Te responderemos en menos de 24 horas
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre completo *
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Categoría *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-all appearance-none bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Asunto *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-all"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-all resize-vertical"
                  placeholder="Cuéntanos más detalles sobre tu consulta..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Enviar Mensaje
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Otras formas de contactarnos
              </h3>

              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={info.title}
                      className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -2 }}
                    >
                      <div
                        className={`w-12 h-12 ${info.color} rounded-xl flex items-center justify-center`}
                      >
                        <Icon size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {info.title}
                        </h4>
                        <p className="text-gray-900 font-medium">
                          {info.primary}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {info.secondary}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Nuestras Oficinas
              </h3>

              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeOffice}
                      src={offices[activeOffice].image}
                      alt={offices[activeOffice].name}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                    />
                  </AnimatePresence>

                  <div className="absolute top-4 left-4 flex gap-2">
                    {offices.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveOffice(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          activeOffice === index ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    {offices[activeOffice].name}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={14} />
                      {offices[activeOffice].address}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={14} />
                      {offices[activeOffice].phone}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={14} />
                      {offices[activeOffice].email}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={14} />
                      {offices[activeOffice].hours}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {offices.map((office, index) => (
                  <motion.button
                    key={office.id}
                    onClick={() => setActiveOffice(index)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      activeOffice === index
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {office.name.split(" ")[0]}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Síguenos</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.button
                      key={social.name}
                      onClick={() => handleSocialClick(social)}
                      className={`w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 transition-all ${social.color} hover:bg-gray-200`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon size={20} />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center bg-gray-900 rounded-2xl p-8 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">
            ¿Listo para construir tu PC ideal?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Nuestros expertos están esperando para ayudarte a crear la
            configuración perfecta para tus necesidades y presupuesto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => smoothScrollTo("productos")}
            >
              Ver Productos
              <ArrowRight size={16} />
            </motion.button>
            <motion.button
              className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => smoothScrollTo("ensambles")}
            >
              PCs Pre-armadas
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
