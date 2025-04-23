// File: src/services/message.js
/**
 * Message Service - handles email message preparation
 */
export const MessageService = {
  prepareMessages: (data) => {
    return data.map((row) => {
      const trackingUrl = `https://www.dhl.de/de/privatkunden/dhl-sendungsverfolgung.html?piececode=${row['Sendungsnummer']}`;
      return {
        email: row['Empfänger E-Mail-Adresse'] || '',
        subject: 'Your Order Has Been Shipped – Tracking Information Inside',
        message: createEmailTemplate(row, trackingUrl)
      };
    });
  }
};
function createEmailTemplate(row, trackingUrl) {
  const name = `${row['Empfänger Name 1'] || ''}`.trim();
  const trackingNumber = row['Sendungsnummer'] || '';

  return `
    <p>Dear ${name || 'Customer'},</p>

    <p>I am happy to inform you that your order has been shipped. You can track your package here:</p>

    <p><strong>Tracking number:</strong> ${trackingNumber}</p>

    <p>
      <a href="${trackingUrl}" target="_blank" style="font-weight: bold;">${trackingUrl}</a>
    </p>

    <p>Hope it will arrive soon and safe and you will love it.<br>
    Please let me know if you need any further assistance.<br>
    Have a great day!</p>

    <p>Best regards,<br>
    Anja from Breadcrumbs</p>
  `;
}

