console.log("hello from app.js!!");

window.addEventListener('load',()=>{
    document.getElementById('button_log').addEventListener('click', ()=>{
        let accountName = document.getElementById('account_name').value;
        let addressName = document.getElementById('address_name').value;
        let emailName = document.getElementById('email_name').value;

        console.log("Account Name: " + accountName);
        console.log("Address Name: " + addressName);
        console.log("Email: " + emailName);


        //Create a JS object
        let obj = {
            "accountName": accountName,
            "addressName": addressName,
            "emailName": emailName
        }

        //Stringify the JS object into JSON
        let jsonData = JSON.stringify(obj);


        //Use FETCH request of type POST to send ACCOUNT info to the server
        fetch('/accountLog', {
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

        window.alert("Account registered successfully!")
        window.location.href = "user.html";
    })
})

