document.getElementById('button_logoff').addEventListener('click', ()=>{
    window.location.href = "index.html";
})

document.getElementById("button_board").addEventListener('click', ()=>{
    window.location.href = "community_board.html";
})

document.getElementById("button_neighbor").addEventListener('click', ()=>{
    window.location.href = "add_neighborhood.html"
})


function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
      document.getElementById("button_personal").innerHTML = "Hide Account Details"
    } else {
      x.style.display = "none";
      document.getElementById("button_personal").innerHTML = "Reveal Account Details"

    }
  }

// window.addEventListener('load',()=>{
//     fetch('/getAccount')
//     .then(resp=> resp.json())
//     .then(data => {
//         console.log(data);
//     })
// })


document.getElementById("button_listu").addEventListener('click', ()=>{
    window.location.href = "add_item.html"
})


window.addEventListener('load',()=>{
    // alert("Log in success!");
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

                let elt5 = document.createElement('button');
                elt5.innerHTML = "Delete";
                elt5.setAttribute("id", "button_delete"[i]);
        
                document.getElementById('item_infou').appendChild(elt1);
                document.getElementById('item_infou').appendChild(elt2);
                document.getElementById('item_infou').appendChild(elt3);
                document.getElementById('item_infou').appendChild(elt5);

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
