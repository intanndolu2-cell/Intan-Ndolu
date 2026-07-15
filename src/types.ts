export enum AppScreen {
  HOME = "HOME",
  LOGIN = "LOGIN",
  DASHBOARD = "DASHBOARD",
  BOOKING = "BOOKING",
  IN_TRIP = "IN_TRIP",
  CHAT = "CHAT",
}

export type ServiceType = 
  | "goride" 
  | "gocar" 
  | "gofood" 
  | "gosend" 
  | "gomart" 
  | "gotagihan" 
  | "gofood_sehat"
  | "more";

export interface BookingDetails {
  pickup: string;
  dropoff: string;
  date: string;
  payment: "Tunai" | "Gopay";
  price: number;
  service: ServiceType;
}

export interface DriverInfo {
  name: string;
  avatarUrl: string;
  type: string;
  rating: number;
  vehicle: string;
  phone: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "driver" | "system";
  text: string;
  timestamp: string;
}

export interface UserSession {
  username: string;
  isLoggedIn: boolean;
}

export interface AppRatingData {
  stars: number;
  feedback: string;
}

export interface DriverRatingData {
  like: "up" | "down" | null;
  feedback: string;
}
