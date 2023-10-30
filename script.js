document.addEventListener("DOMContentLoaded", function () {
    // Obtenemos los elementos html que vamos necesitar, el formulario y la lista
    const userForm = document.getElementById("userForm");
    const userList = document.getElementById("userList");
    const url = 'http://localhost:3000/users';
  
    
    // Función para validar email
    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    }
    
   
    
  
    // Metodo GET para devolver todos los usuarios cargados del servidor 
    fetch(url)
    .then(res => res.json() )
    .then((data ) => {
        for (const user of data) {
            const li = document.createElement('li');
            li.innerHTML=`${user.nombre} : ${user.direccion} : ${user.correo} : <button class="delete" data-id=${user.id} >Eliminar</button> 
            <button data-id=${user.id} class="edit">Editar</button> `;
            userList.appendChild(li);
        }
    })
      
    
    
    userForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        
        
        const user = { nombre : document.getElementById("name").value,
                      direccion : document.getElementById("address").value,
                      correo : document.getElementById("email").value }
  
  
        // Nos aseguramos de que los campos están rellenos y el email es de tipo email
        if (user.name && user.direccion && validateEmail(email)) {
          // Comprobamos que el email no existe
          if ( true ) {     //Pendiente de modificacion

            // Crea el nuevo elemento de la lista con los nuevos datos
            const listItem = addUserToList(user)
    
            // Comprobar si estamos editando un usuario
            if (userForm.dataset.editing) {
              // Recuperamos el email que estamos editando y el índice del elemento de la lista
              // const oldEmail = userForm.dataset.editing;
              const editingIndex = parseInt(userForm.dataset.editingIndex);
    
              // Reemplaza el elemento existente en el índice con el nuevo elemento
              userList.replaceChild(listItem, userList.children[editingIndex]);
              userForm.removeAttribute("data-editing"); 
              
            }
            // En este caso vamos a añadir el usuario creado al servidor mediante la peticion POST
            else {

            fetch(url,{
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
                
            }).then(response => {
                if (response.ok) {
                  return response.json();
                }
                return Promise.reject(response) 
            })
            //   .then(datos => datosServidor=datos)
            .catch(err => {
                console.log('Error en la petición HTTP: '+err.message);
            })
              
             
            // peticion.open('POST', 'http://localhost:3000/users');
            // peticion.setRequestHeader('Content-type', 'application/json');  
            // peticion.send(JSON.stringify(user));
            // peticion.addEventListener('load', function() {
            //     addUserToList(user);
            //     console.log(user);
            //   })

            }

            userForm.reset(); // Limpia el formulario
            userForm.querySelector("button[type='submit']").textContent = "Agregar Usuario"; // Restaura el texto del botón
          }
          else {
            alert('El email especificado ya existe en la lista');
          }
        }
        else {
          alert('Alguno de los campos no es correcto');
        }
      });
  
  
  
});
  