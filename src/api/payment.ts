export async function createRazorpayOrder(payload: {
  session_id: string;
  amount_paise: number;
}) {
  const res = await fetch("/payments/create", {
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

export const openRazorpay = (paymentOrder: any, session_id: string): Promise<any> => {
  const {razorpay_order_id, currency, amount_paise } = paymentOrder;
  return new Promise((resolve, reject) => {
    const options = {
      key: "",
      amount: amount_paise,
      currency: currency,
      name: "PrintFlow",
      description: "Document Order",
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
        color: "#000000",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  });
};

const pollPaymentStatus = async (session_id: string) => {
  const MAX = 15;

  for (let i = 0; i < MAX; i++) {
    const res = await fetch(`/payments/status?session_id=${session_id}`);
    const data = (await res.json()).data;
    

    if (data.status === "success") {
      return data;
    }

    if (data.status === "failed") {
      throw new Error("Payment failed");
    }

    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error("Timeout waiting for payment confirmation");
};