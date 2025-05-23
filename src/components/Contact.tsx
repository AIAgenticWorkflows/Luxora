
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { supabase } from "@/integrations/supabase/client";
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"; // This is Google's test key - replace with your actual key in production

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkin: '',
    checkout: '',
    guests: 2,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recaptchaToken) {
      toast({
        title: t('booking.form.recaptchaRequired') || 'Verification Required',
        description: t('booking.form.pleaseVerify') || 'Please verify that you are not a robot.',
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send data to Supabase Edge Function with recaptcha token
      const { error } = await supabase.functions.invoke('resend-email', {
        body: {
          ...formData,
          recaptchaToken
        }
      });

      if (error) {
        throw new Error(error.message);
      }
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        checkin: '',
        checkout: '',
        guests: 2,
        message: ''
      });
      setRecaptchaToken(null);
      
      toast({
        title: t('inquiry.success.title'),
        description: t('inquiry.success.description'),
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: t('inquiry.error.title'),
        description: t('inquiry.error.description'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-luxury-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-luxury-dark mb-4">{t('booking.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('booking.description')}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-none shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif font-bold mb-6">{t('booking.form.title')}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      {t('booking.form.name')}
                    </label>
                    <Input 
                      id="name" 
                      placeholder={t('booking.form.namePlaceholder')} 
                      required 
                      className="w-full"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      {t('booking.form.email')}
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder={t('booking.form.emailPlaceholder')} 
                      required 
                      className="w-full"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="checkin" className="block text-sm font-medium mb-1">
                      {t('booking.form.checkin')}
                    </label>
                    <Input 
                      id="checkin" 
                      type="date" 
                      required 
                      className="w-full"
                      value={formData.checkin}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="checkout" className="block text-sm font-medium mb-1">
                      {t('booking.form.checkout')}
                    </label>
                    <Input 
                      id="checkout" 
                      type="date" 
                      required 
                      className="w-full"
                      value={formData.checkout}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium mb-1">
                    {t('booking.form.guests')}
                  </label>
                  <Input 
                    id="guests" 
                    type="number" 
                    min="1"
                    required 
                    className="w-full"
                    value={formData.guests}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    {t('booking.form.requests')}
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder={t('booking.form.requestsPlaceholder')} 
                    rows={4} 
                    className="w-full"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-center my-6">
                  <ReCAPTCHA
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={handleRecaptchaChange}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !recaptchaToken}
                  className="w-full bg-luxury-gold hover:bg-opacity-90 text-white font-semibold py-6 text-lg"
                >
                  {isSubmitting ? t('booking.form.sending') : t('booking.form.submit')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
