export function displayAddress(address: string): string {
  return address.replace(/^\s*\d{4,6}\)\s*/, "");
}
