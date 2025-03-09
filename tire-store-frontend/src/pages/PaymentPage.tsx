import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../components/PaymentForm";

const stripePromise = loadStripe("pk_test_51Qz0k5Ij01hpVCaXPDIIoOPpDNbAyz5lJWB5IAOneu1lr31DWPcJnm5JUDq4TodSy4pzcKz2wDzg8pA4drJScbc4002mt2R2B8"); // 🔹 Înlocuiește cu cheia ta Stripe

const PaymentPage: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default PaymentPage;
