import React from 'react'

const NotFound = ({dataTheme}) => {
  const backgroundImage = dataTheme === 'light' ? 'url(../public/Img/404-day.jpg)' : 'url(../public/Img/404-night.jpg)'
  return (
    <div className='not-found' style={{backgroundImage: `${backgroundImage}`}}></div>
  )
}

export default NotFound
