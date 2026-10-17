export const WHATSAPP_CONTACTS = [
  { number: "2250707709057", label: "+225 07 07 70 90 57" },
  { number: "2250707709058", label: "+225 07 07 70 90 58" },
] as const;

export type WhatsAppNumber = (typeof WHATSAPP_CONTACTS)[number]["number"];
export const PRIMARY_WHATSAPP_NUMBER = WHATSAPP_CONTACTS[0].number;

export function whatsappURL(number: WhatsAppNumber, message?: string) {
  const url = `https://wa.me/${number}`;
  return message ? `${url}?text=${encodeURIComponent(message)}` : url;
}
