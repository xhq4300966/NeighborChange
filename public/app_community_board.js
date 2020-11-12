document.getElementById('button_list').addEventListener('click', ()=>{
    window.location.href = "add_item.html";
})

document.getElementById('add_neighbor').addEventListener('click', ()=>{
    window.location.href = "add_neighborhood.html";
})


document.getElementById('button_acc').addEventListener('click', ()=>{
    window.location.href = "user.html";
})

window.addEventListener('load',()=>{
    fetch('/getItems')
        .then(resp=> resp.json())
        .then(data => {
            // console.log(data);
            for(let i=0;i<data.data.length;i++) {
                let date = data.data[i].date
                let itemName = data.data[i].account.itemName;
                let itemDescrip = data.data[i].account.itemDescrip;
                let itemEmail = data.data[i].account.itemEmail;

                // console.log(date);
                // console.log(itemName);
                // console.log(itemDescrip);
                // console.log(itemEmail);

                let elt1 = document.createElement('p');
                elt1.innerHTML = "Item List Date: " + date;

                let elt2 = document.createElement('p');
                elt2.innerHTML = "Item Name: " + itemName;
                
                let elt3 = document.createElement('p');
                elt3.innerHTML = "Description: " + itemDescrip;                
                
                let elt4 = document.createElement('p');
                elt4.innerHTML = "Email Contact: " + itemEmail;

                let elt5 = document.createElement('button');
                elt5.innerHTML = "Delete";
                elt5.setAttribute("id", "button_delete"[i]);
        
                document.getElementById('item_info').appendChild(elt1);
                document.getElementById('item_info').appendChild(elt2);
                document.getElementById('item_info').appendChild(elt3);
                document.getElementById('item_info').appendChild(elt4);
                document.getElementById('item_info').appendChild(elt5);

                document.getElementById('button_delete'[i]).addEventListener('click', ()=>{

                    //Create a JS object
                    let obj = {
                        "dataNo": i,
                        "itemDescrip": data.data[i].account.itemDescrip
                    }

                    console.log(obj);

                    //Stringify the JS object into JSON
                    let jsonData = JSON.stringify(obj);

                    fetch('/deleteItem', {
                        method: 'POST',
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: jsonData
                        })
                    .then (response => response.json())
                    .then (data => { 
                        console.log(data);
                        console.log("msg: datasaved");
                    })
            })
        }
    })
})
