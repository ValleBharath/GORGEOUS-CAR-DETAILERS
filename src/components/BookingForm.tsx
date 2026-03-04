import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../constants';
import { Calendar, Clock, User, Mail, CheckCircle2 } from 'lucide-react';

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    service: SERVICES[0].title
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-zinc-900">Booking Confirmed!</h3>
        <p className="text-zinc-600">We've received your request and will contact you shortly to confirm the details.</p>
        <button 
          onClick={() => { setIsSuccess(false); setStep(1); }}
          className="mt-8 text-gold-600 hover:text-gold-700 font-medium"
        >
          Book another service
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto glass-panel rounded-3xl p-8 shadow-2xl" id="booking-section">
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((s) => (
          <div 
            key={s}
            className={`h-1 flex-1 mx-1 rounded-full transition-colors ${
              step >= s ? 'bg-gold-500' : 'bg-zinc-200'
            }`}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold mb-4 text-zinc-900">Select Service</h3>
            <div className="grid gap-3">
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, service: service.title });
                    setStep(2);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    formData.service === service.title
                      ? 'border-gold-500 bg-gold-500/5'
                      : 'border-zinc-200 bg-zinc-50 hover:border-zinc-300'
                  }`}
                >
                  <div className="font-semibold text-zinc-900">{service.title}</div>
                  <div className="text-sm text-zinc-600">{service.price}</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold mb-4 text-zinc-900">Choose Date & Time</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-600 mb-2">Preferred Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="date"
                    required
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-gold-500 text-zinc-900"
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-zinc-600 mb-2">Preferred Time</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <select
                    required
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-gold-500 appearance-none text-zinc-900"
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  >
                    <option value="">Select a time</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-colors text-zinc-900"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={!formData.date || !formData.time}
                className="flex-1 py-3 rounded-xl gold-gradient text-white font-bold disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold mb-4 text-zinc-900">Your Information</h3>
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-gold-500 text-zinc-900"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-gold-500 text-zinc-900"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 py-3 rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-colors text-zinc-900"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.email}
                className="flex-1 py-3 rounded-xl gold-gradient text-white font-bold disabled:opacity-50 flex items-center justify-center"
              >
                {isSubmitting ? <Clock className="w-5 h-5 animate-spin" /> : 'Confirm Booking'}
              </button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
}
