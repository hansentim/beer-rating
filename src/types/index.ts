export interface UserRating {
  beer_id: number;
  taste: number;
  feel: number;
  user_name: string;
}

export interface BeerResult {
  beerId: number;
  averageRating: number;
  totalRatings: number;
}

export interface Beer {
  id: number;
  name: string;
  description: string;
  alcoholContent: string;
  imageUrl: string;
}

export interface BeerCardProps {
  beer: Beer;
}

export interface ResultCardProps {
  rank: number;
  beerId: number;
  score: number;
  userScore: number;
}

export interface ResultTabsProps {
  results: Result[];
}

interface Result {
  beerId: number;
  totalScore: number;
  tasteScore: number;
  christmasScore: number;
  userTotal: number;
  userTaste: number;
  userChristmas: number;
}
