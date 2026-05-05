export async function createRazorpayOrder(payload: {
  session_id: string;
  amount: number;
}) {
  const res = await fetch("/payment/create-order", {
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
  return new Promise((resolve, reject) => {
    const options = {
      key: "",
      amount: paymentOrder.amount,
      currency: "INR",
      name: "PrintFlow",
      description: "Document Order",
      order_id: paymentOrder.razorpay_order_id,

      handler: async function (response: any) {
        try {
          await fetch("/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...response,
              session_id,
            }),
          });
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
    const res = await fetch(`/payment/status?session_id=${session_id}`);
    const data = await res.json();

    if (data.status === "paid") {
      return data;
    }

    if (data.status === "failed") {
      throw new Error("Payment failed");
    }

    await new Promise((r) => setTimeout(r, 2000));
  }

  throw new Error("Timeout waiting for payment confirmation");
};