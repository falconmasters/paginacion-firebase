const contenedorCards = document.getElementById('cards');
const botonAnterior = document.getElementById('botonAnterior');
const botonSiguiente = document.getElementById('botonSiguiente');

let ultimoDoc = null;
let primerDoc = null;

// Agregar personas a la BD
// const personas = [
// 	{nombre: 'Oliver', correo: 'oliver@correo.com', numero: 1},
// 	{nombre: 'Alejandro', correo: 'alejandro@correo.com', numero: 2},
// 	{nombre: 'Cesar', correo: 'cesar@correo.com', numero: 3},
// 	{nombre: 'Manuel', correo: 'manuel@correo.com', numero: 4},
// 	{nombre: 'Angela', correo: 'angela@correo.com', numero: 5},
// 	{nombre: 'Andres', correo: 'andres@correo.com', numero: 6},
// 	{nombre: 'Estefania', correo: 'estefania@correo.com', numero: 7},
// 	{nombre: 'Christopher', correo: 'christopher@correo.com', numero: 8},
// 	{nombre: 'Sergio', correo: 'sergio@correo.com', numero: 9},
// 	{nombre: 'Valeria', correo: 'valeria@correo.com', numero: 10},
// 	{nombre: 'Luis', correo: 'luis@correo.com', numero: 11},
// 	{nombre: 'Roberto', correo: 'roberto@correo.com', numero: 12},
// ];

// personas.forEach(persona => {
// 	db.collection('usuarios').add(persona);
// });

db.collection('usuarios').orderBy('numero', 'asc').limit(4).onSnapshot((snapshot) => {
	// console.log(snapshot.docs[0].data());

	cargarDocumentos(snapshot.docs);
});

const cargarDocumentos = (documentos) => {
	if(documentos.length > 0){
		ultimoDoc = documentos[documentos.length - 1];
		primerDoc = documentos[0];
		
		contenedorCards.innerHTML = '';

		documentos.forEach(documento => {
			contenedorCards.innerHTML += `
				<div class="card">
					<div class="datos">
						<div class="foto">
							<img src="https://i.pravatar.cc/150?img=${documento.data().numero}" alt="">
						</div>
						<div class="usuario">
							<p class="nombre">${documento.data().nombre}</p>
							<p class="correo">${documento.data().correo}</p>
						</div>
					</div>
					<p class="numero">#${documento.data().numero}</p>
				</div>
			`;
		});
	}
}

botonSiguiente.addEventListener('click', () => {
	db
		.collection('usuarios')
		.orderBy('numero', 'asc')
		.limit(4)
		.startAfter(ultimoDoc)
		.onSnapshot((snapshot) => {
			cargarDocumentos(snapshot.docs);
		}
	);
});

botonAnterior.addEventListener('click', () => {
	db
		.collection('usuarios')
		.orderBy('numero', 'desc')
		.limit(4)
		.startAfter(primerDoc)
		.onSnapshot((snapshot) => {
			const documentos = snapshot.docs.reverse();
			cargarDocumentos(documentos);
		}
	);
});