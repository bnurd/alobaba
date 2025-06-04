export interface IPayPaymentResponse {
  Status: number;
  Success: boolean;
  Message: string;
  Data: {
    SessionID: string;
    Url: string;
  };
}

export interface PaymentWebhookRequest {
  trx_id: number;
  sid: string;
  reference_id: string;
  status: "berhasil" | "expired" | "pending";
  status_code: number;
  sub_total: string;
  total: string;
  amount: string;
  fee: string;
  paid_off: number;
  created_at: string;
  expired_at: string;
  paid_at: string;
  settlement_status: string;
  transaction_status_code: number;
  is_escrow: boolean;
  system_notes: string;
  via: string;
  channel: string;
  payment_no: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  additional_info: unknown[];
  url: string;
  va: string;
}
