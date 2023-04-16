  //declarei uma variavel global. Para poder utilizar tbm no filtro      
let usersJson = [];

let listaUsuarioFiltrada = [];

async function mostrarUsuarios() {
// condição criada para q se não houver filtro mostrar tudo, mas SE HOUVER ele vai puxar so um usuario de acordo com a função filter la no final. 
        if(usersJson.length === 0){
                let todosUsuarios = await fetch(`https://jsonplaceholder.typicode.com/users`);
                usersJson = await todosUsuarios.json();
                listaUsuarioFiltrada = usersJson;
        }
     //criar a estrutura da tabela   
        let tabela = document.getElementById('tabela');

        let tbody = document.createElement('tbody');
        tbody.id = "infos";
        tbody.className = "table-group-divider";

        //For each
        listaUsuarioFiltrada.forEach(usuario => {
                
        let tr = document.createElement('tr');

        let id = document.createElement('td');
        id.innerText = usuario.id;
        let nome = document.createElement('td');
        nome.innerText = usuario.name;
        let email = document.createElement('td');
        email.innerText = usuario.email;
        let endereco = document.createElement('td');
        endereco.innerText = usuario.address.street +' , ' + usuario.address.suite;
        let cidade = document.createElement('td');
        cidade.innerText = usuario.address.city;
        let telefone = document.createElement('td');
        telefone.innerText = usuario.phone;

        tr.appendChild(id);
        tr.appendChild(nome);
        tr.appendChild(email);
        tr.appendChild(telefone);
        tr.appendChild(endereco);
        tr.appendChild(cidade);
        
        tbody.appendChild(tr);

        });     
        tabela.appendChild(tbody);
          
         } 
         
         mostrarUsuarios();
         
// função filtro de acordo com a opção selecionada.
function filtro() {
        let tipoFiltro = document.getElementById('tipoFilter');
        let campoPesquisa = document.getElementById('filter');  

       // condiçoes de cada opção de filtro
        if (tipoFiltro.value === "1") {                     
             listaUsuarioFiltrada = usersJson.filter(usuario => usuario.id.toString() === campoPesquisa.value);
        }else if (tipoFiltro.value === "2"){
             listaUsuarioFiltrada = usersJson.filter(usuario => usuario.name.toString() === campoPesquisa.value);
        }else if (tipoFiltro.value === "3"){
                listaUsuarioFiltrada = usersJson.filter(usuario => usuario.address.city.toString() === campoPesquisa.value);
        }
        
       // se o campo estiver vazio, me retorna a lista completa novamente. 
        if(campoPesquisa.value.length === 0){
                listaUsuarioFiltrada = usersJson;
        }
        

       // recuperou a tabela completa e depois colocou o remove pra limpar tudo, com isso mostrarusuarios() NÃO será 0, portanto ele vai mostrar so o que foi filtrado.  
        let tabela = document.getElementById('infos');
        tabela.remove();
        mostrarUsuarios();
}


     