import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/hooks/useLanguage';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const LuxoraAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => {
    let stored = localStorage.getItem('luxora_session_id');
    if (!stored) {
      stored = 'luxora_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('luxora_session_id', stored);
    }
    return stored;
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const WEBHOOK_URL = 'https://n8n.aplica.biz/webhook/df2505ea-7c89-43df-9d14-f2820311ad1a';

  const quickQuestions = [
    t('chat.quickQuestions.amenities'),
    t('chat.quickQuestions.beach'),
    t('chat.quickQuestions.availability'),
    t('chat.quickQuestions.booking')
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        text: t('chat.welcome'),
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, [isOpen, t, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (messageText?: string) => {
    const message = messageText || inputValue.trim();
    if (!message) return;

    if (!messageText) {
      setInputValue('');
    }

    const userMessage: Message = {
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          sessionId: sessionId,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          source: 'luxora_villa_chat'
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      let botMessage = data.response || data.message || data.text || data.reply;
      
      if (!botMessage) {
        console.error('Unexpected response format:', data);
        botMessage = t('chat.errors.unexpectedFormat');
      }

      const botResponse: Message = {
        text: botMessage,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);

    } catch (error) {
      console.error('Error:', error);
      let errorMessage = t('chat.errors.generic');
      
      if (error instanceof SyntaxError && error.message.toLowerCase().includes("json")) {
        errorMessage = t('chat.errors.invalidJson');
      } else if (error instanceof Error && error.message === 'Network response was not ok') {
        errorMessage = t('chat.errors.network');
      }

      const errorResponse: Message = {
        text: errorMessage,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-luxury-blue to-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-50"
        size="lg"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>

      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0 bg-luxury-beige border-luxury-gold">
          <DialogHeader className="bg-gradient-to-r from-luxury-blue to-primary text-white p-6 rounded-t-lg">
            <DialogTitle className="flex items-center justify-between font-serif text-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏖️</span>
                <span>{t('chat.title')}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </DialogTitle>
            <p className="text-white/90 text-sm mt-1">{t('chat.subtitle')}</p>
          </DialogHeader>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-luxury-blue to-primary text-white'
                      : 'bg-luxury-beige border border-luxury-gold/20 text-luxury-dark'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}

            {/* Quick Questions - Show only after welcome message */}
            {messages.length === 1 && messages[0].sender === 'bot' && (
              <div className="flex flex-wrap gap-2 mt-4">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => sendMessage(question)}
                    className="text-xs border-luxury-blue text-luxury-blue hover:bg-luxury-blue hover:text-white transition-colors"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            )}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-3 text-luxury-dark/60">
                <span className="text-sm italic">{t('chat.typing')}</span>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-luxury-blue rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-luxury-gold/20">
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('chat.placeholder')}
                disabled={isLoading}
                className="flex-1 px-4 py-3 border-2 border-luxury-gold/30 rounded-full focus:border-luxury-blue focus:outline-none transition-colors text-sm"
              />
              <Button
                onClick={() => sendMessage()}
                disabled={isLoading || !inputValue.trim()}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-luxury-blue to-primary hover:from-luxury-blue/90 hover:to-primary/90 disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-white" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LuxoraAgent;