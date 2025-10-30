export const formatDateTime = (isoString: string | undefined): string => {
  if (!isoString) return '';

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}/${month}/${year}`;
};

export const formatNumberWithCommas = (value: string | number | undefined): string => {
  if (value === null || value === undefined) return '';
  
  // Chuyển về string, loại bỏ ký tự không phải số
  const numericValue = value.toString().replace(/[^\d]/g, '');
  if (!numericValue) return '';

  // Dùng regex thêm dấu phẩy ngăn cách hàng nghìn
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Optional: parse lại để gửi API
export const parseNumberFromFormatted = (value: string): number => {
  return Number(value.replace(/,/g, '')) || 0;
};

// Helper: format tiền
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

export const formatDate = (iso: string) => new Date(iso).toLocaleDateString('vi-VN');
export const formatTime = (iso: string) => new Date(iso).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });