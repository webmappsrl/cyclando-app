export interface User {
  email: string;
  id: number;
  name: string;
}
export interface LoginResponse {
  token: string;
  user: User;
}

export interface Languages {
  en?: string;
  it?: string;
}
export interface TripRouteName extends Languages {}
export interface TripRouteSlug extends Languages {}
export interface TripRouteActivity extends Languages {}
export interface TripRouteLocation extends Languages {}
export interface TripRouteParentLocation extends Languages {}
export interface TripRoute {
  id: number;
  distance: number;
  duration: number;
  name: TripRouteName;
  price: number;
  percent_discount?: number;
  saleable?: boolean;
  slug: TripRouteSlug;
  image_url: string;
  pdf_url?: string;
  activities: TripRouteActivity[];
  location: TripRouteLocation;
  parent_location: TripRouteParentLocation;
}
export interface Trip {
  name: string;
  tree_planted: boolean;
  from: string;
  to?: string;
  balance_paid: boolean;
  account_paid: boolean;
  route: TripRoute;
}

export interface UserProfile {
  user: User;
  km_travelled: number;
  trees_planted: number;
  purchased_trips: Array<Trip>;
  favorites_count: number;
}
