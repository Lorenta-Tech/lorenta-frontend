function getOrderHistory(): any[]{
  const mockOrders: any[] = [
    {
      "session_id": "SESSION-001",
      "status": "completed",
      "total_amount": 120.5,
      "total_sheets": 85,
      "created_at": "2026-04-20T10:30:00Z",
      "files": [
        {
          "file_id": "FILE-001",
          "file_name": "report.pdf",
          "printing_mode": "black_white",
          "printing_side": "double",
          "page_range": ["1-10", "15-20"],
          "page_layout": 1,
          "copies": 2,
          "number_of_pages": 20,
          "price": 40.5,
          "file_status": "printed",
          "download_url": "https://example.com/files/report.pdf"
        },
        {
          "file_id": "FILE-002",
          "file_name": "slides.pptx",
          "printing_mode": "color",
          "printing_side": "single",
          "page_range": ["all"],
          "page_layout": 2,
          "copies": 1,
          "number_of_pages": 30,
          "price": 80,
          "file_status": "printed"
        }
      ]
    },
    {
      "session_id": "SESSION-002",
      "status": "pending",
      "total_amount": 60,
      "total_sheets": 40,
      "created_at": "2026-04-25T14:15:00Z",
      "files": [
        {
          "file_id": "FILE-003",
          "file_name": "assignment.docx",
          "printing_mode": "black_white",
          "printing_side": "single",
          "page_range": ["1-40"],
          "page_layout": 1,
          "copies": 1,
          "number_of_pages": 40,
          "price": 60,
          "file_status": "queued",
          "download_url": "https://example.com/files/assignment.docx"
        }
      ]
    },
    {
      "session_id": "SESSION-003",
      "status": "failed",
      "total_amount": null,
      "total_sheets": null,
      "created_at": "2026-04-27T09:00:00Z",
      "files": [
        {
          "file_id": "FILE-004",
          "file_name": "design.psd",
          "printing_mode": null,
          "printing_side": null,
          "page_range": [],
          "page_layout": null,
          "copies": null,
          "number_of_pages": null,
          "price": null,
          "file_status": "error"
        }
      ]
    }
  ];

  return mockOrders;
}

export default getOrderHistory;