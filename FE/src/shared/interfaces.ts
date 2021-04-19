export interface CanvasLogo {
  name: string;
  draw: (ctx: CanvasRenderingContext2D, magicNumber: number) => void;
}

export interface Card {
  cardSpec: CardSpec;
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  timestamp?: Date;
  userId?: string;
  website?: string;
}

export interface CardSpec {
  colour: string;
  logo: string;
  theme: string;
}

export interface Theme {
  name: string;
  pattern: string;
}
