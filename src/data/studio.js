// Single source of truth for studio identity, contact channels, and links.
// Update once here — every section pulls from this.

export const studio = {
  name: 'DevSolutions',
  founder: 'Farhan Sayyed',
  city: 'Mumbai',
  country: 'India',
  email: '\farhan.sayyed.tech@gmail.com',
  phone: '+918928040454',          // E.164 form for tel: links
  whatsapp: '918928040454',        // wa.me uses no plus sign
  whatsappText:
    'Hi Farhan, I came across DevSolutions and would love to discuss a project.'
}

// Pre-formatted helpers used across the page.
export const contact = {
  mailto: `mailto:${studio.email}`,
  tel:    `tel:${studio.phone}`,
  whatsapp: `https://wa.me/${studio.whatsapp}?text=${encodeURIComponent(studio.whatsappText)}`,
  emailLabel:    studio.email,
  whatsappLabel: '+91 89280 40454'
}
