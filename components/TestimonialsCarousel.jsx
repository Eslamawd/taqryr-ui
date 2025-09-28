"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TestimonialsCarousel() {
  const testimonials = [
    {
      text: "منصة تقرير ساعدتنا نطلق حملاتنا بسرعة وبدون تعقيدات، مع تقارير واضحة عن الأداء.",
      name: "أحمد الزهراني",
      role: "شركة تسويق رقمية",
    },
    {
      text: "أكثر ما أعجبني هو الامتثال المحلي وإصدار التصاريح بشكل سريع، وفر علينا وقت وجهد.",
      name: "سارة العبدالله",
      role: "مديرة حملات",
    },
    {
      text: "لوحة التحكم سهلة الاستخدام والتقارير الفورية أعطتنا رؤية واضحة على نتائج الحملات.",
      name: "محمد القحطاني",
      role: "وكالة دعاية وإعلان",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000); // يتغير كل 4 ثواني
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="bg-gray-800 py-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-50 mb-12">آراء العملاء</h2>

        <div className="relative h-48 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              className="bg-black p-6 rounded-3xl shadow max-w-xl mx-auto"
            >
              <p className="text-gray-50 mb-4">"{testimonials[index].text}"</p>
              <h4 className="font-semibold text-gray-50">
                {testimonials[index].name}
              </h4>
              <span className="text-sm text-green-500">
                {testimonials[index].role}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${
                i === index ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsCarousel;
