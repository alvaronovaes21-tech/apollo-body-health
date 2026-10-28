import { CONTACT } from '../config/site.ts';

/**
 * Gera um link de WhatsApp (wa.me) com a mensagem corretamente codificada.
 * @param message Texto pré-preenchido. Se vazio, abre a conversa sem mensagem.
 * @param phone   Número internacional (somente dígitos). Padrão: CONTACT.whatsappNumber
 *                (definido em src/config/site.ts — único lugar a alterar).
 */
export function buildWhatsAppLink(message?: string, phone: string = CONTACT.whatsappNumber): string {
  const digits = phone.replace(/\D/g, '');
  const base = `https://wa.me/${digits}`;
  const text = message?.trim();
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export { MESSAGES } from './messages.ts';
