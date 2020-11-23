const filterCardProps = (card) => {
  const cleanData = Object.entries(card).filter(
    (property) => !['id', 'timestamp'].includes(property[0])
  )
  const cleanDataObject = Object.fromEntries(cleanData)

  return cleanDataObject
}

export default filterCardProps
