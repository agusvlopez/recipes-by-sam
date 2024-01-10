import coverHome from '../covers/home.jpg';

export default function HomePage() {
    return (
        <>
            <section className="pt-12 bg-gray-100">
                <div className="container mx-auto">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                            Welcome to Recipes by Sam
                        </h1>
                        <p className="text-xl text-gray-600">
                            Find out delicius recipes and create incredible dishes with my recipe books.
                        </p>
                    </div>
                </div>
                <div className='pt-6'>
                    <img src={coverHome} alt="" className='h-1/4' />
                </div>
            </section>
            <section className="py-12">
                <div className="container mx-auto">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 leading-tight mb-4">
                            Favorite Recipes
                        </h2>
                        <p className="text-lg text-gray-600">
                            Explore our most popular recipes and surprise your loved ones.
                        </p>
                    </div>

                    {/* Sección de Recetas Destacadas (puedes personalizar y agregar elementos según sea necesario) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {/* Receta destacada 1 */}
                        <div className="bg-white p-4 rounded-md shadow-md">
                            {/* Contenido de la receta destacada 1 */}
                            <h3 className="text-lg font-semibold mb-2">Nombre de la Receta</h3>
                            {/* Otras detalles de la receta */}
                        </div>

                        {/* Receta destacada 2 */}
                        <div className="bg-white p-4 rounded-md shadow-md">
                            {/* Contenido de la receta destacada 2 */}
                            <h3 className="text-lg font-semibold mb-2">Nombre de la Receta</h3>
                            {/* Otras detalles de la receta */}
                        </div>

                        {/* ... Más recetas destacadas ... */}
                    </div>
                </div>
            </section>
        </>
    )
}