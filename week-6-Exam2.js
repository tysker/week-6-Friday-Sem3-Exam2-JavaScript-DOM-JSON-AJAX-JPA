let mapPerson = [];
let mapSql = [];
const sqlTextField = document.getElementById("sql");

function getGender() {
    return document.getElementById('gender').value;
}

function getRegion() {
    return document.getElementById('region').value;
}

function getAmount() {
    return document.getElementById('amount').value;
}

document.getElementById("btnsend").onclick = toggleList;
document.getElementById("btnsql").onclick = createSQL;

function clearSqlTextField() {
    sqlTextField.value = '';
}

function createSQL() {
    mapSql = mapPerson.map(person =>
        `INSERT INTO person (gender,lastname,name,region) VALUES  ('${person.gender}', '${person.surname}', '${person.name}', '${person.region}');`
    );
    mapSql = mapSql.join('\n');
    sqlTextField.value = mapSql;

}

function toggleList() {
    // if the amount is under 2, we have to use the singleFetch methode
    if (getAmount() < 2) {
        fetchSingleData();
    } else {
        fetchMultiData();
    }
    mapPerson = [];
}


var Person = function (name, surname, region, gender) {
    this.name = name;
    this.surname = surname;
    this.region = region;
    this.gender = gender;
}


function getUrl() {
    var amount = getAmount();
    var region = getRegion();
    var gender = getGender();
    const url = `https://uinames.com/api/?amount=${amount}&gender=${gender}&region=${region}`;
    return url;
}

function fetchMultiData() {
    let url = getUrl();
    fetch(url)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => {
            var users = "";
            if (data.error) {
                users += "<tr>";
                users += "<td>" + data.error + "</td>";
                users += "</tr>";
                document.getElementById("tblbody").innerHTML = users;
                clearSqlTextField();
            } else {

                for (let info of data) {
                    mapPerson.push(new Person(info.name, info.surname, info.region, info.gender));
                    users += "<tr>";
                    users += "<td>" + info.name + "</td>";
                    users += "<td>" + info.surname + "</td>";
                    users += "<td>" + info.region + "</td>";
                    users += "<td>" + info.gender + "</td>";
                    users += "</tr>";
                };
                clearSqlTextField();
                document.getElementById("tblbody").innerHTML = users;
            }
        });
}


function fetchSingleData() {
    let url = getUrl();
    fetch(url)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => {
            var users = "";
            if (data.error) {
                users += "<tr>";
                users += "<td>" + data.error + "</td>";
                users += "</tr>";
                document.getElementById("tblbody").innerHTML = users;
                clearSqlTextField();
            } else {
                mapPerson.push(new Person(data.name, data.surname, data.region, data.gender));
                users += "<tr>";
                users += "<td>" + data.name + "</td>";
                users += "<td>" + data.surname + "</td>";
                users += "<td>" + data.region + "</td>";
                users += "<td>" + data.gender + "</td>";
                users += "</tr>";
                document.getElementById("tblbody").innerHTML = users;
                clearSqlTextField();
            }
        })
}