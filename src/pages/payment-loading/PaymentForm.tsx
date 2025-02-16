import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

export default function PaymentForm({ onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate=useNavigate()
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
    //   confirmParams: { return_url: "http://localhost:3000" },
      redirect: "if_required",
    });

    if (error) {
      console.error(error.message);
      setLoading(false);
    } else if (paymentIntent.status === "succeeded") {
      alert("Payment Successful!");
      navigate("/payment-success")
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-red-500 hover:bg-red-600 p-3 rounded-lg text-white transition-all"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
