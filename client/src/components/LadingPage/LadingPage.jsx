import { useNavigate} from 'react-router-dom';

const LadingPage = () => {

    // NAVEGACIÓN
    // Obtener la función de navegación
    const navigate = useNavigate();

    const handleEnterToHomePage = () => {
        navigate('/homePage'); // Redirige a la ruta '/homePage'
    }

    return (
        <>
            <button onClick={handleEnterToHomePage}>A HomePage 2</button>
        </>
    )
}

export default LadingPage