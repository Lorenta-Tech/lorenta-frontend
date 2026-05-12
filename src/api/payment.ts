export async function createRazorpayOrder(payload: {
  session_id: string;
  amount_paise: number;
}) {

  payload.amount_paise *= 100;

  const res = await fetch(
    "http://ec2-13-207-2-90.ap-south-1.compute.amazonaws.com/payments/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to create Razorpay order");
  }

  return res.json();
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

      currency: currency,

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

      // =========================
      // PAYMENT SUCCESS
      // =========================
      handler: async function () {

        console.log("✅ Razorpay handler fired - payment success");

        try {

          const job = await pollPaymentStatus(session_id);

          console.log("✅ Poll completed. JOB:", job);
          console.log("✅ JOB STATUS:", job?.status);

          resolve(job);

        } catch (err) {

          console.log("❌ pollPaymentStatus threw error:", err);

          reject(err);

        }
      },

      // =========================
      // USER CLOSED MODAL
      // =========================
      modal: {

        ondismiss: function () {

          console.log("❌ Payment popup closed by user");

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

// =========================
// POLL PAYMENT STATUS
// =========================
const pollPaymentStatus = async (
  session_id: string
) => {

  const MAX_RETRIES = 15;

  for (let i = 0; i < MAX_RETRIES; i++) {

    console.log(`🔄 Polling attempt ${i + 1} of ${MAX_RETRIES} for session: ${session_id}`);

    try {

      const res = await fetch(
        `http://ec2-13-207-2-90.ap-south-1.compute.amazonaws.com/payments/status/${session_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(`📡 Poll response status: ${res.status}`);

      if (!res.ok) {
        console.log(`❌ Poll response not OK: ${res.status}`);
        throw new Error("Failed to fetch payment status");
      }

      const result = await res.json();

      console.log("📦 Full poll result:", JSON.stringify(result, null, 2));

      const job = result?.data?.job;

      console.log("📦 Job object:", job);
      console.log("📦 Job status raw:", job?.status);
      console.log("📦 Job status lowercased:", String(job?.status).toLowerCase());

      const isPaid =
        String(job?.status).toLowerCase() === "paid";

      console.log("💰 isPaid:", isPaid);

      // =========================
      // PAYMENT CONFIRMED
      // =========================
      if (isPaid) {

        console.log("✅ Payment confirmed! Returning job.");

        return job;
      }

      console.log(`⏳ Not paid yet, waiting 2s before retry...`);

      // wait 2 seconds
      await new Promise((r) => setTimeout(r, 2000));

    } catch (err) {

      console.log(`❌ Error during poll attempt ${i + 1}:`, err);

      throw err;
    }
  }

  throw new Error("Timeout waiting for payment confirmation");
};