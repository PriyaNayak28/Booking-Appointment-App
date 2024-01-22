function saveTheData(event) {
    event.preventDefault();

    const NAME = event.target.username.value;
    const EMAIL = event.target.emailId.value;
    const PHONE = event.target.phoneNo.value;

    let userDetails = {
        NAME,
        EMAIL,
        PHONE,
    }

    axios.post("https://crudcrud.com/api/3c1e5cf60ae649fb826b6cd325592f1f/bookingApp", userDetails)
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })

    // let userDetail = JSON.stringify(userDetails);
    // localStorage.setItem('userDetails', userDetail);

    // let myObj = JSON.parse(localStorage.getItem('userDetails')); it is not 

    localStorage.setItem(userDetails.EMAIL, JSON.stringify(userDetails));

    const newLi = document.createElement('li');
    const ul = document.getElementById('listitem');

    //newLi.innerHTML = `Name: ${myObj.NAME}, Email: ${myObj.EMAIL}, Phone: ${myObj.PHONE}`;
    newLi.innerHTML = `Name: ${userDetails.NAME}, Email: ${userDetails.EMAIL}, Phone: ${userDetails.PHONE}` + '<button class="delete-btn">delete</button>' + '<button class="edit-btn">edit</button>';
    ul.appendChild(newLi);

    ul.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            deleteItem = event.target.parentElement;
            ul.removeChild(deleteItem);
            localStorage.removeItem(userDetails.EMAIL);
        }


    })
    ul.addEventListener('click', function (event) {
        if (event.target.classList.contains('edit-btn')) {
            editItem = event.target.parentElement;
            ul.removeChild(editItem);
            localStorage.removeItem(userDetails.EMAIL);

            document.getElementById('username').value = userDetails.NAME;
            document.getElementById('emailId').value = userDetails.EMAIL;
            document.getElementById('phoneNo').value = userDetails.PHONE;
        }
    })


};

