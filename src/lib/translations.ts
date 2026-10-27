import { Property, PropertyLocalizedContent } from '@/types/property';

export type Locale = 'pl' | 'en';

export interface TranslationDictionary {
  // Common / Header
  directGuestPortal: string;
  directPortal: string;
  contactHost: string;
  checkAvailability: string;
  callHost: string;
  whatsappHost: string;
  perNight: string;
  allInclusive: string;

  // Hero
  spacesAndInterior: string;
  photos: string;
  surroundings: string;
  map: string;
  explore: string;
  directRate: string;
  reserveDates: string;

  // Host Welcome Card
  hostedBy: string;
  directCommunication: string;
  verifiedHost: string;
  welcomeQuote: (title: string) => string;
  aboutThisStay: string;

  // Benefits Card
  directPrivilege: string;
  whyDirectMatters: string;
  benefitsIntro: string;
  allInclusiveTitle: string;
  allInclusiveDesc: string;
  relationshipTitle: string;
  relationshipDesc: (name: string) => string;
  flexibilityTitle: string;
  flexibilityDesc: string;
  benefitsBadge: string;
  checkDates: string;

  // Gallery & Amenities
  propertyTour: string;
  photoShowcase: string;
  propertyAmenities: string;
  featuredComforts: string;
  spacesAndAtmosphere: string;
  gallerySubtitle: string;
  checkDatesForSpaces: string;
  viewAllPhotos: (count: number) => string;
  viewFullscreen: string;
  photoOf: (current: number, total: number) => string;

  // Map
  exactLocationProvided: string;
  openGoogleMaps: string;
  approximateLocation: string;
  locationAndSurroundings: string;
  openInOsm: string;
  privacyDisclaimer: string;

  // FAQ
  faqBadge: string;
  faqHeading: string;
  faqSubheading: (name: string) => string;
  faqSearchPlaceholder: string;
  faqClear: string;
  faqNoResults: (query: string, name: string) => string;

  // Booking Calendar & Suite
  directReservation: string;
  selectDatesTitle: string;
  selectDatesSubtitle: string;
  staySummary: string;
  staySummarySubtitle: string;
  dates: string;
  nightCount: (count: number) => string;
  cleaningAndLinens: string;
  includedFree: string;
  totalStayCost: string;
  advanceDeposit: (percent: number, amount: string) => string;
  depositBalanceNote: string;
  selectDatesPrompt: string;
  minStayNotice: (minStay: number) => string;
  minStayAlert: (minStay: number, selected: number) => string;
  requestDirectReservation: string;
  selectDatesToBook: string;
  minStayButtonLabel: (minStay: number) => string;
  travelDates: string;
  checkIn: string;
  checkOut: string;
  addDate: string;
  instantBookingConfirmation: string;
  available: string;
  selected: string;
  occupied: string;
  clearDates: string;
  saveAndClose: string;
  confirmDatesWithCount: (count: number) => string;
  selectAtLeastNights: (minStay: number) => string;

  // Mobile Sticky Bar
  proceedToBook: string;
  perNightSuffix: string;

  // Payment Modal
  directReservationRequest: string;
  stepSummaryTitle: string;
  contactlessHandoffTitle: string;
  contactlessHandoffDesc: string;
  requestWithDeposit: (amount: string) => string;
  notifyingHost: (name: string) => string;
  notifyingHostDesc: string;
  flexibleStay: string;
  softHoldReassurance: (hours: number) => string;
  cancellationPolicyLabel: string;
  bookingDirectWith: (host: string, property: string) => string;
  paymentMethodHeading: string;
  stayDetails: string;
  checkInDate: string;
  checkOutDate: string;
  totalNightsLabel: string;
  nightlyRate: string;
  totalStayLabel: string;
  depositDueNow: string;
  balanceOnArrival: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  specialRequests: string;
  specialRequestsPlaceholder: string;
  directHostHandoffNotice: string;
  continueToConfirmation: string;
  enterDetailsPrompt: string;
  processingRequest: string;
  reservationConfirmedTitle: string;
  reservationConfirmedSubtitle: string;
  bookingRef: string;
  howToPay: string;
  settleDepositPrompt: string;
  blikInstructions: string;
  ibanInstructions: string;
  arrivalInstructions: string;
  accountNumber: string;
  recipient: string;
  transferTitle: string;
  copyNumber: string;
  copied: string;
  doneClose: string;

