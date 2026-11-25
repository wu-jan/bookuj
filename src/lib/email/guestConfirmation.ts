export interface GuestConfirmationEmailData {
  propertyName: string;
  bookingRef: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalPrice?: number;
  depositAmount?: number;
  currency?: string;
  hostName?: string;
  hostPhone?: string;
  hostEmail?: string;
}

export function buildGuestConfirmationEmail(data: GuestConfirmationEmailData): string {
  const {
    propertyName,
    bookingRef,
    guestName,
    checkIn,
    checkOut,
    nights,
    totalPrice,
    depositAmount,
    currency = 'PLN',
    hostName = 'Gospodarz',
    hostPhone,
    hostEmail,
  } = data;

  const formattedTotal =
    typeof totalPrice === 'number' ? `${totalPrice.toLocaleString()} ${currency}` : 'N/A';
  const formattedDeposit =
    typeof depositAmount === 'number' && depositAmount > 0
      ? `${depositAmount.toLocaleString()} ${currency}`
      : 'Potwierdzony';

  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rezerwacja potwierdzona: ${bookingRef}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; line-height: 1.5;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    
    <!-- Header -->
    <div style="background-color: #0f172a; padding: 32px 24px; color: #ffffff; text-align: left;">
      <div style="display: inline-block; background-color: #10b981; color: #ffffff; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
        Rezerwacja Potwierdzona
      </div>
      <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.02em;">Twój pobyt jest potwierdzony!</h1>
      <p style="margin: 6px 0 0; color: #94a3b8; font-size: 14px;">Obiekt: <strong style="color: #ffffff;">${propertyName}</strong></p>
    </div>

    <!-- Booking Reference Banner -->
    <div style="background-color: #f1f5f9; padding: 16px 24px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <span style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 600; letter-spacing: 0.05em; display: block;">Numer rezerwacji</span>
        <span style="font-family: monospace; font-size: 18px; font-weight: 700; color: #0f172a;">${bookingRef}</span>
      </div>
      <div style="text-align: right;">
        <span style="display: inline-block; background-color: #ecfdf5; color: #059669; font-size: 12px; font-weight: 700; padding: 4px 8px; border-radius: 6px; border: 1px solid #a7f3d0;">
          Status: Potwierdzona
        </span>
      </div>
    </div>

    <!-- Body Content -->
    <div style="padding: 24px;">
      <p style="font-size: 15px; margin: 0 0 20px; color: #334155;">
        Cześć <strong>${guestName}</strong>,<br>
        Gospodarz zaksięgował Twój zadatek i potwierdził rezerwację. Twój termin został ostatecznie zablokowany.
      </p>

      <!-- Stay Details -->
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin: 0 0 12px; font-weight: 600;">Szczegóły pobytu</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; color: #64748b;">Zameldowanie (Check-in)</td>
          <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #0f172a;">${checkIn}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; color: #64748b;">Wymeldowanie (Check-out)</td>
          <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #0f172a;">${checkOut}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; color: #64748b;">Liczba nocy</td>
          <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #0f172a;">${nights}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; color: #64748b;">Zaksięgowany zadatek</td>
          <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #059669;">${formattedDeposit} (opłacony)</td>
        </tr>
        <tr>
          <td style="padding: 12px 0 6px; color: #0f172a; font-weight: 700; font-size: 16px;">Całkowita kwota pobytu</td>
          <td style="padding: 12px 0 6px; text-align: right; font-weight: 700; font-size: 18px; color: #0f172a;">${formattedTotal}</td>
        </tr>
      </table>

      <!-- Host Contact -->
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin: 24px 0 12px; font-weight: 600;">Kontakt do gospodarza</h2>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
        <div style="font-weight: 700; font-size: 15px; color: #0f172a; margin-bottom: 4px;">${hostName}</div>
        ${hostPhone ? `<div style="font-size: 14px; color: #475569; margin-bottom: 2px;">📞 Telefon / WhatsApp: <strong>${hostPhone}</strong></div>` : ''}
        ${hostEmail ? `<div style="font-size: 14px; color: #475569;">✉️ Email: <a href="mailto:${hostEmail}" style="color: #2563eb; text-decoration: none;">${hostEmail}</a></div>` : ''}
      </div>

      <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 14px 18px; font-size: 13px; color: #065f46;">
        🌿 <strong>Wskazówka:</strong> W razie pytań o godzinę przyjazdu lub wskazówki dojazdu, możesz skontaktować się bezpośrednio z gospodarzem. Życzymy udanego pobytu!
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; padding: 18px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
      Wiadomość wysłana z platformy Nestay.co dla obiektu ${propertyName}.
    </div>
  </div>
</body>
</html>`;
}
