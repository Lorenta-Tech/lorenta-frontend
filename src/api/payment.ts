export async function createRazorpayOrder(payload: {
  session_id: string;
  amount_paise: number;
}) {
  payload["amount_paise"] *= 100;
  const res = await fetch("https://unfearingly-heterozygous-brittny.ngrok-free.dev/payments/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create Razorpay order");
  }

  return res.json();
}

export const openRazorpay = (paymentOrder: any): Promise<any> => {
  const {razorpay_order_id, currency, amount_paise, session_id } = paymentOrder;

  return new Promise((resolve, reject) => {
    const options = {
      key: "rzp_test_SmQncbn8cZ6dd9",
      amount: amount_paise,
      currency: currency,
      name: "Lorenta Tech",
      description: "Print order",
      order_id: razorpay_order_id,

      handler: async function () {
        try {
          const result = await pollPaymentStatus(session_id);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      },

      modal: {
        ondismiss: function () {
          reject(new Error("Payment cancelled"));
        },
      },

      theme: {
        color: "#00ff87",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  });
};

const pollPaymentStatus = async (session_id: string) => {
  const MAX = 15;

  for (let i = 0; i < MAX; i++) {
    console.log("Checking status");
    
    const res = await fetch(`https://unfearingly-heterozygous-brittny.ngrok-free.dev/files/jobs/recent`);
    const data = (await res.json()).data;
    

    if (data.status === "paid") {
      return data;
    }

    if (data.status === "attempted") {
      throw new Error("Payment failed");
    }

    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error("Timeout waiting for payment confirmation");
};