export function normalizePhone(phone) {
    phone = phone?.replace(/\s+/g, '')
    if (phone?.startsWith('+880')) return phone.slice(1)
    if (phone?.startsWith('0')) return '880' + phone.slice(1)
    return phone
  }