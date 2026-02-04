export class VerifySellerDto {
  approve: boolean;

  reason?: string; // Required if rejecting
}
