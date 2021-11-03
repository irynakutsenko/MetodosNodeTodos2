let table = document.querySelector('table');
let colorInput = document.querySelector('#updateGranateInput');
let legsInput  = document.querySelector('#deleteLegsinput');
let addmesaForm = document.querySelector('#addMesa');

getMesas();

// Add event listeners to the input elements
colorInput.addEventListener('change',()=>{
    fetch(
        `/api/modify/${colorInput.value}`,
        {
            method: 'PUT',
        }
    )
    .then(r=>r.json())
    .then(data=>{
        getMesas();
    });
})

legsInput.addEventListener('change',()=>{
    fetch(
        `/api/borrar/${legsInput.value}`,
        {
            method: 'DELETE',
        }
    )
    .then(r=>r.json())
    .then(data=>{
        getMesas();
    });
})

addmesaForm.addEventListener('submit',event=>{
    event.preventDefault();
    let newMesa = {
        material : document.querySelector('#addMesaMaterial').value,
        size     : parseInt(document.querySelector('#addMesaSize').value),
        color    : document.querySelector('#addMesaColor').value,
        legs     : parseInt(document.querySelector('#addMesaLegs').value)
    }
    fetch(
        '/api/add',
        {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(newMesa)
        }
    )
    .then(r=>r.json())
    .then(getMesas)
})

function getMesas() {
    fetch(
        '/api/mesas'
    )
    .then(r=>r.json())
    .then(data=>{
        // remove old rows from the table
        table.querySelectorAll('.body-table').forEach(row=>row.remove());
        data.forEach(createHtmlMesa)
    });
}

function createHtmlMesa(mesa){
    // add a row to the table
    let row = document.createElement('tr');
    table.appendChild(row);
    row.classList.add('body-table');
    row.innerHTML = `
    <td>${mesa.material}</td>
    <td>${mesa.legs}</td>
    <td>${mesa.size}</td>
    <td>${mesa.color}</td>
    `
}

