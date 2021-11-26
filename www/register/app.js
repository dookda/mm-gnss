
function initializeLiff() {
    liff.init({
        liffId: "1656465294-ynkLQ1kB"
    }).then((e) => {
        if (!liff.isLoggedIn()) {
            liff.login();
        } else {
            getUserid();
        }
    }).catch((err) => {
        console.log(err);
    });
}

let getData = (userid) => {
    axios.post("/api/getuser", { userid }).then((r) => {
        // console.log(r);
        if (r.data.data.length > 0) {
            document.getElementById("username").value = r.data.data[0].username;
            document.getElementById("email").value = r.data.data[0].email;
        }
    })
}

let updateUser = () => {
    let obj = {
        userid: document.getElementById("userid").value,
        data: {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
        }
    }
    console.log(obj);
    axios.post("/api/updateuser", obj).then((r) => {
        console.log(r);
        $("#modal").modal('show')
        getData(userid)
    })
}

async function getUserid() {
    const profile = await liff.getProfile();
    document.getElementById("userid").value = await profile.userId;
    document.getElementById("profile").src = await profile.pictureUrl;
    document.getElementById("displayName").value = await profile.displayName;
    document.getElementById("statusMessage").innerHTML = await profile.statusMessage;
    getData(await profile.userId)
}

initializeLiff()