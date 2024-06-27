import bannerImage from '../assets/image/banner.jpg';
import Logo from '../components/Logo';

function LandingPage() {
  return (
    <div className="App">

      {/* Navbar */}
      <div className="navbar bg-custom-blue text-white p-5 flex justify-between items-center">
        <div className="navbar-brand text-2xl flex items-center">
          <Logo />
        </div>
          <div className="navbar-links flex">
          <div className="navbar-item mx-5">Servicios</div>
          <div className="navbar-item mx-5">Contacto</div>
          <div className="navbar-item mx-5">
            <a href="/login" className="button-login text-blue-500">Iniciar Sesión</a>
          </div>
          </div>
      </div>


      {/* Banner */}
      <section className="bg-gray-900 text-white" style={{ backgroundImage: `url(${bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
          <h1 className="animate-pulse bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Potencia tu Aprendizaje.
          <span className="sm:block"> Alcanza tus Metas. </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-gray-200">
              Explora nuestra amplia gama de cursos diseñados para ayudarte a dominar nuevas habilidades y avanzar en tu carrera.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="#"> Get Started </a>
              <a className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="/Register" > Registrate Aqui </a>
            </div>
          </div>
        </div>
      </section>
      

      {/* Servicios */}
      <div className="box-2 mt-10 flex justify-center">
          <div className="sub-box text-center p-5 m-2 bg-white rounded-lg shadow-md">
            <img src="/src/assets/image/tutor.jpg" alt="Imagen de Tutoría" className="w-full h-64 object-cover rounded-lg" />
            <h2 className="text-xl font-bold mt-4">Sesiones de tutoría personalizadas</h2>
            <p className="mt-2">
              Nuestras sesiones de tutoría personalizadas y asistencia virtual en nuestra plataforma con chatgpt brindan apoyo personalizado para ayudar a los estudiantes a sobresalir en sus estudios. Nuestros tutores experimentados crean planes de lecciones personalizados para abordar las necesidades y el estilo de aprendizaje únicos de cada estudiante. Ya sea que necesite ayuda con un tema específico, desee mejorar el rendimiento académico general, o requiera asistencia virtual a través de nuestra plataforma con chatgpt, nuestros tutores están aquí para guiarlo hacia el éxito.
            </p>
            <a className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="#"> Mas informacion
            </a>
          </div>
          <div className="sub-box text-center p-5 m-2 bg-white rounded-lg shadow-md">
            <img src="/src/assets/image/libros.jpg" alt="Imagen de Cursos" className="w-full h-64 object-cover rounded-lg" />
            <h2 className="text-xl font-bold mt-4">Cursos interactivos en línea</h2>
            <p className="mt-2">
              Experimente la comodidad de aprender en cualquier momento y en cualquier lugar con nuestros cursos interactivos en línea. Diseñados para ser atractivos e interactivos, nuestros cursos cubren una amplia gama de temas y son impartidos por instructores expertos. Únase a nuestra aula virtual y conéctese con otros estudiantes para intercambiar ideas y colaborar en proyectos, haciendo que su experiencia de aprendizaje sea realmente enriquecedora.
            </p>
            <a className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="#"> Mas informacion
            </a>
          </div>
          <div className="sub-box text-center p-5 m-2 bg-white rounded-lg shadow-md">
            <img src="/src/assets/image/aula.jpg" alt="Imagen de Talleres" className="w-full h-64 object-cover rounded-lg" />
            <h2 className="text-xl font-bold mt-4">Talleres de desarrollo de habilidades</h2>
            <p className="mt-2">
              Potencia tus habilidades a través de nuestros talleres de desarrollo de habilidades. Dirigidos por expertos de la industria, estos talleres brindan capacitación práctica en áreas como comunicación, liderazgo, resolución de problemas y más. Obtenga información valiosa, aprenda nuevas técnicas y mejore su desarrollo profesional con nuestros talleres diseñados para satisfacer las demandas del competitivo mercado laboral actual.
            </p>
            <a className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="#"> Mas informacion
            </a>
          </div>
      </div>

      {/* Intructores */}
      <div className="box-3 bg-white p-5 m-5 rounded-lg shadow-md">
        <div className="instructor-container flex overflow-x-auto gap-5">
          <div className="instructor-box text-center p-5 bg-gray-100 rounded-lg shadow-md min-w-[300px]">
            <div className="relative overflow-hidden pb-[75%] rounded-lg">
              <img src="/src/assets/image/1.jpg" alt="Instructor 1" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold mt-4">Instructor 1</h3>
            <p className="mt-2">Desarrollador de Aplicaciones Móviles: Especializado en crear aplicaciones nativas para dispositivos móviles. Ha trabajado en proyectos para iOS y Android. Realidad Aumentada y Geolocalización: Ha explorado tecnologías emergentes, como ARKit y ARCore. Ha desarrollado experiencias inmersivas. Creativo e Innovador: Siempre busca nuevas formas de resolver problemas. Ha creado aplicaciones interactivas y sorprendentes para los usuarios.</p>
          </div>
          <div className="instructor-box text-center p-5 bg-gray-100 rounded-lg shadow-md min-w-[300px]">
            <div className="relative overflow-hidden pb-[75%] rounded-lg">
              <img src="/src/assets/image/2.jpg" alt="Instructor 2" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold mt-4">Instructor 2</h3>
            <p className="mt-2">Experto en Desarrollo Web: Con amplia experiencia en la creación de sitios web atractivos y funcionales. Domina lenguajes como HTML, CSS y JavaScript. Diseñador de Interfaces de Usuario: Apasionado por diseñar interfaces intuitivas y agradables para el usuario. Se enfoca en la usabilidad y la accesibilidad. Especialista en Comercio Electrónico: Ha trabajado en proyectos de tiendas en línea, optimizando la experiencia de compra y la conversión de usuarios.</p>
          </div>
          <div className="instructor-box text-center p-5 bg-gray-100 rounded-lg shadow-md min-w-[300px]">
            <div className="relative overflow-hidden pb-[75%] rounded-lg">
              <img src="/src/assets/image/3.jpg" alt="Instructor 3" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold mt-4">Instructor 3</h3>
            <p className="mt-2">Administrador de Sistemas: Experto en configuración y mantenimiento de servidores. Ha implementado soluciones escalables para empresas y organizaciones. Gestor de Bases de Datos: Conocimiento profundo en bases de datos SQL y NoSQL. Ha diseñado esquemas eficientes y asegurado la integridad de los datos. Infraestructura en la Nube: Ha colaborado en proyectos de migración a la nube, optimizando recursos y garantizando la disponibilidad.</p>
          </div>
          <div className="instructor-box text-center p-5 bg-gray-100 rounded-lg shadow-md min-w-[300px]">
            <div className="relative overflow-hidden pb-[75%] rounded-lg">
              <img src="/src/assets/image/4.jpg" alt="Instructor 4" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold mt-4">Instructor 4</h3>
            <p className="mt-2">Algoritmos y Estructuras de Datos: Apasionado por la resolución eficiente de problemas. Ha estudiado algoritmos clásicos y modernos. Competidor de Programación: Ha participado en competencias de programación, enfrentándose a desafíos complejos. Siempre busca optimizar su código. Contribuidor de Código Abierto: Activo en comunidades de desarrollo. Ha aportado a proyectos de código abierto, compartiendo su conocimiento.</p>
          </div>
        </div>
      </div>

      {/* Videos */}
      {/* <section className="videos-section p-10 bg-gray-200">
        <h2 className="text-3xl font-bold text-center mb-10">Videos Destacados</h2>
        <div className="videos-container flex justify-center flex-wrap gap-6">
          <div className="video-box w-full sm:w-1/2 lg:w-1/3 p-4">
            <iframe
              className="w-full h-64"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video de YouTube 1"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="video-box w-full sm:w-1/2 lg:w-1/3 p-4">
            <iframe
              className="w-full h-64"
              src="https://www.youtube.com/embed/3JZ_D3ELwOQ"
              title="Video de YouTube 2"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="video-box w-full sm:w-1/2 lg:w-1/3 p-4">
            <iframe
              className="w-full h-64"
              src="https://www.youtube.com/embed/l9nh1l8ZIJQ"
              title="Video de YouTube 3"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section> */}

      {/* Contacto */}
      <div className="box-4 bg-white p-5 m-5 rounded-lg shadow-md flex">
          {/* Google Maps */}
          <div className="w-1/2 h-full flex items-center justify-center">
        <div className="w-full h-96 rounded-lg shadow-md overflow-hidden">
          {/* <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15904.227315890587!2d-76.60937722622427!3d2.4447251931125995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e303c90d635d55f%3A0x5041c1f3e61ff2bc!2sPan-American%20Highway%2C%20Popay%C3%A1n%2C%20Cauca!5e0!3m2!1sen!2sco!4v1620834229824!5m2!1sen!2sco"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Maps"
          ></iframe> */}
        </div>
      </div>
  
      {/* Contact Form */}
      <div className="w-1/2 p-5 flex items-center justify-center">
          <div className="contact-form text-center w-full max-w-md">
            <h2 className="text-2xl font-bold mb-5">¡Contáctanos!</h2>
            <form action="procesar_formulario.php" method="post" className="flex flex-col items-center">
              <label htmlFor="nombre" className="mb-2">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                placeholder="Ingresa tu nombre"
                className="mb-4 p-2 border rounded w-full"
              />
              <label htmlFor="email" className="mb-2">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Ingresa tu correo electrónico"
                className="mb-4 p-2 border rounded w-full"
              />
              <label htmlFor="mensaje" className="mb-2">Mensaje:</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="4"
                required
                placeholder="Escribe tu mensaje aquí"
                className="mb-4 p-2 border rounded w-full"
              ></textarea>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Enviar</button>
            </form>
          </div>
        </div>
      </div>


      {/* Footer */}
      <footer className="mi-footer bg-gradient-to-r from-gray-800 to-gray-600 text-white p-5 text-center">
        <p>© 2024 Aprendix. Todos los derechos reservados.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:text-gray-300 transition duration-300">Política de privacidad</a>
          <a href="#" className="hover:text-gray-300 transition duration-300">Términos y condiciones</a>
          <a href="#" className="hover:text-gray-300 transition duration-300">Contacto</a>
        </div>
      </footer>

    </div>
  );
}

export default LandingPage;
