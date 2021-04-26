import { Card } from '../shared';

const filterCardProps = (card: Card) => {
  if (card) {
    const cleanData = Object.entries(card).filter((property) => !['id', 'timestamp', 'cardSpec', 'userId'].includes(property[0]));
    const cleanDataObject = Object.fromEntries(cleanData);
    return cleanDataObject;
  }
  return {};
};

export default filterCardProps;
