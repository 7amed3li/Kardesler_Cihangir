"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, UtensilsCrossed } from "lucide-react";

// Convert URLs in text to clickable links
function renderMessageText(text) {
  // Match URLs: http(s)://..., wa.me/..., and bare domain patterns
  const urlRegex = /(https?:\/\/[^\s)]+|wa\.me\/[^\s)]+)/gi;
  const parts = text.split(urlRegex);
  
  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      // Reset regex lastIndex after test
      urlRegex.lastIndex = 0;
      const href = part.startsWith('http') ? part : `https://${part}`;
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-gold/60 underline-offset-2 hover:text-gold transition-colors font-medium"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef(null);

  // Focus management
  const inputRef = useRef(null);
  const chatWindowRef = useRef(null);

  const getLocalizedStrings = () => {
    // Basic client-side localization for static UI
    const lang = typeof navigator !== "undefined" ? navigator.language : "en";
    if (lang.startsWith("tr")) {
      return {
        greeting: "Merhaba! Menüden ne istersiniz? Yerel lezzetler mi, yoksa tanıdık tatlar mı arıyorsunuz? Herhangi bir diyet tercihiniz var mı?",
        placeholder: "Mesajınızı yazın...",
        send: "Gönder",
        contact: "Bizimle WhatsApp üzerinden iletişime geçin",
        loading: "Yazıyor..."
      };
    } else if (lang.startsWith("ar")) {
      return {
        greeting: "مرحباً! هل تبحث عن أطباق محلية أم مألوفة؟ هل لديك أي تفضيلات غذائية؟",
        placeholder: "اكتب رسالة...",
        send: "إرسال",
        contact: "تواصل معنا عبر واتساب",
        loading: "يكتب..."
      };
    } else if (lang.startsWith("es")) {
      return {
        greeting: "¡Hola! ¿Buscas algo local o más familiar? ¿Alguna preferencia alimentaria?",
        placeholder: "Escribe un mensaje...",
        send: "Enviar",
        contact: "Contáctanos por WhatsApp",
        loading: "Escribiendo..."
      };
    }
    // Default English
    return {
      greeting: "Hi there! Looking for something local and traditional, or more familiar? Any dietary preferences?",
      placeholder: "Type a message...",
      send: "Send",
      contact: "Contact us on WhatsApp",
      loading: "Typing..."
    };
  };

  const strings = getLocalizedStrings();
  const isRTL = typeof navigator !== "undefined" && navigator.language.startsWith("ar");

  // Initialize with greeting on first open
  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true);
      setMessages([{ role: "model", text: strings.greeting }]);
    }
  }, [isOpen, hasOpened, strings.greeting]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Trap focus & escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Small delay to ensure input is rendered before focus
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message to UI immediately
    const newMessages = [...messages, { role: "user", text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Format history for Gemini API: [{role: 'user'|'model', parts: [{text: string}]}]
      const history = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history })
      });

      const data = await response.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: "model", text: data.reply }]);
      } else if (data.error) {
        setMessages(prev => [...prev, { role: "model", text: data.error }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { 
        role: "model", 
        text: "Sorry, I'm having trouble connecting. Please reach out via WhatsApp: wa.me/905060453906" 
      }]);
    } finally {
      setIsLoading(false);
      // Refocus input after response
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <div className={`fixed z-50 transition-all duration-300 ease-out ${isOpen ? "inset-0 flex flex-col sm:inset-auto sm:block sm:bottom-6 sm:right-6" : "bottom-6 right-6"}`}>
      
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gold text-ink shadow-lg hover:scale-105 transition-transform animate-fadeIn focus:outline-none focus:ring-4 focus:ring-gold/50"
          aria-label="Open AI Concierge"
        >
          {/* Subtle pulse for first load attention */}
          {!hasOpened && (
            <span className="absolute inset-0 rounded-full bg-gold opacity-50 animate-ping" />
          )}
          <MessageCircle className="w-7 h-7" />
        </button>
      )}

      {/* Chat Window */}
      <div 
        ref={chatWindowRef}
        className={`flex flex-col bg-ink text-cream border border-gold/20 shadow-2xl overflow-hidden transition-all duration-200 ease-out origin-bottom-right
          ${isOpen ? "opacity-100 scale-100 w-full h-full flex-1 sm:flex-none sm:h-[500px]" : "opacity-0 scale-95 h-0 pointer-events-none"}
          sm:w-[380px] sm:rounded-2xl
        `}
        dir={isRTL ? "rtl" : "ltr"}
        role="dialog"
        aria-modal="true"
        aria-label="AI Concierge Chat"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gold/20 bg-ink-2">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="w-5 h-5 text-gold" />
            <h3 className="font-semibold text-cream">AI Concierge</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md text-cream/70 hover:text-gold hover:bg-gold/10 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* WhatsApp Fallback Link */}
        <div className="px-4 py-2 bg-ink text-xs text-center border-b border-gold/10 text-cream/70">
          <a href="https://wa.me/905060453906" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors underline decoration-gold/50 underline-offset-2">
            {strings.contact}
          </a>
        </div>

        {/* Messages Area */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar scroll-smooth"
          aria-live="polite"
        >
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[85%] px-4 py-2 rounded-2xl ${
                  msg.role === "user" 
                    ? "bg-gold text-ink rounded-tr-sm" 
                    : "bg-ink-2 text-cream border border-gold/10 rounded-tl-sm"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{renderMessageText(msg.text)}</p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex justify-start animate-fadeIn">
              <div className="bg-ink-2 border border-gold/10 text-cream px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center h-10">
                <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                <span className="sr-only">{strings.loading}</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-ink-2 border-t border-gold/20 shrink-0" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={strings.placeholder}
              className={`w-full bg-ink text-cream border border-gold/30 rounded-full py-2.5 outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors
                ${isRTL ? "pr-4 pl-12" : "pl-4 pr-12"}
              `}
              disabled={isLoading}
              aria-label={strings.placeholder}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`absolute top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-gold text-ink disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold/90 transition-colors
                ${isRTL ? "left-2" : "right-2"}
              `}
              aria-label={strings.send}
            >
              <Send className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
}
