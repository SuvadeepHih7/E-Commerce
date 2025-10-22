// app/order/success/page.jsx
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function OrderSuccessPage() {
  const router = useRouter();
  const canvasRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  // Simple Confetti Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#10B981", "#34D399", "#6EE7B7", "#059669"];
    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.size = Math.random() * 8 + 4;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = Math.random() * 360;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += 2;

        if (this.y > canvas.height) {
          this.y = -10;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        
        // Simple rectangle
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
        ctx.restore();
      }
    }

    // Initialize particles
    for (let i = 0; i < 60; i++) {
      particles.push(new Particle());
    }

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f8fdf9] to-[#f0f9f4]">
      {/* Confetti Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8 max-w-md w-full text-center">
          {/* Checkmark */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Order Confirmed!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Thank you for your purchase! Your order is being prepared.
          </p>

          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm py-3 px-4 rounded-lg mb-6">
            Confirmation email will sent to you shortly.
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Redirecting to home in 5 seconds...
          </p>
        </div>
      </div>
    </div>
  );
}