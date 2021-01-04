import { useEffect } from 'react'

const useGoogleLogin = () => {
  useEffect(() => {
    const element = document.getElementsByTagName('script')[0]
    const googleScript = document.createElement('script')
    googleScript.id = 'google-login'
    googleScript.src = 'https://apis.google.com/js/platform.js'
    googleScript.setAttribute('async', '')
    googleScript.setAttribute('defer', '')
    if (element && element.parentNode) {
      element.parentNode.insertBefore(googleScript, element)
    } else {
      document.head.appendChild(googleScript)
    }
  }, [])
}

export default useGoogleLogin
