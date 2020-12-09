const logos = [
  {
    name: 'squares',
    draw: (ctx) => {
      const {
        canvas: { clientWidth: width },
        canvas: { clientHeight: height },
      } = ctx
      ctx.fillStyle = 'rgb(200,0,0)'
      ctx.fillRect(15, 15, 50, 50)

      ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
      ctx.fillRect(35, 35, 50, 50)
    },
  },
  {
    name: 'triangles',
    draw: (ctx) => {
      ctx.beginPath()
      ctx.moveTo(10, 50)
      ctx.lineTo(40, 75)
      ctx.lineTo(40, 25)
      ctx.fillStyle = 'rgb(200,0,0)'
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(90, 50)
      ctx.lineTo(60, 75)
      ctx.lineTo(60, 25)
      ctx.fillStyle = 'rgb(0,0,200, 0.5)'
      ctx.fill()
    },
  },
  {
    name: 'circles',
    draw: (ctx) => {
      ctx.lineWidth = 2

      for (let i = 1; i <= 4; i++) {
        const colors = [
          'rgb(200, 0, 0)',
          'rgba(200, 0, 0, 0.5)',
          'rgba(0, 0, 200, 0.5)',
          'rgba(0, 0, 200)',
        ]
        let x = 20 * i

        ctx.beginPath()
        ctx.arc(x, 50, 15, 0, Math.PI * 2, false)
        ctx.strokeStyle = colors[i - 1]
        ctx.stroke()
      }
    },
  },
]

export default logos
