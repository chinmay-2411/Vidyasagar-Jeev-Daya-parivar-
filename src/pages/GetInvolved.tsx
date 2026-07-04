import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Users, Building2, Landmark } from "lucide-react";
import upiQrCode from "@/assets/upi-qr-code.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import RazorpayButton from "@/components/RazorpayButton";

const GetInvolved = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [donationAmount, setDonationAmount] = useState<number>(1100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast({ title: "Please fill required fields", variant: "destructive" });
      return;
    }
    toast({ title: "Thank you for volunteering!", description: "We will contact you soon." });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div>
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Get Involved</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Join us in making a difference — every hand counts, every rupee saves a life.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Volunteer Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card className="border">
                <CardContent className="p-8">
                  <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary" /> Become a Volunteer
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input placeholder="Your Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} required className="bg-background focus:ring-2 focus:ring-primary/20" />
                    <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} className="bg-background focus:ring-2 focus:ring-primary/20" />
                    <Input type="tel" placeholder="Phone Number *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={15} required className="bg-background focus:ring-2 focus:ring-primary/20" />
                    <Textarea placeholder="Why do you want to volunteer? (optional)" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} className="bg-background focus:ring-2 focus:ring-primary/20" />
                    <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Submit Volunteer Application</Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Donate + Corporate */}
            <div className="space-y-8">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <Card className="border border-primary/20 bg-accent/5">
                  <CardContent className="p-8">
                    <Heart className="h-10 w-10 text-primary mb-4" />
                    <h3 className="font-display text-xl font-semibold mb-3">Donate</h3>
                    <p className="text-muted-foreground text-sm mb-4">Your donations help us run our shelters, hospitals, and ambulance services. Every contribution saves a life.</p>
                    
                    {/* Donation Tiers */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                      {[
                        { amount: "₹1,100", label: "Food" },
                        { amount: "₹2,100", label: "Shelter Support" },
                        { amount: "₹3,100", label: "Ambulance" },
                        { amount: "₹5,100", label: "Medicine" },
                        { amount: "₹11,000", label: "All Support" },
                      ].map((tier, i) => (
                        <div key={i} className="bg-background rounded-lg p-3 text-center border border-primary/20 hover:border-primary/40 transition-colors">
                          <div className="font-bold text-primary text-sm">{tier.amount}</div>
                          <div className="text-[11px] text-muted-foreground">{tier.label}</div>
                        </div>
                      ))}
                    </div>

                     {/* UPI QR Code */}
                     <div className="bg-background rounded-lg p-4 border border-primary/20 mb-4 text-center">
                       <span className="font-semibold text-sm block mb-2">Scan & Pay via UPI</span>
                       <img src={upiQrCode} alt="UPI QR Code for donations" className="w-36 h-36 object-contain mx-auto mb-1" loading="lazy" />
                       <p className="text-[11px] text-muted-foreground">Google Pay, PhonePe, Paytm, etc.</p>
                     </div>

                     {/* Bank Details */}
                     <div className="bg-background rounded-lg p-4 border border-primary/20 mb-4">
                       <div className="flex items-center gap-2 mb-2">
                         <Landmark className="h-4 w-4 text-primary" />
                         <span className="font-semibold text-sm">Bank Transfer Details</span>
                       </div>
                       <div className="text-xs space-y-1 text-muted-foreground">
                         <p><span className="font-medium text-foreground">A/C Name:</span> Vidyasagar Jeev Daya Parivar Trust</p>
                         <p><span className="font-medium text-foreground">A/C No:</span> 50200073992952</p>
                         <p><span className="font-medium text-foreground">IFSC Code:</span> HDFC0001360</p>
                         <p><span className="font-medium text-foreground">Bank:</span> HDFC Bank</p>
                       </div>
                       <p className="text-[11px] text-muted-foreground mt-2">For receipt, send screenshot on WhatsApp: 9716565758</p>
                     </div>

                    <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/80 font-bold">
                      <a href="https://wa.me/918866591008?text=I%20want%20to%20donate" target="_blank" rel="noopener noreferrer">Donate via WhatsApp</a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                <Card className="border border-secondary/20 bg-primary/5">
                  <CardContent className="p-8">
                    <Building2 className="h-10 w-10 text-secondary mb-4" />
                    <h3 className="font-display text-xl font-semibold mb-3">Corporate Partnership</h3>
                    <p className="text-muted-foreground text-sm mb-6">Partner with us through CSR initiatives. We welcome corporate sponsors who share our vision of compassion.</p>
                    <Button asChild variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                      <a href="tel:+918866591008">Contact Us for Partnerships</a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
