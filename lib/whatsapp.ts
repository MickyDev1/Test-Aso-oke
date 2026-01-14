export const WHATSAPP_NUMBER = "2347033973539";

export type WhatsAppItem = {
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

function formatMoney(n: number) {
  return `NGN ${(n || 0).toLocaleString()}`;
}

export function buildWhatsAppMessage(params: {
  orderId: string;
  items: WhatsAppItem[];
  subtotal: number;
  shippingFee: number;
  vat: number;
  total: number;
  origin: string;
  customerName?: string;
  phone?: string;
  address?: string;
  note?: string;
}) {
  const {
    orderId,
    items,
    subtotal,
    shippingFee,
    vat,
    total,
    origin,
    customerName,
    phone,
    address,
    note,
  } = params;

  const lines = items.map(
    (i) => `- ${i.name} x${i.quantity} - ${formatMoney(i.price * i.quantity)}`
  );

  const imageLines = items
    .map((i) => {
      const image = i.image || "";
      if (!image) return "";
      const url = image.startsWith("http") ? image : `${origin}${image}`;
      return `- ${i.name}: ${url}`;
    })
    .filter(Boolean);

  const details = [
    customerName ? `Name: ${customerName}` : "",
    phone ? `Phone: ${phone}` : "",
    address ? `Address: ${address}` : "",
    note ? `Note: ${note}` : "",
  ].filter(Boolean);

  const message =
    `Hello Aso-Oke Store\n\n` +
    `I'd like to place an order.\n\n` +
    `Order ID: ${orderId}\n\n` +
    (details.length ? `${details.join("\n")}\n\n` : "") +
    `Items:\n${lines.join("\n")}\n\n` +
    (imageLines.length ? `Images:\n${imageLines.join("\n")}\n\n` : "") +
    `Subtotal: ${formatMoney(subtotal)}\n` +
    `Shipping: ${formatMoney(shippingFee)}\n` +
    `VAT (7.5%): ${formatMoney(vat)}\n` +
    `Total: ${formatMoney(total)}\n\n` +
    `Please confirm availability. Once confirmed, kindly send a Paystack/Flutterwave payment link.\n`;

  return encodeURIComponent(message);
}
