export function parseDateToYYYYMMDD(date) {
  if (date === 'today') return new Date().toISOString().split('T')[0];
  return new Date(date).toISOString().split('T')[0];
}

export function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function deductDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}
