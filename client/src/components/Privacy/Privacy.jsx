import React from 'react';

import "../../css/privacy.css"

function Privacy() {
  return (
    <div className="container__py">
      <h1 className='h1__py'>Política de Privacidad</h1>
    
      <div className="content__py">
        <p className="p__py">Bienvenido a la política de privacidad de nuestro sitio web Campeones del Mundo. En Campeones del Mundo, respetamos tu privacidad y nos comprometemos a proteger la información personal que compartes con nosotros. Esta política explica cómo recopilamos, usamos, compartimos y protegemos tu información personal cuando visitas nuestro sitio web o utilizas nuestros servicios.</p>

        <section>
          <h2 className='h2__py'>1. Información que Recopilamos</h2>
          <p className="p__py">Recopilamos información personal que tú nos proporcionas de manera voluntaria cuando interactúas con nuestro sitio web, como cuando realizas una compra, te registras en nuestro boletín informativo, o nos contactas a través de la información proporcionada en nuestro sitio.</p>
          <p className="p__py">La información personal que podemos recopilar incluye:</p>
          <ul className='ul__py'>
            <li>Nombre completo</li>
            <li>Dirección de correo electrónico</li>
            <li>Dirección postal</li>
            <li>Información de contacto proporcionada en nuestro sitio web</li>
          </ul>
          <p className="p__py">Además, recopilamos automáticamente cierta información técnica sobre tu equipo y tus patrones de navegación cuando visitas nuestro sitio web, mediante cookies y tecnologías similares. Esta información puede incluir tu dirección IP, tipo de navegador, proveedor de servicios de Internet, páginas de referencia/salida, y la fecha/hora de acceso.</p>
        </section>

        <section>
          <h2 className='h2__py'>2. Uso de la Información</h2>
          <p className="p__py">Utilizamos la información recopilada para los siguientes propósitos:</p>
          <ul className='ul__py'>
            <li>Procesar tus pedidos y transacciones</li>
            <li>Comunicarnos contigo y proporcionarte asistencia al cliente</li>
            <li>Enviar correos electrónicos promocionales y boletines informativos, siempre con tu consentimiento previo</li>
            <li>Personalizar tu experiencia en nuestro sitio web y mejorar nuestros productos y servicios</li>
            <li>Detectar y prevenir fraudes y actividades no autorizadas</li>
          </ul>
        </section>

        <section>
          <h2 className='h2__py'>3. Compartir Información</h2>
          <p className="p__py">No vendemos, alquilamos ni compartimos tu información personal con terceros no afiliados, excepto según se describe en esta política o cuando sea requerido por la ley. Podemos compartir tu información con proveedores de servicios que necesiten acceder a dicha información para brindar servicios en nuestro nombre, como procesadores de pagos y servicios de entrega.</p>
        </section>

        <section>
          <h2 className='h2__py'>4. Seguridad de la Información</h2>
          <p className="p__py">Implementamos medidas de seguridad adecuadas para proteger la información personal que recopilamos y mantenemos. Sin embargo, no podemos garantizar la seguridad absoluta de la información durante su transmisión o almacenamiento.</p>
        </section>

        <section>
          <h2 className='h2__py'>5. Tus Derechos y Elecciones</h2>
          <p className="p__py">Tienes derecho a acceder, corregir o eliminar tu información personal en cualquier momento. También puedes optar por no proporcionar cierta información personal, aunque esto podría limitar tu capacidad para utilizar algunas características de nuestro sitio web. Para ejercer estos derechos, contáctanos utilizando la información de contacto proporcionada en nuestro sitio web.</p>
        </section>

        <section>
          <h2 className='h2__py'>6. Cambios en esta Política de Privacidad</h2>
          <p className="p__py">Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento para reflejar cambios en nuestras prácticas de información. Te recomendamos revisar esta página con regularidad para estar informado sobre cómo estamos protegiendo tu información.</p>
        </section>

        <section>
          <h2 className='h2__py'>7. Contacto</h2>
          <p className="p__py">Si tienes preguntas o inquietudes sobre nuestra política de privacidad, por favor contáctanos a través de la información de contacto proporcionada en nuestro sitio web.</p>
        </section>
      </div>

      <p className="thanks">Gracias por confiar en Campeones del Mundo para tus necesidades deportivas. Estamos comprometidos en proteger tu privacidad y proporcionarte una experiencia segura y satisfactoria en nuestro sitio web.</p>
</div>
  );
}

export default Privacy;
