console.log("hello from app.js!!");

window.addEventListener('load',()=>{
    document.getElementById('button_list_item').addEventListener('click', ()=>{
        let itemEmail = document.getElementById('list_email').value;
        let itemName = document.getElementById('list_name').value;
        let itemDescription = document.getElementById('list_descrip').value;
        // let itemImg = document.getElementById('list_image').value;

        console.log("Account Email: " + itemEmail);
        console.log("Item Name: " + itemName);
        console.log("Item Description: " + itemDescription);
        // // console.log("Item Image: " + itemImg);

        //Create a JS object
        let obj = {
            "itemEmail": itemEmail,
            "itemName": itemName,
            "itemDescrip": itemDescription,
            // "itemImg": itemImg
        }

        //Stringify the JS object into JSON
        let jsonData = JSON.stringify(obj);
        fetch('/itemLog', {
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
            // window.alert("Item logged successfully!")

    })
})