  // Payment methods
  methodBlik: string;
  methodBlikDesc: string;
  methodIban: string;
  methodIbanDesc: string;
  methodArrival: string;
  methodArrivalDesc: string;

  // Switcher / Lang
  switchLanguage: string;

  // Footer
  footerDirectPerks: string;
  footerHospitality: string;
  footerDirectConcierge: string;
  footerRightsReserved: (year: number, title: string) => string;
}

export const dictionaries: Record<Locale, TranslationDictionary> = {
  pl: {
    directGuestPortal: 'Rezerwacja Bezpośrednia • 0% Prowizji',
    directPortal: 'Rezerwacja Bezpośrednia',
    contactHost: 'Skontaktuj się z gospodarzem',
    checkAvailability: 'Sprawdź dostępność',
    callHost: 'Zadzwoń do gospodarza',
    whatsappHost: 'Napisz na WhatsApp',
    perNight: '/ noc',
    allInclusive: '(Cena ostateczna)',

    spacesAndInterior: 'Wnętrza i Przestrzeń',
    photos: 'Zdjęcia',
    surroundings: 'Okolica',
    map: 'Mapa',
    explore: 'Zobacz ↓',
    directRate: 'Cena bezpośrednia',
    reserveDates: 'Rezerwuj termin',

    hostedBy: 'Gospodarz:',
    directCommunication: 'Bezpośredni kontakt • Prywatny concierge',
    verifiedHost: 'Zweryfikowany gospodarz',
    welcomeQuote: (title) =>
      `„Witamy w ${title}. Rezerwując bezpośrednio przez tę stronę, kontaktujesz się ze mną bez pośredników. Zero ukrytych opłat, sztucznych prowizji i algorytmów podbijających ceny.”`,
    aboutThisStay: 'O tym obiekcie',

    directPrivilege: 'Przywilej Rezerwacji Bezpośredniej',
    whyDirectMatters: 'Dlaczego warto rezerwować bezpośrednio',
    benefitsIntro:
      'Portale rezerwacyjne pobierają nawet do 18% prowizji od gości i gospodarzy. Rezerwując bezpośrednio tutaj, 100% ceny trafia na utrzymanie jakości i gościnność.',
    allInclusiveTitle: 'Cena bezpośrednia all-inclusive',
    allInclusiveDesc: 'Zero opłat za sprzątanie, zero prowizji serwisowej doliczanej w koszyku.',
    relationshipTitle: 'Bezpośrednia relacja z gospodarzem',
    relationshipDesc: (name) => `Osobisty kontakt z ${name} bez infolinii i automatycznych botów.`,
    flexibilityTitle: 'Elastyczność zameldowania',
    flexibilityDesc: 'Goście bezpośredni otrzymują pierwszeństwo przy wczesnym przyjeździe.',
    benefitsBadge: 'Przejrzyście • Bezpośrednio • Bez Prowizji',
    checkDates: 'Sprawdź terminy',

    propertyTour: 'Galeria Obiektu',
    photoShowcase: 'Zdjęcia i Klimat Miejsca',
    propertyAmenities: 'Udogodnienia i Wyposażenie',
    featuredComforts: 'Wszystko, czego potrzebujesz do komfortowego pobytu',
    spacesAndAtmosphere: 'Przestrzeń i Klimat',
    gallerySubtitle: 'Autentyczne zdjęcia wnętrz, stref relaksu i otaczającej przyrody.',
    checkDatesForSpaces: 'Sprawdź terminy dla tych przestrzeni ↓',
    viewAllPhotos: (count) => `Zobacz wszystkie zdjęcia (${count})`,
    viewFullscreen: 'Pełny ekran',
    photoOf: (current, total) => `${current} z ${total}`,

    exactLocationProvided: 'Dokładny adres otrzymasz po potwierdzeniu rezerwacji.',
    openGoogleMaps: 'Otwórz w Google Maps',
    approximateLocation: 'Przybliżona lokalizacja • Ochrona prywatności',
    locationAndSurroundings: 'Lokalizacja i Okolica',
    openInOsm: 'Otwórz w OpenStreetMap ↗',
    privacyDisclaimer: 'W trosce o prywatność gospodarza, dokładny adres obiektu otrzymasz po zatwierdzeniu rezerwacji.',

    faqBadge: 'Często zadawane pytania',
    faqHeading: 'Warto wiedzieć przed przyjazdem',
    faqSubheading: (name) => `Zasady pobytu i wskazówki od gospodarza (${name})`,
    faqSearchPlaceholder: 'Szukaj pytań (np. sauna, zameldowanie)...',
    faqClear: 'Wyczyść',
    faqNoResults: (query, name) =>
      `Brak pytań pasujących do „${query}”. Masz inne pytanie? Skontaktuj się z ${name} bezpośrednio przez WhatsApp lub telefon.`,

    directReservation: 'Rezerwacja Bezpośrednia',
    selectDatesTitle: 'Wybierz termin i zarezerwuj bezpośrednio',
    selectDatesSubtitle: 'Przejrzyste stawki bezpośrednie • 0 zł prowizji • Bezpośredni kontakt z gospodarzem',
    staySummary: 'Podsumowanie pobytu',
    staySummarySubtitle: 'Cena bezpośrednia bez ukrytych kosztów',
    dates: 'Termin',
    nightCount: (count) => `${count} ${count === 1 ? 'noc' : count < 5 ? 'noce' : 'nocy'}`,
    cleaningAndLinens: 'Sprzątanie i pościel',
    includedFree: 'W cenie (0 zł)',
    totalStayCost: 'Całkowity koszt pobytu',
    advanceDeposit: (percent, amount) => `Zaliczka rezerwacyjna ${percent}%: ${amount}`,
    depositBalanceNote: 'Pozostała kwota płatna bezpośrednio u gospodarza przy zameldowaniu.',
    selectDatesPrompt: 'Wybierz datę przyjazdu i wyjazdu w kalendarzu, aby odblokować rezerwację.',
    minStayNotice: (minStay) => `Minimalna długość pobytu: ${minStay} ${minStay < 5 ? 'noce' : 'nocy'}`,
    minStayAlert: (minStay, selected) =>
      `Ten obiekt wymaga pobytu na minimum ${minStay} noce (wybrano: ${selected}).`,
    requestDirectReservation: 'Poproś o rezerwację bezpośrednią',
    selectDatesToBook: 'Wybierz termin, aby zarezerwować',
    minStayButtonLabel: (minStay) => `Min. pobyt: ${minStay} noce`,
    travelDates: 'Termin pobytu',
    checkIn: 'Przyjazd',
    checkOut: 'Wyjazd',
    addDate: 'Wybierz',
    instantBookingConfirmation: 'Bezpośrednie potwierdzenie',
    available: 'Dostępny',
    selected: 'Wybrany',
    occupied: 'Zajęty',
    clearDates: 'Wyczyść',
    saveAndClose: 'Zapisz i zamknij',
    confirmDatesWithCount: (count) => `Zatwierdź termin (${count} ${count === 1 ? 'noc' : count < 5 ? 'noce' : 'nocy'})`,
    selectAtLeastNights: (minStay) => `Wybierz minimum ${minStay} noce`,

    proceedToBook: 'Przejdź do rezerwacji',
    perNightSuffix: '/ noc',

    directReservationRequest: 'Rezerwacja bezpośrednia',
    stepSummaryTitle: 'Szczegóły pobytu i dane gościa',
    contactlessHandoffTitle: 'Bezpośrednie rozliczenie z gospodarzem',
    contactlessHandoffDesc: 'Łączymy Cię bezpośrednio z właścicielem obiektu. Żaden pośrednik ani portal nie pobiera prowizji od Twojego pobytu.',
    requestWithDeposit: (amount) => `Poproś o rezerwację (zadatek: ${amount})`,
    notifyingHost: (name) => `Powiadamianie gospodarza (${name})...`,
    notifyingHostDesc: 'Rejestrujemy wstępną rezerwację wybranych dat i przygotowujemy dane rozliczeniowe.',
    flexibleStay: 'Elastyczny termin',
    softHoldReassurance: (hours) => `Wybrane daty są wstępnie blokowane na ${hours} ${hours === 1 ? 'godzinę' : 'godziny'} do czasu zaksięgowania zadatku.`,
    cancellationPolicyLabel: 'Zasady odwołania: ',
    bookingDirectWith: (host, property) => `Rezerwacja bezpośrednia u gospodarza ${host} dla ${property}`,
    paymentMethodHeading: 'Wybierz formę rozliczenia zadatku',
    stayDetails: 'Podsumowanie rezerwacji',
    checkInDate: 'Data przyjazdu',
    checkOutDate: 'Data wyjazdu',
    totalNightsLabel: 'Liczba nocy',
    nightlyRate: 'Stawka za noc',
    totalStayLabel: 'Wartość pobytu',
    depositDueNow: 'Wymagany zadatek',
    balanceOnArrival: 'Reszta płatna na miejscu',
    fullName: 'Imię i nazwisko',
    emailAddress: 'Adres e-mail',
    phoneNumber: 'Numer telefonu',
    specialRequests: 'Dodatkowe uwagi dla gospodarza',
    specialRequestsPlaceholder: 'np. orientacyjna godzina przyjazdu, łóżeczko dla dziecka...',
    directHostHandoffNotice:
      'Twoja prośba trafia bezpośrednio do gospodarza. Serwis nie pobiera żadnych prowizji.',
    continueToConfirmation: 'Przejdź do potwierdzenia',
    enterDetailsPrompt: 'Wypełnij imię i nazwisko oraz e-mail',
    processingRequest: 'Przesyłanie rezerwacji do gospodarza...',
    reservationConfirmedTitle: 'Prośba o rezerwację została wysłana!',
    reservationConfirmedSubtitle: 'Gospodarz otrzymał Twoje zgłoszenie. Aby zablokować termin, wpłać zadatek:',
    bookingRef: 'Numer zgłoszenia',
    howToPay: 'Jak opłacić zadatek:',
    settleDepositPrompt: 'Przelej zadatek bezpośrednio na dane gospodarza:',
    blikInstructions: 'Wyślij przelew na telefon BLIK gospodarza, podając w tytule numer rezerwacji.',
    ibanInstructions: 'Wykonaj standardowy przelew bankowy na konto gospodarza.',
    arrivalInstructions: 'Gospodarz skontaktuje się z Tobą w celu potwierdzenia szczegółów przyjazdu.',
    accountNumber: 'Numer rachunku IBAN',
    recipient: 'Odbiorca',
    transferTitle: 'Tytuł przelewu',
    copyNumber: 'Kopiuj',
    copied: 'Skopiowano!',
    doneClose: 'Gotowe, zamknij',

    methodBlik: 'Przelew na telefon BLIK',
    methodBlikDesc: 'Błyskawiczny, darmowy przelew P2P bezpośrednio na numer gospodarza.',
    methodIban: 'Tradycyjny przelew bankowy',
    methodIbanDesc: 'Przelew bezpośrednio na polskie konto bankowe gospodarza.',
    methodArrival: 'Płatność na miejscu / Gotówka',
    methodArrivalDesc: 'Rozliczenie całości bezpośrednio przy odbiorze kluczy.',

    switchLanguage: 'Język / Language',

    footerDirectPerks: '0% Prowizji • Gwarancja Najlepszej Ceny',
    footerHospitality: 'Osobista Gościnność',
    footerDirectConcierge: 'Bezpośrednia rezerwacja u gospodarza & kameralny pobyt',
    footerRightsReserved: (year, title) => `© ${year} ${title}. Wszelkie prawa zastrzeżone.`,
  },
  en: {
    directGuestPortal: 'Direct Guest Portal • 0% Markup',
    directPortal: 'Direct Guest Portal',
    contactHost: 'Contact Host',
    checkAvailability: 'Check Availability',
    callHost: 'Call Host',
    whatsappHost: 'Message on WhatsApp',
    perNight: '/ night',
    allInclusive: '(All-Inclusive)',

    spacesAndInterior: 'Spaces & Interior',
    photos: 'Photos',
    surroundings: 'Surroundings',
    map: 'Map',
    explore: 'Explore ↓',
    directRate: 'Direct Rate',
    reserveDates: 'Reserve Dates',

    hostedBy: 'Hosted by',
    directCommunication: 'Direct Communication • Personal Concierge',
    verifiedHost: 'Verified Host',
    welcomeQuote: (title) =>
      `“Welcome to ${title}. When you book directly through this site, you are communicating directly with me. No hidden fees, no opaque algorithms, and zero middleman markups.”`,
    aboutThisStay: 'About this stay',

    directPrivilege: 'Direct Booking Privilege',
    whyDirectMatters: 'Why booking directly matters',
    benefitsIntro:
      'Online booking portals take up to 18% in commissions from both guests and hosts. By reserving directly here, 100% of your stay rate goes to authentic hospitality.',
    allInclusiveTitle: 'All-Inclusive Direct Rate',
    allInclusiveDesc: 'Zero cleaning markups, zero guest service fees added at checkout.',
    relationshipTitle: 'Direct Host Relationship',
    relationshipDesc: (name) => `Personal communication with ${name} without call-center bots.`,
    flexibilityTitle: 'Priority Arrival Flexibility',
    flexibilityDesc: 'Direct guests receive flexible check-in arrangements whenever available.',
    benefitsBadge: 'Transparent • Direct • Fee-Free',
    checkDates: 'Check Dates',

    propertyTour: 'Property Spaces & Atmosphere',
    photoShowcase: 'Photo Showcase',
    propertyAmenities: 'Standardized Amenities & Comforts',
    featuredComforts: 'Everything you need for a restful stay',
    spacesAndAtmosphere: 'Spaces & Atmosphere',
    gallerySubtitle: 'Authentic photography of the interior, private relaxation spaces, and surrounding nature.',
    checkDatesForSpaces: 'Check dates for these spaces ↓',
    viewAllPhotos: (count) => `View all photos (${count})`,
    viewFullscreen: 'View Fullscreen',
    photoOf: (current, total) => `${current} of ${total}`,

    exactLocationProvided: 'Exact location details provided immediately upon reservation confirmation.',
    openGoogleMaps: 'Open in Google Maps',
    approximateLocation: 'Approximate Location • Privacy Protected',
    locationAndSurroundings: 'Location & Surroundings',
    openInOsm: 'Open in OpenStreetMap ↗',
    privacyDisclaimer: 'To preserve privacy, exact address is dispatched with your host confirmation.',

    faqBadge: 'Frequently Asked Questions',
    faqHeading: 'Good to know before your stay',
    faqSubheading: (name) => `Direct host insights & house policies provided by ${name}`,
    faqSearchPlaceholder: 'Search questions (e.g. sauna, check-in)...',
    faqClear: 'Clear',
    faqNoResults: (query, name) =>
      `No questions match “${query}”. Have a question? Reach out to ${name} directly via WhatsApp or phone.`,

    directReservation: 'Direct Reservation',
    selectDatesTitle: 'Select Dates & Reserve Directly',
    selectDatesSubtitle: 'Transparent direct rates • Zero platform fee • Contactless host handoff',
    staySummary: 'Stay Summary',
    staySummarySubtitle: 'Direct rate with zero hidden costs',
    dates: 'Dates',
    nightCount: (count) => `${count} ${count === 1 ? 'night' : 'nights'} stay`,
    cleaningAndLinens: 'Cleaning & Linens',
    includedFree: 'Included ($0)',
    totalStayCost: 'Total Stay Cost',
    advanceDeposit: (percent, amount) => `${percent}% Advance Deposit: ${amount}`,
    depositBalanceNote: 'Balance settled directly upon arrival.',
    selectDatesPrompt: 'Select your check-in and check-out dates on the calendar to unlock direct reservation.',
    minStayNotice: (minStay) => `Minimum stay: ${minStay} nights`,
    minStayAlert: (minStay, selected) =>
      `This property requires a minimum stay of ${minStay} nights (selected: ${selected}).`,
    requestDirectReservation: 'Request Direct Reservation',
    selectDatesToBook: 'Select Dates to Book',
    minStayButtonLabel: (minStay) => `Min Stay ${minStay} Nights`,
    travelDates: 'Travel Dates',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    addDate: 'Add date',
    instantBookingConfirmation: 'Instant direct booking',
    available: 'Available',
    selected: 'Selected',
    occupied: 'Occupied',
    clearDates: 'Clear dates',
    saveAndClose: 'Save & Close',
    confirmDatesWithCount: (count) => `Confirm Dates (${count} ${count === 1 ? 'night' : 'nights'})`,
    selectAtLeastNights: (minStay) => `Select at least ${minStay} nights`,

    proceedToBook: 'Proceed to Book',
    perNightSuffix: '/ night',

    directReservationRequest: 'Direct Reservation',
    stepSummaryTitle: 'Reservation Summary & Guest Details',
    contactlessHandoffTitle: 'Contactless Host Handoff',
    contactlessHandoffDesc: 'We connect you directly to the property owner. No third-party payment middleman extracts commissions from your stay.',
    requestWithDeposit: (amount) => `Request Reservation (${amount} Deposit)`,
    notifyingHost: (name) => `Notifying ${name}...`,
    notifyingHostDesc: 'Directly registering your dates and preparing host transfer coordinates.',
    flexibleStay: 'Flexible stay',
    softHoldReassurance: (hours) => `Selected dates are held for ${hours} hours pending deposit confirmation.`,
    cancellationPolicyLabel: 'Cancellation Policy: ',
    bookingDirectWith: (host, property) => `Booking directly with ${host} for ${property}`,
    paymentMethodHeading: 'Select Deposit Settlement Method',
    stayDetails: 'Stay Details',
    checkInDate: 'Check-in',
    checkOutDate: 'Check-out',
    totalNightsLabel: 'Total Stay',
    nightlyRate: 'Nightly Rate',
    totalStayLabel: 'Total Stay Cost',
    depositDueNow: 'Advance Deposit Due',
    balanceOnArrival: 'Balance on Arrival',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    specialRequests: 'Special Requests / Notes to Host',
    specialRequestsPlaceholder: 'Estimated arrival time, bedding preferences, questions...',
    directHostHandoffNotice:
      'Your reservation request goes directly to the host. The platform charges 0% fees and never handles your funds.',
    continueToConfirmation: 'Confirm & View Payment Details',
    enterDetailsPrompt: 'Please enter your name and email to proceed',
    processingRequest: 'Submitting request to host...',
    reservationConfirmedTitle: 'Reservation Request Sent!',
    reservationConfirmedSubtitle: 'Your direct booking request has been dispatched to the host.',
    bookingRef: 'Reference',
    howToPay: 'How to settle your advance deposit:',
    settleDepositPrompt: 'Send your deposit directly to the host credentials below:',
    blikInstructions: 'Send an instant BLIK phone transfer to the host with your reference.',
    ibanInstructions: 'Complete a standard bank transfer to the host account below.',
    arrivalInstructions: 'The host will contact you shortly to coordinate arrival details.',
    accountNumber: 'IBAN Account Number',
    recipient: 'Recipient',
    transferTitle: 'Transfer Title / Reference',
    copyNumber: 'Copy',
    copied: 'Copied!',
    doneClose: 'Done & Close',

    methodBlik: 'Instant BLIK Phone Transfer',
    methodBlikDesc: 'Zero-fee instant p2p transfer directly to the host phone number.',
    methodIban: 'Direct Bank Transfer (IBAN)',
    methodIbanDesc: 'Transfer directly to verified host bank credentials.',
    methodArrival: 'Pay on Arrival / Cash',
    methodArrivalDesc: 'Settle the entire stay balance upon check-in directly with host.',

    switchLanguage: 'Language',

    footerDirectPerks: '0% Commission • Best Rate Online',
    footerHospitality: 'Personalized Guest Experience',
    footerDirectConcierge: 'Direct booking concierge & bespoke stay experience',
    footerRightsReserved: (year, title) => `© ${year} ${title}. All rights reserved.`,
  },
};

/**
 * Resolves localized property fields based on current locale
 */
export function getLocalizedProperty(property: Property, locale: Locale): Property {
  // If no translation or locale matches the base property language, return property
  const tr = property.translations?.[locale];
  if (!tr) return property;

  return {
    ...property,
    title: tr.title ?? property.title,
    tagline: tr.tagline ?? property.tagline,
    location: tr.location ?? property.location,
    description: tr.description ?? property.description,
    amenities: tr.amenities ?? property.amenities,
    cancellationPolicy: tr.cancellationPolicy ?? property.cancellationPolicy,
    faq: tr.faq ?? property.faq,
    hostBio: tr.hostBio ?? property.hostBio,
  };
}
