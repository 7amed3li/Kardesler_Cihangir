"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function SmartSplash() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Skip splash entirely on /menu (instant access) or if already seen in current session
    if (pathname === "/menu" || typeof window === "undefined") {
      return;
    }

    const hasSeenSplash = sessionStorage.getItem("kardesler_splash_seen");
    if (hasSeenSplash) {
      return;
    }

    // Mark as seen and show briefly
    sessionStorage.setItem("kardesler_splash_seen", "1");
    setShow(true);

    // Fast, ultra-smooth fade out after 800ms
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 850);

    // Unmount after 1.1s
    const unmountTimer = setTimeout(() => {
      setShow(false);
    }, 1100);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(unmountTimer);
    };
  }, [pathname]);

  if (!show) return null;

  return (
    <div className={`splash-container ${isFadingOut ? "fade-out" : ""}`}>
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
          transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity;
        }

        .splash-container.fade-out {
          opacity: 0;
          pointer-events: none;
        }

        /* Ambient embers */
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
          animation: rise var(--dur, 6s) linear infinite;
          animation-delay: var(--delay, 0s);
          will-change: transform, opacity;
        }

        @keyframes rise {
          0% { transform: translate3d(0, 0, 0); opacity: 0; }
          15% { opacity: 0.85; }
          85% { opacity: 0.35; }
          100% { transform: translate3d(var(--drift, 15px), -100vh, 0); opacity: 0; }
        }

        /* Badge stage */
        .stage {
          position: relative;
          width: min(60vw, 60vh, 380px);
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
          animation: halo-in 600ms 200ms cubic-bezier(.2, .8, .2, 1) forwards;
          will-change: opacity, transform;
        }

        .logo-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.55));
        }

        .layer-mid {
          opacity: 0;
          transform: scale(0.92);
          animation: mid-settle 500ms 50ms cubic-bezier(.22, .9, .32, 1.15) forwards;
          will-change: transform, opacity;
        }

        @keyframes mid-settle {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .impact-ring {
          position: absolute;
          inset: 8%;
          border-radius: 50%;
          border: 1.5px solid rgba(243, 220, 160, 0.9);
          opacity: 0;
          animation: ring-pulse 600ms 400ms ease-out forwards;
          pointer-events: none;
          will-change: transform, opacity;
        }

        @keyframes ring-pulse {
          0% { transform: scale(0.85); opacity: 0; }
          40% { opacity: 0.9; }
          100% { transform: scale(1.15); opacity: 0; }
        }

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
          left: 0;
          width: 40%;
          height: 160%;
          background: linear-gradient(75deg, transparent, rgba(255, 255, 255, 0.55), transparent);
          transform: translate3d(-150%, 0, 0) rotate(8deg);
          animation: sweep 800ms 450ms ease-in-out forwards;
          will-change: transform;
        }

        @keyframes sweep {
          0% { transform: translate3d(-150%, 0, 0) rotate(8deg); opacity: 0; }
          20% { opacity: 0.9; }
          80% { opacity: 0.6; }
          100% { transform: translate3d(350%, 0, 0) rotate(8deg); opacity: 0; }
        }

        @keyframes halo-in {
          to { opacity: 1; }
        }

        .tagline {
          margin-top: 20px;
          font-weight: 600;
          letter-spacing: 0.35em;
          font-size: clamp(11px, 1.5vw, 13px);
          color: #f7ece1;
          text-transform: uppercase;
          opacity: 0;
          text-align: center;
          animation: fade-up 400ms 500ms ease-out forwards;
          z-index: 2;
          will-change: transform, opacity;
        }

        .tagline span {
          color: #f2a45c;
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translate3d(0, 8px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        .loader {
          margin-top: 16px;
          width: 120px;
          height: 2px;
          background: rgba(247, 236, 225, 0.15);
          border-radius: 2px;
          overflow: hidden;
          opacity: 0;
          animation: fade-up 300ms 550ms ease-out forwards;
          z-index: 2;
        }

        .loader-bar {
          height: 100%;
          width: 100%;
          background: linear-gradient(90deg, #c1432e, #f2a45c);
          border-radius: 2px;
          transform-origin: left center;
          transform: scaleX(0);
          animation: fill 600ms 600ms cubic-bezier(.4, 0, .2, 1) forwards;
          will-change: transform;
        }

        @keyframes fill {
          to { transform: scaleX(1); }
        }
      `}</style>

      <div className="embers" id="embers">
        {[
          { left: "15%", s: "3px", dur: "5s", delay: "0s", drift: "12px" },
          { left: "35%", s: "4px", dur: "4s", delay: "0.8s", drift: "-8px" },
          { left: "55%", s: "3px", dur: "6s", delay: "0.2s", drift: "10px" },
          { left: "75%", s: "5px", dur: "4.5s", delay: "0.5s", drift: "-12px" },
        ].map((ember, i) => (
          <div
            key={i}
            className="ember-dot"
            style={{
              left: ember.left,
              "--s": ember.s,
              "--dur": ember.dur,
              "--delay": ember.delay,
              "--drift": ember.drift,
            }}
          />
        ))}
      </div>

      <div className="stage">
        <div className="halo" />
        <Image
          className="logo-layer layer-mid"
          src="/logo.webp"
          alt="Kardeşler Logo"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 380px"
        />
        <div className="impact-ring" />
        <div className="shine" />
      </div>

      <div className="tagline">
        Kardeşler <span>&middot;</span> Cihangir
      </div>

      <div className="loader">
        <div className="loader-bar" />
      </div>
    </div>
  );
}
