import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useLanguage } from "@/hooks/useLanguage";
import { MessageCircle, X, Send, ExternalLink, Calendar as CalendarIcon } from 'lucide-react';
import { format } from "date-fns";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      const welcomeMessage: Message = {
        id: '1',
        text: t('chatbot.welcome'),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, t, messages.length]);

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Check-in/Check-out related questions
    if (message.includes('check in') || message.includes('checkin') || message.includes('arrival') || 
        message.includes('arrivée') || message.includes('arrivee')) {
      return t('chatbot.checkin');
    }
    
    if (message.includes('check out') || message.includes('checkout') || message.includes('departure') || 
        message.includes('départ') || message.includes('depart')) {
      return t('chatbot.checkout');
    }
    
    // Availability questions
    if (message.includes('available') || message.includes('availability') || message.includes('book') || 
        message.includes('reserve') || message.includes('disponible') || message.includes('disponibilité') || 
        message.includes('réserver') || message.includes('reserver')) {
      if (checkInDate && checkOutDate) {
        return t('chatbot.availabilityWithDates');
      }
      return t('chatbot.availability');
    }
    
    // Time related questions
    if (message.includes('time') || message.includes('hours') || message.includes('heure') || message.includes('horaire')) {
      return t('chatbot.times');
    }
    
    // Price questions
    if (message.includes('price') || message.includes('cost') || message.includes('rate') || 
        message.includes('prix') || message.includes('tarif')) {
      return t('chatbot.pricing');
    }
    
    // Location questions
    if (message.includes('location') || message.includes('address') || message.includes('where') || 
        message.includes('adresse') || message.includes('où') || message.includes('ou')) {
      return t('chatbot.location');
    }
    
    // Amenities questions
    if (message.includes('amenities') || message.includes('facilities') || message.includes('pool') || 
        message.includes('wifi') || message.includes('équipements') || message.includes('equipements') || 
        message.includes('piscine')) {
      return t('chatbot.amenities');
    }
    
    // Default response
    return t('chatbot.default');
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addMessage(userMessage, 'user');
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      addMessage(botResponse, 'bot');
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const openBookingLink = () => {
    let url = 'https://www.booking.com/hotel/mu/3-bedrooms-villa-in-pereybere.html';
    
    if (checkInDate && checkOutDate) {
      const checkinStr = format(checkInDate, 'yyyy-MM-dd');
      const checkoutStr = format(checkOutDate, 'yyyy-MM-dd');
      url += `?checkin=${checkinStr}&checkout=${checkoutStr}&group_adults=2&group_children=0&no_rooms=1`;
    }
    
    window.open(url, '_blank');
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 h-96 flex flex-col">
      <Card className="flex-1 flex flex-col bg-white shadow-xl border">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <h3 className="font-semibold">{t('chatbot.title')}</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-primary-foreground hover:bg-primary/80"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {message.text}
                {message.sender === 'bot' && (message.text.includes('booking.com') || message.text.includes(t('chatbot.availability')) || message.text.includes(t('chatbot.availabilityWithDates'))) && (
                  <div className="mt-2 space-y-2">
                    {!checkInDate || !checkOutDate ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowDatePicker(true)}
                        className="w-full text-left justify-start"
                      >
                        <CalendarIcon className="w-3 h-3 mr-2" />
                        {t('chatbot.selectDates')}
                      </Button>
                    ) : (
                      <div className="text-xs text-muted-foreground">
                        {t('chatbot.selectedDates')}: {format(checkInDate, 'MMM dd')} - {format(checkOutDate, 'MMM dd')}
                      </div>
                    )}
                    <Button
                      variant="link"
                      size="sm"
                      onClick={openBookingLink}
                      className="p-0 h-auto text-primary underline"
                    >
                      {t('chatbot.checkAvailability')}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted text-muted-foreground p-3 rounded-lg text-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('chatbot.placeholder')}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Date Picker Popover */}
      <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
        <PopoverTrigger asChild>
          <div></div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">{t('chatbot.checkinDate')}</label>
                <Calendar
                  mode="single"
                  selected={checkInDate}
                  onSelect={setCheckInDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </div>
              {checkInDate && (
                <div>
                  <label className="text-sm font-medium">{t('chatbot.checkoutDate')}</label>
                  <Calendar
                    mode="single"
                    selected={checkOutDate}
                    onSelect={setCheckOutDate}
                    disabled={(date) => date <= checkInDate!}
                    className="rounded-md border"
                  />
                </div>
              )}
              {checkInDate && checkOutDate && (
                <div className="flex gap-2">
                  <Button 
                    onClick={() => {
                      setShowDatePicker(false);
                      addMessage(t('chatbot.datesSelected'), 'user');
                      setTimeout(() => {
                        addMessage(t('chatbot.availabilityWithDates'), 'bot');
                        setIsTyping(false);
                      }, 1000);
                      setIsTyping(true);
                    }}
                    className="flex-1"
                  >
                    {t('chatbot.confirmDates')}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setCheckInDate(undefined);
                      setCheckOutDate(undefined);
                    }}
                  >
                    {t('chatbot.reset')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Chatbot;