export interface TravelPlan {
  id: string;
  startDate: Date;
  endDate: Date;
  city: string;
  country: string;
  state?: string;
  description: string;
  userID: string;
  pinID: string;
}
