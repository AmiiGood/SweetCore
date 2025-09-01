import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  Download,
  Video,
  ToolCase,
  Shield,
  Headphones,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Zap,
} from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

const SupportSection = () => {
  const [activeTab, setActiveTab] = useState("faq");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const { showSuccess, showInfo } = useNotification();

  const supportTabs = [
    { id: "faq", label: "FAQ", icon: BookOpen },
    { id: "contact", label: "Contacto", icon: MessageCircle },
    { id: "resources", label: "Recursos", icon: Download },
    { id: "warranty", label: "Garantía", icon: Shield },
  ];

  const faqData = [
    {
      id: 1,
      category: "Órdenes y Envío",
      question: "¿Cuánto tiempo tarda el envío?",
      answer:
        "Los envíos estándar tardan entre 3-5 días hábiles. Ofrecemos envío express de 1-2 días hábiles por un costo adicional. Todos los pedidos se procesan dentro de 24 horas.",
    },
    {
      id: 2,
      category: "Órdenes y Envío",
      question:
        "¿Puedo cambiar mi dirección de envío después de realizar el pedido?",
      answer:
        "Puedes cambiar tu dirección de envío si tu pedido aún no ha sido procesado. Contáctanos inmediatamente después de realizar tu pedido para hacer cambios.",
    },
    {
      id: 3,
      category: "Productos y Compatibilidad",
      question: "¿Cómo sé si los componentes son compatibles?",
      answer:
        "Nuestro equipo técnico verifica la compatibilidad antes del envío. También puedes usar nuestro configurador de PC o contactar a nuestros expertos para asesoría personalizada.",
    },
    {
      id: 4,
      category: "Productos y Compatibilidad",
      question: "¿Los componentes vienen con garantía del fabricante?",
      answer:
        "Sí, todos nuestros productos incluyen garantía completa del fabricante. Además, ofrecemos una garantía extendida de SweetCore para mayor tranquilidad.",
    },
    {
      id: 5,
      category: "Soporte Técnico",
      question: "¿Ofrecen ayuda para el ensamblaje?",
      answer:
        "Sí, ofrecemos guías de ensamblaje, videos tutoriales y soporte técnico por chat. También tenemos servicio de ensamblaje profesional disponible.",
    },
    {
      id: 6,
      category: "Soporte Técnico",
      question: "¿Qué hago si mi componente no funciona?",
      answer:
        "Contáctanos inmediatamente. Ofrecemos soporte técnico completo, diagnóstico remoto y proceso de RMA rápido para componentes defectuosos.",
    },
    {
      id: 7,
      category: "Devoluciones",
      question: "¿Cuál es su política de devoluciones?",
      answer:
        "Aceptamos devoluciones dentro de 30 días de la compra. Los productos deben estar en condición original. Los gastos de envío de devolución corren por cuenta del cliente, excepto en caso de productos defectuosos.",
    },
  ];

  const contactMethods = [
    {
      id: "chat",
      icon: MessageCircle,
      title: "Chat en Vivo",
      description: "Respuesta inmediata de nuestros expertos",
      availability: "Lun - Vie: 9:00 AM - 8:00 PM",
      action: "Iniciar Chat",
      color: "bg-gray-900",
    },
    {
      id: "phone",
      icon: Phone,
      title: "Teléfono",
      description: "Habla directamente con nuestro equipo",
      availability: "+1 (555) 123-4567",
      action: "Llamar Ahora",
      color: "bg-gray-700",
    },
    {
      id: "email",
      icon: Mail,
      title: "Email",
      description: "Respuesta dentro de 24 horas",
      availability: "soporte@sweetcore.com",
      action: "Enviar Email",
      color: "bg-gray-600",
    },
  ];

  const resources = [
    {
      id: "manual",
      icon: BookOpen,
      title: "Manuales de Usuario",
      description: "Guías completas para todos nuestros productos",
      type: "PDF",
    },
    {
      id: "software",
      icon: Download,
      title: "Drivers y Software",
      description: "Últimas versiones de drivers y utilidades",
      type: "ZIP",
    },
    {
      id: "videos",
      icon: Video,
      title: "Video Tutoriales",
      description: "Aprende a ensamblar y configurar tu PC",
      type: "MP4",
    },
    {
      id: "tools",
      icon: ToolCase,
      title: "Herramientas de Diagnóstico",
      description: "Software para probar y diagnosticar componentes",
      type: "EXE",
    },
  ];

  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactMethod = (method) => {
    switch (method.id) {
      case "chat":
        showInfo(
          "Chat próximamente",
          "El chat en vivo estará disponible muy pronto. Por ahora puedes contactarnos por email.",
          {
            duration: 4000,
            action: {
              label: "Enviar email",
              onClick: () => handleContactMethod({ id: "email" }),
            },
          }
        );
        break;
      case "phone":
        showInfo("Llamar", "Número: +1 (555) 123-4567");
        break;
      case "email":
        window.location.href = "mailto:soporte@sweetcore.com";
        break;
    }
  };

  const handleDownload = (resource) => {
    showSuccess(
      "Descarga iniciada",
      `${resource.title} se está descargando...`,
      {
        action: {
          label: "Ver descargas",
          onClick: () => console.log("Ver descargas"),
        },
      }
    );
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="soporte" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Centro de <span className="text-gray-600">Soporte</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Estamos aquí para ayudarte. Encuentra respuestas rápidas, recursos
            útiles y contacta con nuestros expertos.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12 bg-white p-2 rounded-2xl shadow-sm border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {supportTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute inset-0 bg-gray-900 rounded-xl"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative flex items-center gap-2 z-10">
                  <Icon size={16} />
                  {tab.label}
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "faq" && (
            <motion.div
              key="faq"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Buscar en preguntas frecuentes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-all text-lg placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="max-w-4xl mx-auto space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.button
                      onClick={() =>
                        setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                      }
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      whileHover={{ backgroundColor: "#f9fafb" }}
                    >
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 font-medium mb-1">
                          {faq.category}
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          {faq.question}
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={20} className="text-gray-400" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {expandedFaq === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}

                {filteredFaqs.length === 0 && (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <AlertCircle
                      size={48}
                      className="text-gray-400 mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No se encontraron resultados
                    </h3>
                    <p className="text-gray-600">
                      Intenta con otros términos de búsqueda o{" "}
                      <button
                        onClick={() => setActiveTab("contact")}
                        className="text-gray-900 hover:underline font-medium"
                      >
                        contáctanos directamente
                      </button>
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "contact" && (
            <motion.div
              key="contact"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <motion.div
                      key={method.id}
                      className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div
                        className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center mb-4`}
                      >
                        <Icon size={24} className="text-white" />
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {method.title}
                      </h3>

                      <p className="text-gray-600 mb-3">{method.description}</p>

                      <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                        <Clock size={16} />
                        {method.availability}
                      </div>

                      <motion.button
                        onClick={() => handleContactMethod(method)}
                        className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {method.action}
                        <ArrowRight size={16} />
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                className="mt-12 bg-white rounded-2xl p-8 border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Zap size={20} />
                  Tips para Contacto Rápido
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex gap-3">
                    <CheckCircle
                      size={20}
                      className="text-gray-900 flex-shrink-0 mt-1"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Ten tu número de orden listo
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Nos ayuda a encontrar tu información más rápido
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle
                      size={20}
                      className="text-gray-900 flex-shrink-0 mt-1"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Describe el problema detalladamente
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Incluye mensajes de error y pasos que seguiste
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "resources" && (
            <motion.div
              key="resources"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {resources.map((resource, index) => {
                  const Icon = resource.icon;
                  return (
                    <motion.div
                      key={resource.id}
                      className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gray-900 transition-colors duration-300">
                        <Icon
                          size={24}
                          className="text-gray-700 group-hover:text-white transition-colors duration-300"
                        />
                      </div>

                      <h3 className="font-bold text-gray-900 mb-2">
                        {resource.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4">
                        {resource.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {resource.type}
                        </span>
                        <motion.button
                          onClick={() => handleDownload(resource)}
                          className="text-gray-900 hover:bg-gray-900 hover:text-white p-2 rounded-lg transition-all"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Download size={16} />
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === "warranty" && (
            <motion.div
              key="warranty"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-8 border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield size={32} className="text-gray-900" />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Garantía SweetCore
                      </h3>
                      <p className="text-gray-600">
                        Protección completa para tus componentes
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4">
                        Cobertura Incluida
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Garantía del fabricante completa",
                          "Soporte técnico especializado",
                          "Proceso RMA simplificado",
                          "Reemplazo rápido de componentes",
                        ].map((item, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-gray-900" />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-4">
                        Períodos de Garantía
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Tarjetas Gráficas
                          </span>
                          <span className="font-semibold">3 años</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Procesadores</span>
                          <span className="font-semibold">3 años</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Memoria RAM</span>
                          <span className="font-semibold">Vida útil</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">SSD/HDD</span>
                          <span className="font-semibold">2-5 años</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                    <h4 className="font-bold text-gray-900 mb-2">
                      ¿Necesitas hacer una reclamación?
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Nuestro proceso de garantía es simple y rápido. Contacta a
                      nuestro equipo con tu número de orden y descripción del
                      problema.
                    </p>
                    <motion.button
                      onClick={() => setActiveTab("contact")}
                      className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Iniciar Reclamación
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SupportSection;
