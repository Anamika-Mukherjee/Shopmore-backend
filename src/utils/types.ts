//type declaration file
export interface Product{
    id: string;
    name: string;
    categoryId: string;
    description: string;
    price: number;
    stock: number;
    imageUrls: string[];
    createdAt: Date;
};

export interface CreateLinkResponse{
    
    cf_link_id: string,
    link_id: string,
    link_status: string,
    link_created_at: string,
    customer_details: {
      customer_id: string,
      customer_name: string,
      customer_email: string,
      customer_phone: string,
      customer_uid: string,
    },
    link_amount: number,
    link_currency: string,
    link_amount_paid: number,
    link_partial_payments: boolean,
    link_minimum_partial_amount: number,
    link_purpose: string,
    link_url: string,
    link_expiry_time: string,
    link_meta: {
      return_url: string,
      payment_methods: string,
      notify_url: string,
      upi_intent: boolean
    },
    link_notes: {
        [key: string]: string
    },
    link_auto_reminders: boolean,
    link_qrcode: string,
    link_notify: {
        send_sms: boolean,
        send_email: boolean,
    }
    order_splits: object[],
}