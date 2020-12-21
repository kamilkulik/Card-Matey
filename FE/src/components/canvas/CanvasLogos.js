// check on dynamic sizing
// fallback state pattern

const logos = [
  {
    name: 'squares',
    draw: (ctx, magicNumber) => {
      ctx.fillStyle = '#000'
      ctx.fillRect(15 * magicNumber, 15 * magicNumber, 50 * magicNumber, 50 * magicNumber)

      ctx.fillStyle = '#BDBBBB'
      ctx.fillRect(35 * magicNumber, 35 * magicNumber, 50 * magicNumber, 50 * magicNumber)
    },
  },
  {
    name: 'triangles',
    draw: (ctx, magicNumber) => {
      ctx.beginPath()
      ctx.moveTo(10 * magicNumber, 50 * magicNumber)
      ctx.lineTo(40 * magicNumber, 75 * magicNumber)
      ctx.lineTo(40 * magicNumber, 25 * magicNumber)
      ctx.fillStyle = '#000'
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(90 * magicNumber, 50 * magicNumber)
      ctx.lineTo(60 * magicNumber, 75 * magicNumber)
      ctx.lineTo(60 * magicNumber, 25 * magicNumber)
      ctx.fillStyle = '#BDBBBB'
      ctx.fill()
    },
  },
  {
    name: 'circles',
    draw: (ctx, magicNumber) => {
      ctx.lineWidth = 4

      for (let i = 1; i <= 4; i++) {
        const colors = ['#000', '#616161', '#939393', '#BDBBBB']
        const x = 20 * i * magicNumber

        ctx.beginPath()
        ctx.arc(x, 50 * magicNumber, 15 * magicNumber, 0, Math.PI * 2, false)
        ctx.strokeStyle = colors[i - 1]
        ctx.stroke()
      }
    },
  },
]

export default logos
