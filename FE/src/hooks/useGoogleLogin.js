import { useState, useEffect } from 'react'

const params = {
  client_id: process.env.REACT_APP_GOOGLE_CLIENT_IN,
}

const useGoogleLogin = () => {
  const [loaded, setLoaded] = useState(false)

  const init = () => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init(params).then(
        () => {
          setLoaded(true)
        },
      )
    })
  }

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
    googleScript.onload = init
  }, [])

  return { loaded }
}

export default useGoogleLogin
