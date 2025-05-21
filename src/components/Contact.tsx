
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    // In a real application, you would handle the form submission here
  };

  return (
    <section id="contact" className="py-20 bg-luxury-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-luxury-dark mb-4">Book Your Stay</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ready to experience luxury living at Luxora Villa? Contact us today to book your stay or inquire about availability.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-none shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif font-bold mb-6">Booking Inquiry</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <Input 
                      id="name" 
                      placeholder="Your full name" 
                      required 
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Your email address" 
                      required 
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="checkin" className="block text-sm font-medium mb-1">
                      Check-in Date
                    </label>
                    <Input 
                      id="checkin" 
                      type="date" 
                      required 
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="checkout" className="block text-sm font-medium mb-1">
                      Check-out Date
                    </label>
                    <Input 
                      id="checkout" 
                      type="date" 
                      required 
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium mb-1">
                    Number of Guests
                  </label>
                  <Input 
                    id="guests" 
                    type="number" 
                    min="1" 
                    defaultValue="2" 
                    required 
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Special Requests
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Any special requests or questions?" 
                    rows={4} 
                    className="w-full"
                  />
                </div>
                
                <Button type="submit" className="w-full bg-luxury-gold hover:bg-opacity-90 text-white font-semibold py-6 text-lg">
                  Send Inquiry
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
