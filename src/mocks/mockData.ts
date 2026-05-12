/**
 * Mock Data for Testing Frontend Without Backend
 * This file contains realistic sample data for orders, jobs, and API responses
 */

export const mockOrders = [
  {
    job_id: "JOB_001",
    session_id: "SESSION_001",
    totalpages: 45,
    price: 125.50,
    orderDate: "2024-05-10",
    status: "completed",
    files: [
      {
        file_id: "FILE_001",
        file_name: "document1.pdf",
        number_of_pages: 25,
        copies: 1,
        printing_mode: "color",
        printing_side: "double_side",
        file_status: "completed",
        price: 75.0,
      },
      {
        file_id: "FILE_002",
        file_name: "document2.pdf",
        number_of_pages: 20,
        copies: 1,
        printing_mode: "monochromatic",
        printing_side: "single_side",
        file_status: "completed",
        price: 50.50,
      },
    ],
  },
  {
    job_id: "JOB_002",
    session_id: "SESSION_002",
    totalpages: 100,
    price: 250.0,
    orderDate: "2024-05-08",
    status: "completed",
    files: [
      {
        file_id: "FILE_003",
        file_name: "report.pdf",
        number_of_pages: 100,
        copies: 1,
        printing_mode: "color",
        printing_side: "double_side",
        file_status: "completed",
        price: 250.0,
      },
    ],
  },
  {
    job_id: "JOB_003",
    session_id: "SESSION_003",
    totalpages: 50,
    price: 85.0,
    orderDate: "2024-05-05",
    status: "completed",
    files: [
      {
        file_id: "FILE_004",
        file_name: "slides.pdf",
        number_of_pages: 50,
        copies: 1,
        printing_mode: "monochromatic",
        printing_side: "double_side",
        file_status: "completed",
        price: 85.0,
      },
    ],
  },
];

export const mockActiveJobs = [
  {
    job_id: "JOB_ACTIVE_001",
    session_id: "SESSION_ACTIVE_001",
    totalpages: 30,
    price: 90.0,
    orderDate: "2024-05-13",
    status: "in_progress",
    files: [
      {
        file_id: "FILE_ACTIVE_001",
        file_name: "urgent_report.pdf",
        number_of_pages: 30,
        copies: 2,
        printing_mode: "color",
        printing_side: "double_side",
        file_status: "printing",
        price: 90.0,
      },
    ],
  },
  {
    job_id: "JOB_ACTIVE_002",
    session_id: "SESSION_ACTIVE_002",
    totalpages: 15,
    price: 22.50,
    orderDate: "2024-05-13",
    status: "pending",
    files: [
      {
        file_id: "FILE_ACTIVE_002",
        file_name: "assignment.pdf",
        number_of_pages: 15,
        copies: 1,
        printing_mode: "monochromatic",
        printing_side: "single_side",
        file_status: "queued",
        price: 22.50,
      },
    ],
  },
  {
    job_id: "JOB_ACTIVE_003",
    session_id: "SESSION_ACTIVE_003",
    totalpages: 60,
    price: 180.0,
    orderDate: "2024-05-12",
    status: "in_progress",
    files: [
      {
        file_id: "FILE_ACTIVE_003",
        file_name: "thesis_draft.pdf",
        number_of_pages: 60,
        copies: 1,
        printing_mode: "color",
        printing_side: "double_side",
        file_status: "printing",
        price: 180.0,
      },
    ],
  },
];

export const mockUploadConfirmResponse = {
  session_id: "SESSION_" + Date.now(),
  total_amount: 150,
  files_received: 2,
  files: [
    {
      file_id: "FILE_" + Math.random().toString(36).substr(2, 9),
      file_name: "file1.pdf",
      staging_key: "staging_key_1",
    },
    {
      file_id: "FILE_" + Math.random().toString(36).substr(2, 9),
      file_name: "file2.pdf",
      staging_key: "staging_key_2",
    },
  ],
};

export const mockRazorpayOrder = {
  id: "order_" + Math.random().toString(36).substr(2, 9),
  entity: "order",
  amount: 15000, // amount in paise
  amount_paid: 0,
  amount_due: 15000,
  currency: "INR",
  receipt: "receipt_" + Date.now(),
  offer_id: null,
  status: "created",
  attempts: 0,
  notes: {},
  created_at: Math.floor(Date.now() / 1000),
};

export const mockUserInfo = {
  name: "Test User",
  email: "testuser@example.com",
  avatar: "https://i.pravatar.cc/150?img=1",
};

export const mockCalculateAmountResponse = 150.0; // Sample total amount

// Mock payment success response
export const mockPaymentSuccess = {
  job_id: "JOB_" + Math.random().toString(36).substr(2, 9),
  session_id: "SESSION_" + Date.now(),
  payment_id: "pay_" + Math.random().toString(36).substr(2, 9),
  status: "success",
  totalpages: 45,
  price: 150.0,
  orderDate: new Date().toISOString().split("T")[0],
  files: [
    {
      file_id: "FILE_" + Math.random().toString(36).substr(2, 9),
      file_name: "document.pdf",
      number_of_pages: 45,
      copies: 1,
      printing_mode: "color",
      printing_side: "double_side",
      file_status: "queued",
      price: 150.0,
    },
  ],
};
