export interface BookingEmailData {
  propertyName: string;
  propertySlug?: string;
  bookingRef: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalPrice?: number;
  depositAmount?: number;
  currency?: string;
  paymentMethod?: string;
  specialRequests?: string;
  confirmUrl?: string;
}

export function buildBookingEmail(data: BookingEmailData): string {
  const {
    propertyName,
    bookingRef,
    guestName,
    guestEmail,
    guestPhone,
    checkIn,
    checkOut,
    nights,
    totalPrice,
    depositAmount,
    currency = 'PLN',
    paymentMethod,
    specialRequests,
    confirmUrl,
  } = data;

  const formattedTotal =
    typeof totalPrice === 'number' ? `${totalPrice.toLocaleString()} ${currency}` : 'N/A';
  const formattedDeposit =
    typeof depositAmount === 'number' && depositAmount > 0
      ? `${depositAmount.toLocaleString()} ${currency}`
      : 'Brak / Nie dotyczy';

  const paymentMethodLabel = (() => {
    switch (paymentMethod) {
      case 'blik':
        return 'BLIK P2P';
      case 'iban':
        return 'Przelew bankowy / IBAN';
      case 'p2p':
        return 'Revolut / PayPal (Instant P2P)';
      case 'arrival':
        return 'Płatność na miejscu (Karta / Gotówka)';
      default:
        return paymentMethod || 'Bezpośrednia płatność';
    }
  })();

  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nowa rezerwacja: ${bookingRef}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; line-height: 1.5;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    
    <!-- Header -->
    <div style="background-color: #0f172a; padding: 32px 24px; color: #ffffff; text-align: left;">
      <div style="display: inline-block; background-color: #10b981; color: #ffffff; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
        Bezpośrednia Rezerwacja
      </div>
      <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.02em;">Nowa rezerwacja gościa</h1>
      <p style="margin: 6px 0 0; color: #94a3b8; font-size: 14px;">Obiekt: <strong style="color: #ffffff;">${propertyName}</strong></p>
    </div>

    <!-- Booking Reference Banner -->
    <div style="background-color: #f1f5f9; padding: 16px 24px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <span style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 600; letter-spacing: 0.05em; display: block;">Numer rezerwacji</span>
        <span style="font-family: monospace; font-size: 18px; font-weight: 700; color: #0f172a;">${bookingRef}</span>
      </div>
    </div>

    <!-- Body Content -->
    <div style="padding: 24px;">
      
      <!-- Dates & Stay Details -->
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
          <td style="padding: 10px 0; color: #64748b;">Wybrana metoda płatności</td>
          <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #0f172a;">${paymentMethodLabel}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; color: #64748b;">Zadatek (do wpłaty przez gościa)</td>
          <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #0f172a;">${formattedDeposit}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0 6px; color: #0f172a; font-weight: 700; font-size: 16px;">Całkowita kwota pobytu</td>
          <td style="padding: 12px 0 6px; text-align: right; font-weight: 700; font-size: 18px; color: #0f172a;">${formattedTotal}</td>
        </tr>
      </table>

      <!-- Guest Details -->
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin: 24px 0 12px; font-weight: 600;">Dane gościa</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; color: #64748b;">Imię i nazwisko</td>
          <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #0f172a;">${guestName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; color: #64748b;">Adres e-mail</td>
          <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #0f172a;"><a href="mailto:${guestEmail}" style="color: #2563eb; text-decoration: none;">${guestEmail}</a></td>
        </tr>
        ${
          guestPhone
            ? `<tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; color: #64748b;">Telefon</td>
          <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #0f172a;">${guestPhone}</td>
        </tr>`
            : ''
        }
      </table>

      <!-- Special Requests -->
      ${
        specialRequests
          ? `<div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
        <strong style="color: #92400e; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">Życzenia specjalne / Notatki</strong>
        <p style="margin: 0; color: #78350f; font-size: 14px; white-space: pre-wrap;">${specialRequests}</p>
      </div>`
          : ''
      }

      ${
        confirmUrl
          ? `<div style="text-align: center; margin: 28px 0 20px;">
        <a href="${confirmUrl}" style="background-color: #d97706; color: #ffffff; padding: 14px 28px; font-weight: 700; font-size: 15px; border-radius: 9999px; text-decoration: none; display: inline-block; box-shadow: 0 4px 6px -1px rgba(217, 119, 6, 0.2);">
          ✓ Potwierdź wpłatę zadatku
        </a>
        <p style="margin: 8px 0 0; font-size: 12px; color: #64748b;">
          Kliknij po zaksięgowaniu wpłaty (BLIK / przelew), aby wysłać gościowi potwierdzenie.
        </p>
      </div>`
          : ''
      }

      <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 14px 18px; font-size: 13px; color: #475569;">
        💡 <strong>Wskazówka:</strong> Gość otrzymał dane do bezpośredniej płatności. Po zaksięgowaniu wpłaty kliknij przycisk powyżej lub skontaktuj się z gościem pod adresem <a href="mailto:${guestEmail}" style="color: #2563eb; text-decoration: none;">${guestEmail}</a>.
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; padding: 18px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
      Wiadomość wygenerowana automatycznie przez Nestay.co dla obiektu ${propertyName}.
    </div>
  </div>
</body>
</html>`;
}
