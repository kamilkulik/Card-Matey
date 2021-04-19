import { Card } from './interfaces';

export type Updates = Partial<Card>;

export type FormFields = Partial<Omit<Card, 'cardSpec'>>;
