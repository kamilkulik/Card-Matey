const filterCardProps = (card) => {
  if (card) {
    const cleanData = Object.entries(card).filter(
      (property) => !['id', 'timestamp', 'cardSpec', 'userId'].includes(property[0]),
    )
    const cleanDataObject = Object.fromEntries(cleanData)
    return cleanDataObject
  }
  return {}
}

export default filterCardProps