document.getElementById('enter_button').addEventListener('click', ()=>{
    let checkEmail = document.getElementById('email_entered').value;

    let obj = {
        "emailEntered": checkEmail
    }

    let jsonData = JSON.stringify(obj);

    console.log(jsonData);

    fetch('/accountCheck', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: jsonData
    })
    .then(response => response.json())
    .then(
        data => {console.log(data)
        if (data['success']){
            alert("Account existed, you will enter the account page");
            window.location.href = "user.html";
        } else {
            alert("Account does not exist, redirecting to account registry...")
            window.location.href = "register.html";
        }
    });
})


document.getElementById('button_newusers').addEventListener('click', ()=>{
    window.location.href = "register.html";
})