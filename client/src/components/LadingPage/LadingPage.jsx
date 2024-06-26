
// React-router-doom
import { useNavigate, Link} from 'react-router-dom';

// CSS 
import "../../css/ladingPage.css"

const LadingPage = () => {

    // NAVEGACIÓN
    // Obtener la función de navegación
    const navigate = useNavigate();

    // 1.-Nav - Hacia Login
    // ----------------------------
    const handleEnterToLogin = () => {
        navigate('/login'); // Redirige a la ruta '/login'
    }

    // 2.-Nav - Hacia Register
    // ----------------------------
    const handleEnterToRegister = () => {
        navigate('/register'); // Redirige a la ruta '/register'
    }

    // 3.-Nav - Hacia Register
    // ----------------------------
    const handleEnterToLadingPage = () => {
        navigate('/'); // Redirige a la ruta '/'
    }


    const handleEnterToHomePage = () => {
        navigate('/homePage'); // Redirige a la ruta '/homePage'
    }

    return (
        <>           
            {/* Header */}
            <header className="header">
               
                <div className="contenedor">
                     {/* Barra */}
                    <div className="barra">
                        {/* Logo */}
                        <Link className="logo" to={'/'}>
                            <h1 className="logo_nombre no-margin">Logo</h1>
                        </Link>

                        {/* Navegacion */}
                        <div className="navegacion">
                            <a className="navegacion_enlace" onClick={handleEnterToRegister}>Registrate</a>
                            <a className="navegacion_enlace" onClick={handleEnterToLogin}>Iniciar Sesión</a>
                        </div>   
                    </div>
                </div>
            </header>
            

        </>
    )
}

export default LadingPage