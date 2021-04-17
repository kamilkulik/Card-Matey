interface CardSpec {
  colour: string;
  logo: string;
  theme: string;
}

export interface Card {
  cardSpec: Record<string, CardSpec>;
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  timestamp?: Date;
  userId: string;
  website?: string;
}
