import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { fetchPreferenceId } from '../../Redux/actions';
import '../../css/orden.css';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const Orden = ({
    carrito,
    addToCarrito,
    removeFromCarrito,
    increaseQuantity,
    decreaseQuantity,
    clearCarrito,
    notificaciones,
    addToNotificaciones,
    addToCompras
}) => {
    const dispatch = useDispatch();
    const preferenceId = useSelector(state => state.preferenceId);

    useEffect(() => {
        // Inicializa Mercado Pago SDK con la clave pública
        initMercadoPago('TEST-5af066e7-e8b7-4bdc-b45a-f61db3669c4e', { locale: 'es-AR' });
    }, []);

    useEffect(() => {
        if (preferenceId) {
            // Aquí el componente Wallet manejará el proceso de pago
        }
    }, [preferenceId]);

    const notificacionCompra = (carrito, carritoTotal) => {
        const items = carrito.map(item => item.quantity + " " + item.tipo).join(", ");
        addToNotificaciones(`FELICIDADES por su compra en: ${items}. Con un importe de: ${carritoTotal}`);
    };

    const isEmpty = () => carrito.length === 0;

    const carritoTotal = () =>
        carrito.reduce((total, item) => total + item.quantity * item.precio, 0);

    const handleComprar = () => {
        addToCompras(carrito, carritoTotal());
        notificacionCompra(carrito, carritoTotal());
        dispatch(fetchPreferenceId(carrito));
    };

    return (
        <>
            <Header 
                carrito={carrito}
                addToCarrito={addToCarrito}
                removeFromCarrito={removeFromCarrito}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCarrito={clearCarrito}
                notificaciones={notificaciones}
            />

            <main className='contenedor__or'>
                <div className='contenido_principal__or'>
                    <div>
                        {isEmpty() ? (
                            <h4 className="text-center">El carrito está vacío</h4>
                        ) : (
                            <>
                                <table className="w-100 table">
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>Tipo</th>
                                            <th>Marca</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {carrito.map((producto) => (
                                            <tr key={producto.id}>
                                                <td>
                                                    <img
                                                        className="img-fluid"
                                                        src={producto.imagen}
                                                        alt={`${producto.tipo} imagen`}
                                                    />
                                                </td>
                                                <td>{producto.tipo}</td>
                                                <td>{producto.marca}</td>
                                                <td className="fw-bold">${producto.precio}</td>
                                                <td>
                                                    <div className="flex align-items-start gap-4">
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            onClick={() => decreaseQuantity(producto.id)}
                                                        >
                                                            -
                                                        </button>
                                                        {producto.quantity}
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            onClick={() => increaseQuantity(producto.id)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        onClick={() => removeFromCarrito(producto.id)}
                                                    >
                                                        X
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>

                    <div className='pago__total'>
                        <div>
                            <button className="btn__or" onClick={clearCarrito}>
                                Vaciar Carrito
                            </button>
                        </div>
                        <div className='suma__total'>
                            <p className="btn__or_txt">
                                Total pagar{" "}
                                <span className="btn__or_2">${carritoTotal()}</span>
                            </p>
                        </div>

                        <div id="wallet_container">
                            {preferenceId && (
                                <Wallet initialization={{ preferenceId }} />
                            )}
                            <button className='btn__or' onClick={handleComprar}>
                                Comprar
                            </button>
                        </div>
                        
                        <h3></h3>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Orden;
