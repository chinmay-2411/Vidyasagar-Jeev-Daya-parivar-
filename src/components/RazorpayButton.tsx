import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface RazorpayButtonProps {
  amount: number; // in rupees
  label?: string;
  description?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  className?: string;
  onSuccess?: (paymentId: string) => void;
}

declare global {
  interface Window {
    Razorpay?: any;
  }
}

const SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

const loadScript = () =>
  new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const RazorpayButton = ({
  amount,
  label = "Donate Now",
  description = "Donation to Vidyasagar Jeev Daya Parivar Trust",
  prefill,
  className,
  onSuccess,
}: RazorpayButtonProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadScript();
  }, []);

  const handlePay = async () => {
    setLoading(true);
    try {
      const ok = await loadScript();
      if (!ok) throw new Error("Failed to load payment SDK");

      const { data, error } = await supabase.functions.invoke("create-razorpay-order", {
        body: { amount: Math.round(amount * 100), currency: "INR" },
      });
      if (error || !data?.order_id) throw new Error(error?.message || data?.error || "Order failed");

      const rzp = new window.Razorpay({
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: "Vidyasagar Jeev Daya Parivar Trust",
        description,
        order_id: data.order_id,
        prefill,
        theme: { color: "#059669" },
        modal: {
          ondismiss: () => {
            setLoading(false);
            toast({ title: "Payment cancelled" });
          },
        },
        handler: async (response: any) => {
          const { data: v, error: verr } = await supabase.functions.invoke(
            "verify-razorpay-payment",
            { body: response },
          );
          if (verr || !v?.success) {
            toast({ title: "Payment verification failed", variant: "destructive" });
          } else {
            toast({ title: "Thank you!", description: `Payment ID: ${response.razorpay_payment_id}` });
            onSuccess?.(response.razorpay_payment_id);
          }
          setLoading(false);
        },
      });

      rzp.on("payment.failed", (resp: any) => {
        toast({
          title: "Payment failed",
          description: resp?.error?.description ?? "Please try again",
          variant: "destructive",
        });
        setLoading(false);
      });

      rzp.open();
    } catch (e: any) {
      toast({ title: "Payment error", description: e.message, variant: "destructive" });
      setLoading(false);
    }
  };

  return (
    <Button onClick={handlePay} disabled={loading || amount < 1} className={className}>
      {loading ? "Processing…" : `${label} · ₹${amount.toLocaleString("en-IN")}`}
    </Button>
  );
};

export default RazorpayButton;
