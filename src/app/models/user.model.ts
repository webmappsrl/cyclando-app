export interface User {
  email: string;
  id: number;
  name: string;
}
export interface LoginResponse {
  token: string;
  user: User;
}
interface TripRouteName {
  en: string;
  it: string;
}
interface TripRouteSlug {
  en: string;
  it: string;
}
interface TripRouteActivity {
  en: string;
  it: string;
}
interface TripRouteLocation {
  en: string;
  it: string;
}
interface TripRouteParentLocation {
  en: string;
  it: string;
}
interface TripRoute {
  distance: number;
  duration: number;
  name: TripRouteName;
  slug: TripRouteSlug;
  image_url: string;
  activities: TripRouteActivity[];
  location: TripRouteLocation;
  parent_location: TripRouteParentLocation;
}
export interface Trip {
  name: string;
  tree_planted: boolean;
  from: string;
  to: string;
  balance_paid: boolean;
  account_paid: boolean;
  route: TripRoute;
}

export interface UserProfile {
  user: User;
  km_travelled: number;
  trees_planted: number;
  purchased_trips: Array<Trip>;
}
