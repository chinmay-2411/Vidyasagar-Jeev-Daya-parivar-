import { motion } from "framer-motion";
import { Heart, Home, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ThankYou() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 py-16 bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-primary/20 shadow-xl">
          <CardContent className="p-10 md:p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6"
            >
              <Heart className="h-10 w-10 text-primary fill-primary" />
            </motion.div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
              Thank You for Your Donation!
            </h1>

            <p className="text-base md:text-lg text-muted-foreground mb-2">
              Your generosity brings hope, care, and healing to the innocent lives we protect.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Every contribution to <span className="font-semibold text-foreground">Vidyasagar Jeev Daya Parivar Trust</span> helps us rescue birds, cows, and abandoned people in need.
            </p>

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-8 text-sm text-muted-foreground">
              A receipt will be sent to your registered email/phone. For any queries, WhatsApp us at{" "}
              <a href="https://wa.me/919716565758" className="text-primary font-medium hover:underline">
                +91 97165 65758
              </a>
              .
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" /> Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a
                  href="https://wa.me/?text=I%20just%20supported%20Vidyasagar%20Jeev%20Daya%20Parivar%20Trust.%20Join%20me%20in%20helping%20rescue%20animals%20and%20people%20in%20need!%20https%3A%2F%2Frzp.io%2Frzp%2FU1ekE7qi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Share2 className="h-4 w-4 mr-2" /> Share & Inspire Others
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
