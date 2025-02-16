import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm"; 
import axios from "axios";
import SERVER_URL from "../../confidential/index";


const stripePromise = loadStripe("pk_test_51PSfJA02frVP0OxbP3mZA3nHznJNTtaZT0ZZfZlo1yXoRkkLiXI6AAg9lg8TEQPfvTvCL6DBogL1oBfDJbN3rv2e00GQHzavDo");

export default function StripePayment({ id, onClose }) {
  const [clientSecret, setClientSecret] = useState("");
  const token = localStorage.getItem("token"); 

  // Fetch the Payment Intent from the backend
  React.useEffect(() => {
    const makeIntent=async()=>{
        try {
            const response = await axios.post(`${SERVER_URL}/payment/create_intent`,{item:id}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response.data)
            setClientSecret(response.data.client_secret)
        }catch(err){
            console.log(err)
        }
    }
    makeIntent()
  }, [id,token]);

  const options = {
    clientSecret,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-white text-xl font-bold mb-4">Complete Payment</h2>
        {clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <PaymentForm onClose={onClose} />
          </Elements>
        )}
      </div>
    </div>
  );
}
