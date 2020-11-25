import { useEffect } from 'react'

const useDynamicFont = (targetFont, componentWidth) => {
  useEffect(() => {
    if (!componentWidth) return
    const root = document.documentElement
    const currentFontSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--card-font-size')
    )

    const magicNumber = targetFont / 317
    const newFontSize = Math.round(componentWidth * magicNumber)

    if (currentFontSize !== newFontSize) {
      root.style.setProperty('--card-font-size', newFontSize + 'px')
    }
  }, [componentWidth])
}

export default useDynamicFont

/*
DOCUMENTATION

how it works: 
1. it checks what's the currently value of the --card-font-size CSS property
2. it calculates the right new font size based on desired font size on 13" laptop screen
3. if the current font set is different from the new calculated font, the hook will update the CSS variable thus the font-size

arguments:
targetFont - desired font size on 13" laptop
componentWidth - width of rendered React Component

*/
