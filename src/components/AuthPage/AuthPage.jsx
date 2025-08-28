import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Zap,
  Shield,
  Star,
  Users,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

const AuthPage = ({ mode = "login", onBack }) => {
  const [currentMode, setCurrentMode] = useState(mode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const switchMode = (newMode) => {
    setCurrentMode(newMode);
    setFormData({
      email: "",
      password: "",
      rememberMe: false,
    });
  };

  const stats = [
    { icon: Users, value: "50K+", label: "Usuarios activos" },
    { icon: Star, value: "4.9", label: "Rating promedio" },
    { icon: TrendingUp, value: "98%", label: "Satisfacción" },
  ];

  const features = [
    "Configurador de PC personalizado",
    "Ofertas exclusivas para miembros",
    "Comparador de precios en tiempo real",
    "Seguimiento de pedidos avanzado",
    "Soporte técnico prioritario",
    "Garantía extendida gratuita",
  ];

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const leftSideVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="min-h-screen flex"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        variants={leftSideVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0">
          <motion.div
            key={currentMode}
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                currentMode === "login"
                  ? `url('https://i.redd.it/8superkxzz8b1.jpg')`
                  : `url('https://nzxt.com/cdn/shop/articles/lucy1601.jpg?v=1751575834&width=4032')`,
            }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/30" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
              <Zap className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">SweetCore</span>
          </motion.div>

          <div></div>
        </div>
      </motion.div>

      <motion.div
        className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-16 bg-white relative"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="lg:hidden mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
              <Zap className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold">SweetCore</span>
          </div>
        </div>

        {onBack && (
          <motion.button
            onClick={onBack}
            className="absolute top-8 left-8 p-3 hover:bg-gray-100 rounded-2xl transition-colors group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft
              size={20}
              className="text-gray-600 group-hover:text-gray-900 transition-colors"
            />
          </motion.button>
        )}

        <div className="max-w-md mx-auto w-full">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {currentMode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
            </h2>
            <p className="text-gray-600 text-lg">
              {currentMode === "login"
                ? "Ingresa tus credenciales para continuar"
                : "Únete a la comunidad SweetCore"}
            </p>
          </motion.div>

          <motion.div
            className="flex bg-gray-100 rounded-2xl p-1 mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => switchMode("login")}
              className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all ${
                currentMode === "login"
                  ? "text-gray-900 bg-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => switchMode("register")}
              className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all ${
                currentMode === "register"
                  ? "text-gray-900 bg-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Crear Cuenta
            </button>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.form
              key={currentMode}
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, x: currentMode === "login" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: currentMode === "login" ? 20 : -20 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-900 transition-all placeholder:text-gray-400 text-lg hover:border-gray-300"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-900 transition-all placeholder:text-gray-400 text-lg hover:border-gray-300"
                    placeholder={
                      currentMode === "login"
                        ? "Tu contraseña"
                        : "Mínimo 8 caracteres"
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-gray-900 border-gray-300 rounded-lg focus:ring-gray-900 focus:ring-2 accent-gray-900"
                  />
                  <span className="ml-3 text-sm text-gray-600">
                    {currentMode === "login"
                      ? "Recordarme"
                      : "Acepto términos y condiciones"}
                  </span>
                </label>

                {currentMode === "login" && (
                  <button
                    type="button"
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                )}
              </div>

              <motion.button
                type="submit"
                className="w-full bg-gray-900 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3 group"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {currentMode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.button>
            </motion.form>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthPage;
