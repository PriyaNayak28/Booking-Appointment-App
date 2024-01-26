
function saveTheData(event) {
    event.preventDefault();

    const NAME = event.target.username.value;
    const EMAIL = event.target.emailId.value;
    const PHONE = event.target.phoneNo.value;

    let userDetails = {
        NAME,
        EMAIL,
        PHONE,
    };

    // Store data in LocalStorage
    localStorage.setItem(EMAIL, JSON.stringify(userDetails));

    // Show user details on screen
    showUserOnScreen(userDetails);

    axios.post("https://crudcrud.com/api/041ec69436164f0497092ee0b570bc3a/booking-App", userDetails)
        .then((res) => {
            console.log(res);
            // showUserOnScreen(userDetails);
        }).catch((err) => {
            console.log(err);
        });
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/041ec69436164f0497092ee0b570bc3a/booking-App")
        .then((response) => {
            console.log(response);
            for (let i = 0; i < response.data.length; i++) {
                showUserOnScreen(response.data[i]);
            }
        }).catch((err) => {
            console.log(err);
        });
});

function showUserOnScreen(user) {

    document.getElementById('emailId').value = '';
    document.getElementById('username').value = '';
    document.getElementById('phoneNo').value = '';

    if (localStorage.getItem(user.EMAIL) !== null) {
        removeUserFromScreen(user.EMAIL);
    }

    const parentNode = document.getElementById('listitem');
    const childHTML = `<li id=${user._id}>${user.NAME}-${user.EMAIL}-${user.PHONE} 
    <button onClick="deleteUser('${user._id}')">Delete</button>
    <button onClick="editUserDetails('${user._id}','${user.NAME}', '${user.EMAIL}','${user.PHONE}')">Edit</button></li>`;

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}


function editUserDetails(userId, username, emailId, phoneNo) {
    document.getElementById('username').value = username;
    document.getElementById('emailId').value = emailId;
    document.getElementById('phoneNo').value = phoneNo;

    deleteUser(userId);
}

function deleteUser(userId) {
    axios.delete(`https://crudcrud.com/api/041ec69436164f0497092ee0b570bc3a/booking-App/${userId}`)
        .then((response) => {
            removeUserFromScreen(userId)
        })
        .catch((err) => {
            console.log(err);
        })
}


function removeUserFromScreen(userId) {
    const parentNode = document.getElementById('listitem');
    const childNodeToBeDeleted = document.getElementById(userId);
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}








