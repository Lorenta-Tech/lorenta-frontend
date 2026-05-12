import apiFetch from "./api";

export async function createRazorpayOrder(payload: {
  session_id: string;
  amount_paise: number;
}) {

  const formattedPayload = {
    ...payload,
    amount_paise: payload.amount_paise * 100,
  };

  return apiFetch("/payments/create", {
    method: "POST",
    body: JSON.stringify(formattedPayload),
  });
}

export const openRazorpay = (
  paymentOrder: any
): Promise<any> => {

  const {
    razorpay_order_id,
    currency,
    amount_paise,
    session_id,
  } = paymentOrder.data;

  return new Promise((resolve, reject) => {

    const options = {

      key: import.meta.env.VITE_RAZORPAY_KEY,

      amount: amount_paise,

      currency,

      name: "Lorenta Tech",

      description: "Print Order",

      order_id: razorpay_order_id,

      prefill: {
        email: "test@example.com",
        contact: "1234567890",
      },

      notes: {
        session_id,
      },

      handler: async function () {

        try {

          const job = await pollPaymentStatus(session_id);

          resolve(job);

        } catch (error) {

          reject(error);
        }
      },

      modal: {

        ondismiss: function () {

          reject(new Error("Payment cancelled"));
        },
      },

      theme: {
        color: "#7e49f2",
      },
    };

    const rzp = new (window as any).Razorpay(options);

    rzp.open();
  });
};

const pollPaymentStatus = async (
  session_id: string
) => {

  const MAX_RETRIES = 15;

  for (let i = 0; i < MAX_RETRIES; i++) {
    console.log("Sending req")

    const result = await apiFetch<any>(
      `/payments/status/${session_id}`
    );

    const job = result?.data?.job;

    console.log(job);

    const isPaid =
      String(job?.status).toLowerCase() === "paid";

    if (isPaid) {
      return job;
    }

    await new Promise((r) => setTimeout(r, 2000));
  }

  throw new Error(
    "Timeout waiting for payment confirmation"
  );
};