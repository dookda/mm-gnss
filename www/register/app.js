
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

async function getUserid() {
    const profile = await liff.getProfile();
    document.getElementById("userid").value = await profile.userId;
    document.getElementById("profile").src = await profile.pictureUrl;
    document.getElementById("statusMessage").innerHTML = await profile.statusMessage;
    document.getElementById("displayName").innerHTML = await profile.displayName;
    console.log(profile);
}

document.getElementById('validate').style.visibility = 'hidden';

function register() {
    if (document.getElementById("username").value) {
        let obj = {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            userid: document.getElementById("userid").value
        }
        document.getElementById('validate').style.visibility = 'hidden';
        axios.post("/api/register", obj).then(r => {
            console.log(r.data);
            document.getElementById("success").innerHTML = r.data;
            liff.closeWindow();
        })
    } else {
        document.getElementById('validate').style.visibility = 'visible';
    }
}

initializeLiff()