"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

export default function SmartSplash() {
  const [show, setShow] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if the splash has already been shown in this session
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    
    if (!hasSeenSplash) {
      setShow(true);
      // Mark as seen for future reloads in the same tab
      sessionStorage.setItem("hasSeenSplash", "true");
      
      // Start fade out after 4 seconds
      const fadeOutTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 4000);
      
      // Fully unmount after 4.5 seconds
      const unmountTimer = setTimeout(() => {
        setShow(false);
      }, 4500);
      
      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(unmountTimer);
      };
    }
  }, []);

  if (!show || !mounted) return null;

  const splashContent = (
    <div className={`splash-container ${isFadingOut ? 'fade-out' : ''}`}>
      <style>{`
        .splash-container {
            position: fixed;
            inset: 0;
            z-index: 9999999;
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background:
                radial-gradient(ellipse 70% 55% at 50% 42%, rgba(232, 121, 47, 0.16), transparent 60%),
                radial-gradient(ellipse 120% 90% at 50% 100%, #241512, #1a1211 70%);
            overflow: hidden;
            font-family: var(--font-inter, sans-serif);
            transition: opacity 0.5s ease-in-out;
        }

        .splash-container.fade-out {
            opacity: 0;
            pointer-events: none;
        }

        /* ---------- ambient ember particles ---------- */
        .embers {
            position: absolute;
            inset: 0;
            overflow: hidden;
            pointer-events: none;
        }

        .ember-dot {
            position: absolute;
            bottom: -5%;
            width: var(--s, 4px);
            height: var(--s, 4px);
            border-radius: 50%;
            background: radial-gradient(circle, #f2a45c, #e8792f 60%, transparent 75%);
            opacity: 0;
            filter: blur(0.3px);
            animation: rise var(--dur, 7s) linear infinite;
            animation-delay: var(--delay, 0s);
        }

        @keyframes rise {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            8% { opacity: .85; }
            85% { opacity: .35; }
            100% { transform: translateY(-100vh) translateX(var(--drift, 15px)); opacity: 0; }
        }

        /* ---------- badge stage ---------- */
        .stage {
            position: relative;
            width: min(62vw, 62vh, 440px);
            aspect-ratio: 768/704;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .halo {
            position: absolute;
            inset: -14%;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(243, 201, 206, 0.35), rgba(232, 121, 47, 0.12) 45%, transparent 72%);
            filter: blur(6px);
            opacity: 0;
            animation: halo-in 900ms 950ms cubic-bezier(.2, .8, .2, 1) forwards, halo-breathe 3.4s 2000ms ease-in-out infinite;
        }

        .logo-layer {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.55));
        }

        /* the fixed nameplate — appears once, then never moves again */
        .layer-mid {
            clip-path: inset(43% 0% 35% 0% round 2%);
            opacity: 0;
            transform: scale(0.94);
            animation: mid-settle 620ms 60ms cubic-bezier(.22, .9, .32, 1.15) forwards;
        }

        @keyframes mid-settle {
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        /* top badge piece */
        .layer-top {
            clip-path: inset(0% 0% 57% 0% round 2%);
            opacity: 0;
            transform: translateY(-120px) translateX(-14px) rotate(-14deg) scale(0.92);
            filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.55)) blur(4px);
            animation: drop-top 900ms 260ms cubic-bezier(.16, .9, .2, 1.28) forwards;
        }

        @keyframes drop-top {
            60% {
                opacity: 1;
                filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.55)) blur(0);
            }
            to {
                opacity: 1;
                transform: translateY(0) translateX(0) rotate(0) scale(1);
                filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.55)) blur(0);
            }
        }

        /* bottom badge piece */
        .layer-bottom {
            clip-path: inset(65% 0% 0% 0% round 2%);
            opacity: 0;
            transform: translateY(120px) translateX(14px) rotate(14deg) scale(0.92);
            filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.55)) blur(4px);
            animation: drop-bottom 900ms 260ms cubic-bezier(.16, .9, .2, 1.28) forwards;
        }

        @keyframes drop-bottom {
            60% {
                opacity: 1;
                filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.55)) blur(0);
            }
            to {
                opacity: 1;
                transform: translateY(0) translateX(0) rotate(0) scale(1);
                filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.55)) blur(0);
            }
        }

        /* impact ring at the moment logo lands */
        .impact-ring {
            position: absolute;
            inset: 8%;
            border-radius: 50%;
            border: 1.5px solid rgba(243, 220, 160, 0.0);
            opacity: 0;
            animation: ring-pulse 850ms 1080ms ease-out forwards;
            pointer-events: none;
        }

        @keyframes ring-pulse {
            0% { transform: scale(0.78); opacity: 0; border-color: rgba(243, 220, 160, 0.9); }
            35% { opacity: .9; }
            100% { transform: scale(1.18); opacity: 0; border-color: rgba(243, 220, 160, 0); }
        }

        /* diagonal shine sweep across the assembled badge */
        .shine {
            position: absolute;
            inset: 0;
            overflow: hidden;
            border-radius: 50%;
            pointer-events: none;
            z-index: 4;
        }

        .shine::after {
            content: "";
            position: absolute;
            top: -30%;
            left: -60%;
            width: 40%;
            height: 160%;
            background: linear-gradient(75deg, transparent, rgba(255, 255, 255, 0.55), transparent);
            transform: rotate(8deg);
            opacity: 0;
            animation: sweep 1600ms 1150ms ease-in-out 1, sweep-loop 5s 5.2s ease-in-out infinite;
        }

        @keyframes sweep {
            0% { left: -60%; opacity: 0; }
            12% { opacity: .9; }
            45% { opacity: .55; }
            60% { left: 130%; opacity: 0; }
            100% { left: 130%; opacity: 0; }
        }

        @keyframes sweep-loop {
            0% { left: -60%; opacity: 0; }
            8% { opacity: .55; }
            26% { opacity: 0; left: 130%; }
            100% { left: 130%; opacity: 0; }
        }

        @keyframes halo-in {
            to { opacity: 1; }
        }

        @keyframes halo-breathe {
            0%, 100% { transform: scale(1); opacity: .85; }
            50% { transform: scale(1.06); opacity: 1; }
        }

        /* ---------- tagline + loader ---------- */
        .tagline {
            margin-top: 26px;
            font-family: 'Cinzel', var(--font-playfair, serif);
            font-weight: 500;
            letter-spacing: 0.42em;
            font-size: clamp(11px, 1.6vw, 14px);
            color: #f7ece1;
            text-transform: uppercase;
            opacity: 0;
            text-align: center;
            animation: fade-up 700ms 1300ms ease-out forwards;
            z-index: 2;
        }

        .tagline span {
            color: #f2a45c;
        }

        @keyframes fade-up {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .loader {
            margin-top: 20px;
            width: 132px;
            height: 2px;
            background: rgba(247, 236, 225, 0.15);
            border-radius: 2px;
            overflow: hidden;
            opacity: 0;
            animation: fade-up 500ms 1500ms ease-out forwards;
            z-index: 2;
        }

        .loader-bar {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #c1432e, #f2a45c);
            border-radius: 2px;
            animation: fill 1.7s 1550ms cubic-bezier(.4, 0, .2, 1) forwards;
        }

        @keyframes fill {
            to { width: 100%; }
        }
      `}</style>
      
      <div className="embers" id="embers">
        {/* Render some random ember particles */}
        {[...Array(24)].map((_, i) => (
          <div 
            key={i} 
            className="ember-dot"
            style={{
              left: (Math.random() * 100) + "%",
              "--s": (Math.random() * 4 + 2) + "px",
              "--dur": (Math.random() * 5 + 4) + "s",
              "--delay": (Math.random() * 4) + "s",
              "--drift": (Math.random() * 40 - 20) + "px"
            }}
          ></div>
        ))}
      </div>
      
      <div className="stage">
        <div className="halo"></div>
        <Image className="logo-layer layer-top" src="/logo.webp" alt="Kardeşler Logo" fill priority sizes="(max-width: 768px) 100vw, 440px" />
        <Image className="logo-layer layer-mid" src="/logo.webp" alt="Kardeşler Logo" fill priority sizes="(max-width: 768px) 100vw, 440px" />
        <Image className="logo-layer layer-bottom" src="/logo.webp" alt="Kardeşler Logo" fill priority sizes="(max-width: 768px) 100vw, 440px" />
        <div className="impact-ring"></div>
        <div className="shine"></div>
      </div>
      
      <div className="tagline">
        Kardeşler <span>&middot;</span> Cihangir
      </div>
      
      <div className="loader">
        <div className="loader-bar"></div>
      </div>
      
    </div>
  );

  return createPortal(splashContent, document.body);
}
