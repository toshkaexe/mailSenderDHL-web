// services/messageService.js

export function prepareMessages(data) {
  return data.map((row) => {
    const trackingUrl = `https://www.dhl.de/de/privatkunden/dhl-sendungsverfolgung.html?piececode=${row['SITEMS_IDENTCODE']}`
    console.log("trackingUr" + trackingUrl)
    return {
      email: row['SITEMS_E_EMAIL'] || '',
      subject: 'Your Order Has Been Shipped – Tracking Information Inside',
      message: emailTemplate(row, trackingUrl)
    }
  })
}

// 📨 Шаблон email с параметрами
function emailTemplate(row, trackingUrl) {
  const name = `${row['EmpName1'] || ''} ${row['EmpName2'] || ''}`.trim()

  return `
    <p>Dear <strong>${name}</strong>,</p>

    <p>We’re happy to let you know that your order has been <strong>shipped</strong>!</p>

    <p>Here is your tracking number:<br>
    <strong><a href="${trackingUrl}" target="_blank">${trackingUrl}</a></strong></p>

    <p>You can track your package using the following link:<br>
    <a href="${trackingUrl}" target="_blank">${trackingUrl}</a>
    </p>

    <p>If you have any questions or need further assistance, feel free to reach out.</p>

    <p>Thank you for shopping with us!</p>

    <p>Best regards,<br>
    Your Company Name</p>
  `
}
