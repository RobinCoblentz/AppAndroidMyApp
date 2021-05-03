export function numberValidator(number) {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  if (!re.test(number)) return "Ooops! Nous avons besoins d'un numero valide "
  return ''
}
