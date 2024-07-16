import React from 'react'

const Notificacion = ({tipo_notificacion, mensaje, timestamp}) => {

    console.log(tipo_notificacion)
  return (
    <div className=''>
        <p>{mensaje}</p>

        <p>{timestamp}</p>
    </div>
  )
}

export default Notificacion