import React from 'react'

// Components (Componentes)
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

// CSS 
import '.././../css/orden.css'



const Orden = ({
    carrito,
    addToCarrito,
    removeFromCarrito,
    increaseQuantity,
    decreaseQuantity,
    clearCarrito,
  }) => {

    // Carrito 
    console.log(carrito);

    // Funciones
    const isEmpty = () => carrito.length === 0;

    const carritoTotal = () =>
        carrito.reduce((total, item) => total + item.quantity * item.precio, 0);

    return (
        <>
            <Header 
                carrito={carrito}
                addToCarrito={addToCarrito}
                removeFromCarrito={removeFromCarrito}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCarrito={clearCarrito}
            />

            <main className='contenedor'>
                <h1 className='text-start'>Orden</h1>

                <div className='contenido_principal orden__container'>
                    <div>
                        <h2>Productos</h2>

                        {isEmpty() ? (
                        <h4 className="text-center ">El carrito esta vacio</h4>
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
                                            alt={`${(producto.id, producto.tipo)} imagen`}
                                        />
                                    </td>
                                    <td className=" ">
                                        {producto.tipo}
                                    </td>
                                    <td className=" ">
                                    {   producto.marca}
                                    </td>
                                    <td className="fw-bold">
                                    ${producto.precio}
                                    </td>
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

                            <p className="text-end">
                            Total pagar:{" "}
                            <span className="fw-bold">${carritoTotal()}</span>
                            </p>
                            
                            <div>
                                <button className="btn btn-dark w-100 mt-3 p-2" onClick={clearCarrito}>
                                    Vaciar Carrito
                                </button>
                            </div>
                            
                        </>
                        )}

                    </div>

                    <div>
                        <h2>Pago</h2>

                        <p>Total:</p>

                        <button className='btn btn-primary'>Comprar</button>

                        <h3></h3>
                    </div>
                </div>
            </main>

            <Footer/>
        </>
    )
}

export default Orden