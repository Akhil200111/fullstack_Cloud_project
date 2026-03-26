import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Lock, Calendar, User, ShieldCheck, Sparkles } from "lucide-react";

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cardNumber") {
      setFormData((prev) => ({ ...prev, cardNumber: formatCardNumber(value) }));
    } else if (name === "expiry") {
      setFormData((prev) => ({ ...prev, expiry: formatExpiry(value) }));
    } else if (name === "cvv") {
      setFormData((prev) => ({ ...prev, cvv: value.replace(/\D/g, "").slice(0, 4) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    alert("Payment submitted successfully!");
  };

  const getCardType = () => {
    const num = formData.cardNumber.replace(/\s/g, "");
    if (num.startsWith("4")) return "VISA";
    if (/^5[1-5]/.test(num)) return "MASTERCARD";
    if (num.startsWith("3")) return "AMEX";
    return null;
  };

  const cardType = getCardType();

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Floating Card Preview */}
      <motion.div
        initial={{ y: 20, opacity: 0, rotateX: 15 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4, scale: 1.02, rotateY: -2 }}
        className="relative mb-10 h-52 rounded-2xl p-7 overflow-hidden cursor-default"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--payment-glow)), hsl(var(--primary) / 0.85))",
          backgroundSize: "200% 200%",
          boxShadow: "0 25px 60px -12px hsl(var(--payment-shadow) / 0.45), 0 0 40px -10px hsl(var(--payment-glow) / 0.2)",
          perspective: "1000px",
        }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-30"
          style={{
            background: "linear-gradient(90deg, transparent 0%, hsl(var(--payment-glass) / 0.15) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
        />
        {/* Decorative circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-20" style={{ background: "radial-gradient(circle, hsl(var(--payment-glass) / 0.3), transparent)" }} />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full opacity-15" style={{ background: "radial-gradient(circle, hsl(var(--payment-glass) / 0.25), transparent)" }} />
        {/* Chip */}
        <div className="absolute top-7 left-7 w-11 h-8 rounded-md opacity-90" style={{ background: "linear-gradient(135deg, hsl(45 80% 70%), hsl(40 70% 55%))" }} />

        <div className="relative h-full flex flex-col justify-between" style={{ color: "hsl(var(--primary-foreground))" }}>
          <div className="flex justify-between items-start">
            <div className="w-11" />
            <AnimatePresence mode="wait">
              <motion.span
                key={cardType || "default"}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-sm font-bold tracking-[0.2em] opacity-90"
              >
                {cardType || "CREDIT"}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="mt-auto">
            <motion.p
              className="text-xl tracking-[0.3em] mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {formData.cardNumber || "•••• •••• •••• ••••"}
            </motion.p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] uppercase tracking-wider opacity-50 mb-0.5">Card Holder</p>
                <p className="text-xs uppercase tracking-wider font-medium opacity-90">
                  {formData.cardHolder || "YOUR NAME"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider opacity-50 mb-0.5">Expires</p>
                <p className="text-xs tracking-wider font-medium opacity-90">
                  {formData.expiry || "MM/YY"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Form Container */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card rounded-2xl p-7 space-y-5"
        style={{ boxShadow: "0 8px 32px hsl(var(--payment-shadow) / 0.06)" }}
      >
        {/* Card Number */}
        <motion.div className="space-y-2" animate={focusedField === "cardNumber" ? { scale: 1.01 } : { scale: 1 }} transition={{ duration: 0.2 }}>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Card Number</label>
          <div className="relative">
            <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              onFocus={() => setFocusedField("cardNumber")}
              onBlur={() => setFocusedField(null)}
              placeholder="1234 5678 9012 3456"
              className="payment-input"
              required
            />
          </div>
        </motion.div>

        {/* Cardholder */}
        <motion.div className="space-y-2" animate={focusedField === "cardHolder" ? { scale: 1.01 } : { scale: 1 }} transition={{ duration: 0.2 }}>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cardholder Name</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              name="cardHolder"
              value={formData.cardHolder}
              onChange={handleChange}
              onFocus={() => setFocusedField("cardHolder")}
              onBlur={() => setFocusedField(null)}
              placeholder="John Doe"
              className="payment-input"
              required
            />
          </div>
        </motion.div>

        {/* Expiry & CVV */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div className="space-y-2" animate={focusedField === "expiry" ? { scale: 1.02 } : { scale: 1 }} transition={{ duration: 0.2 }}>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Expiry Date</label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                onFocus={() => setFocusedField("expiry")}
                onBlur={() => setFocusedField(null)}
                placeholder="MM/YY"
                className="payment-input"
                required
              />
            </div>
          </motion.div>
          <motion.div className="space-y-2" animate={focusedField === "cvv" ? { scale: 1.02 } : { scale: 1 }} transition={{ duration: 0.2 }}>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">CVV</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                onFocus={() => setFocusedField("cvv")}
                onBlur={() => setFocusedField(null)}
                placeholder="•••"
                type="password"
                className="payment-input"
                required
              />
            </div>
          </motion.div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isProcessing}
          whileHover={{ scale: 1.01, y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-13 py-3.5 rounded-xl font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center gap-2.5 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--payment-glow)))",
            color: "hsl(var(--primary-foreground))",
            boxShadow: "0 8px 30px -6px hsl(var(--payment-shadow) / 0.4), inset 0 1px 0 hsl(var(--payment-glass) / 0.15)",
          }}
        >
          {isProcessing ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              Processing payment...
            </motion.span>
          ) : (
            <motion.span className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Pay $49.99
            </motion.span>
          )}
        </motion.button>

        {/* Trust Badge */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium">SSL Encrypted</span>
          </div>
          <div className="w-px h-3 bg-border" />
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Lock className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium">PCI Compliant</span>
          </div>
        </div>
      </motion.form>
    </div>
  );
};

export default PaymentForm;
