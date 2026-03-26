import React, { useState } from 'react';
import axios from 'axios';
import { CreditCard, Lock, ShieldCheck, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    payment: "31.32",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onHandleSubmit = async () => {
    // Here you would typically handle form validation and submission logic
    // console.log("Payment completed", formData);
     try {
       const response = await axios.post('http://localhost:5000/api/payment', formData);
       console.log("Payment completed", response.data);
       alert("Payment successful!");
     } catch (error) {
       console.error("Error occurred while submitting payment", error);
     }

  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 grid md:grid-cols-2 gap-8 p-8 relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full"></div>
        </div>

        {/* Left Side: Order Summary & Visuals */}
        <div className="relative z-10 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold bglinear-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">Complete Payment</h2>
            <p className="text-neutral-400 mb-8">Upgrade your plan to Pro and enjoy premium features.</p>

            <div className="bg-neutral-800/50 rounded-2xl p-6 border border-neutral-700/50 backdrop-blur-sm mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-neutral-400">Pro Plan (Monthly)</span>
                <span className="font-semibold text-lg">$29.00</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-neutral-400">Taxes</span>
                <span className="font-semibold text-lg">$2.32</span>
              </div>
              <div className="h-px w-full bg-neutral-700 my-4"></div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-xl">Total</span>
                <span className="font-bold text-2xl text-white">$31.32</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-neutral-400">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Guaranteed safe & secure checkout</span>
            </div>
          </div>

          <div className="hidden md:block mt-8">
            <div className="w-full aspect-[1.586] rounded-xl bg-linear-to-br from-blue-600 to-purple-700 p-6 relative overflow-hidden shadow-xl border border-white/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-12 -translate-y-12"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl transform -translate-x-6 translate-y-6"></div>

              <div className="flex justify-between items-start z-10 relative">
                <div className="w-12 h-8 bg-white/20 rounded-md backdrop-blur-md"></div>
                <div className="text-white/80 font-mono tracking-widest text-right flex-1 italic font-bold text-2xl">VISA</div>
              </div>

              <div className="mt-8 font-mono text-xl tracking-widest text-white/90 z-10 relative">
                {formData.cardNumber.padEnd(16, '•').replace(/(.{4})/g, '$1 ').trim()}
              </div>

              <div className="flex justify-between items-end mt-6 z-10 relative text-white/80 font-mono text-sm">
                <div className="flex flex-col">
                  <span className="text-xs text-white/50 mb-1 tracking-wider uppercase">Card Holder</span>
                  <span className="uppercase truncate max-w-37.5">{formData.cardName || 'YOUR NAME'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/50 mb-1 tracking-wider uppercase">Valid Thru</span>
                  <span>{formData.expiry || 'MM/YY'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Payment Form */}
        <div className="bg-neutral-800/40 border border-neutral-700/50 rounded-2xl p-6 relative z-10 backdrop-blur-md">
          <div className="flex gap-4 mb-8">
            <button className="flex-1 py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition flex items-center justify-center gap-2 font-medium">
              <CreditCard className="w-5 h-5" />
              <span>Card</span>
            </button>
            <button className="flex-1 py-3 px-4 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition flex items-center justify-center gap-2 font-medium">
              <Smartphone className="w-5 h-5" />
              <span>Apple Pay</span>
            </button>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300 ml-1">Cardholder Name</label>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-neutral-900/50 border border-neutral-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition placeholder:text-neutral-600 focus:bg-neutral-800"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300 ml-1">Card Number</label>
              <div className="relative">
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                    handleChange({ target: { name: 'cardNumber', value: val } });
                  }}
                  maxLength={16}
                  placeholder="0000 0000 0000 0000"
                  className="w-full bg-neutral-900/50 border border-neutral-700 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition placeholder:text-neutral-600 font-mono tracking-wider focus:bg-neutral-800"
                />
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 ml-1">Expiry Date</label>
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
                    if (val.length > 2) {
                      val = val.substring(0, 2) + '/' + val.substring(2);
                    }
                    handleChange({ target: { name: 'expiry', value: val } });
                  }}
                  maxLength={5}
                  placeholder="MM/YY"
                  className="w-full bg-neutral-900/50 border border-neutral-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition placeholder:text-neutral-600 font-mono text-center focus:bg-neutral-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 ml-1">CVC</label>
                <div className="relative">
                  <input
                    type="password"
                    name="cvc"
                    value={formData.cvc}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                      handleChange({ target: { name: 'cvc', value: val } });
                    }}
                    maxLength={4}
                    placeholder="123"
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition placeholder:text-neutral-600 font-mono text-center focus:bg-neutral-800"
                  />
                </div>
              </div>
            </div>

            <motion.button
              onClick={onHandleSubmit}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-4 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Pay $31.32
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;