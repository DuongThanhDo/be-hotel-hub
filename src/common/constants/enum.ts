export enum Role {
  customer = 'customer',
  staff = 'staff',
  admin = 'admin',
}

export enum StatusRoom {
  available = 'available',
  booked = 'booked',
  maintenance = 'maintenance',
}

export enum StatusBooking {
  pending = 'pending',
  confirmed = 'confirmed',
  cancelled = 'cancelled',
}

export enum StatusPayment {
  pending = 'pending',
  completed = 'completed',
  failed = 'failed',
}
