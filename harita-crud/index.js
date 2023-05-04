//LOAD TABLE

function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/User");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var trHTML = "";
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {
                trHTML += "<tr>";
                trHTML += "<td>" + object["id"] + "</td>";
                trHTML += "<td>" + object["UserName"] + "</td>";
                trHTML += "<td>" + object["Age"] + "</td>";
                trHTML += "<td>" + object["Sex"] + "</td>";
                trHTML += "<td>" + object["ContactNo"] + "</td>";
                trHTML += "<td>" + object["EmailID"] + "</td>";
                trHTML +=
                    '<td><img width="50px" src="' +
                    object["UserImage"] +
                    '" class="avatar"></td>';
                trHTML +=
                    '<td><button type="button" id="edit" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
                    object["id"] +
                    ')">Edit</button>';
                trHTML +=
                    '<button type="button" id="del" class="btn btn-outline-danger" onclick="userDelete(' +
                    object["id"] +
                    ')">Del</button></td>';
                trHTML += "</tr>";
            }
            document.getElementById("mytable").innerHTML = trHTML;
        }
    };
}

loadTable();

//create form modal

function showUserCreateBox() {

    Swal.fire({
        title: "Create user",
        customClass: {
            popup: 'red-popup',
        },
        html:
            '<form id="myform"  class="was-validated">' +
            '<div class="swal2-row">' +
            '<input id="id" type="hidden" class="swal2-input">' +
            "</div>" +


            '<div class="swal2-row">' +
            '<label for="UserName">UserName</label>' +
            '<input id="UserName" name="UserName" class="swal2-input" placeholder="UserName" pattern="[a-zA-Z]+" required>' +
            '</div>' +

            '<div class="swal2-row">' +
            '<label for="Age">Age</label>' +
            '<input id="Age" class="swal2-input" placeholder="Age" required>' +
            "</div>" +

            '<div class="swal2-row">' +
            '<label for="Sex">Sex</label>' +
            '<input id="Sex" name="Sex" class="swal2-input" type="radio" placeholder="Sex" value="Male" required>Male' +
            '<input id="Sex" name="Sex" class="swal2-input" type="radio" placeholder="Sex" value="Female" required>Female' +
            "</div>" +

            '<div class="swal2-row">' +
            '<label for="ContactNo">ContactNo</label>' +
            '<input id="ContactNo" class="swal2-input" placeholder="ContactNo" pattern="[0-9]{10}+" required>' +
            "</div>" +

            '<div class="swal2-row">' +
            '<label for="EmailID">EmailID</label>' +
            '<input id="EmailID" class="swal2-input" placeholder="EmailID" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$" required>' +
            "</div>",


        preConfirm: async () => {
            const form = document.getElementById('myform');
            const UserName = document.getElementById("UserName").value;
            const ContactNo = document.getElementById("ContactNo").value;
            const EmailID = document.getElementById("EmailID").value;
            const EmailIDRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            const UserNameRegex = /^[a-zA-Z\- ]{3,50}$/;
            const ContactNoregex = /^[0-9]{10}$/;
            if (!form.checkValidity()) {
                Swal.showValidationMessage('Please fill out all required fields.');
                return;
            }
            else if (!UserNameRegex.test(UserName)) {
                Swal.showValidationMessage("UserName should contain atleast 3 characters");
            }
            else if (!ContactNoregex.test(ContactNo)) {
                Swal.showValidationMessage("Contact NUmber should contain 10 numbers");
            }
            else if (!EmailIDRegex.test(EmailID)) {
                Swal.showValidationMessage("Please enter the correct email format");
            }
            try {
                userCreate();
                Swal.fire({
                    icon: "success",
                    title: "project added successfully",//for success message

                });
                loadTable();
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.message,
                });
            }

        },
    });
}




//usercreate function

function userCreate() {
    const UserName = document.getElementById("UserName").value;
    const Age = document.getElementById("Age").value;
    const Sex = document.getElementById("Sex").value;
    const ContactNo = document.getElementById("ContactNo").value;
    const EmailID = document.getElementById("EmailID").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/User/");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({

            UserName: UserName,
            Age: Age,
            Sex: Sex,
            ContactNo: ContactNo,
            EmailID: EmailID,
            UserImage: "https://www.melivecode.com/users/8.png",
        })
    );
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects["message"]);
            loadTable();
        }
    };
}

//post method for editing

function showUserEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/User/${id}`);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);

            console.log(objects);
            Swal.fire({
                title: "Edit User",
                customClass: {
                    popup: 'red-popup',
                },
                html:

                    '<div class="swal2-row">' +
                    '<input id="id" type="hidden" class="swal2-input" objects[`${id}`]>' +
                    "</div>" +

                    '<div class="swal2-row">' +
                    '<label for="UserName">UserName</label>' +
                    '<input id="UserName" class="swal2-input" placeholder="UserName" objects["UserName"] >' +
                    "</div>" +

                    '<div class="swal2-row">' +
                    '<label for="Age">Age</label>' +
                    '<input id="Age" class="swal2-input" placeholder="Age">' +
                    "</div>" +

                    '<div class="swal2-row">' +
                    '<label for="Sex">Sex</label>' +
                    '<input id="Sex"  class="swal2-input" type="radio" placeholder="Sex" value="Male" objects["Sex"] >Male' +
                    '<input id="Sex" class="swal2-input" type="radio" placeholder="Sex" value="Female" objects["Sex"] >Female' +
                    "</div>" +

                    '<div class="swal2-row">' +
                    '<label for="ContactNo">ContactNo</label>' +
                    '<input id="ContactNo" class="swal2-input" placeholder="ContactNo" objects["ContactNo"]>' +
                    "</div>" +

                    '<div class="swal2-row">' +
                    '<label for="EmailID">EmailID</label>' +
                    '<input id="EmailID" class="swal2-input" placeholder="EmailID" objects["EmailID"] >' +
                    "</div>",

                preConfirm: () => {
                    userEdit(id);
                },
            });
        }
    };
}

function userEdit(id) {

    const UserName = document.getElementById("UserName").value;
    const Age = document.getElementById("Age").value;
    const Sex = document.getElementById("Sex").value;
    const ContactNo = document.getElementById("ContactNo").value;
    const EmailID = document.getElementById("EmailID").value;
    console.log(id);
    console.log(UserName);
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", `http://localhost:3000/User/${id}`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({

            UserName: UserName,
            Age: Age,
            Sex: Sex,
            ContactNo: ContactNo,
            EmailID: EmailID,
            UserImage: "https://www.melivecode.com/users/1.png",
        })
    );
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects["message"]);
            loadTable();
        }
    };
}

//delete method for deleteing the fields

function userDelete(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open(`DELETE`, `http://localhost:3000/User/${id}`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    Swal.fire({
        title: "Are you sure?",
        customClass: {
            popup: 'red-popup',
        },
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.value) {
            xhttp.send(JSON.stringify({ id: id }));
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    const objects = JSON.parse(this.responseText);
                    Swal.fire(objects["message"]);
                    loadTable();
                }
            };
        }
    });
}