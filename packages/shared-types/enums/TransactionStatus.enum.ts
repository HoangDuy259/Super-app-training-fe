export enum TransactionStatus {
  Start = 'START',
  Pending = 'PENDING', // giao dịch đang chờ xử lý
  Success = 'SUCCESS', // giao dịch thành công
  Failed = 'FAILED', // giao dịch thất bại
  Cancelled = 'CANCELLED', // giao dịch bị hủy
}
