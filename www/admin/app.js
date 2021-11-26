
function initializeLiff() {
    liff.init({
        liffId: "1656465294-MPkE85kd"
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

document.getElementById("container").style.visibility = "hidden";

let deleteUser = (userid) => {
    axios.post('/api/deleteuser', { userid }).then(r => {
        document.getElementById("user").innerHTML = "";
        loadData()
    })
}

let setAdmin = (userid) => {
    axios.post('/api/updateauth', { userid, user_type: "admin" }).then(r => {
        document.getElementById("user").innerHTML = "";
        loadData()
    })
}

let chkAdmin = (userid) => {
    var modal = new bootstrap.Modal(document.getElementById('modal'))

    axios.post('/api/chkadmin', { userid, user_type: "admin" }).then((r) => {
        r.data.data[0].user_type == 'admin' ? loadData() : modal.show();
    })
}

let gotoDashboard = () => {
    location.href = "./../index.html"
}

let gotoReportAdmin = () => {
    let userid = document.getElementById('userid').value
    sessionStorage.setItem("admin", userid);
    location.href = "./../dashboard_admin/index.html"
}

let loadData = () => {
    document.getElementById("container").style.visibility = "visible";
    axios.post('/api/getalluser', { userid: 'usrid' }).then((r) => {
        r.data.data.map(x => {
            // console.log(x);
            document.getElementById("user").innerHTML += `<div class="p-3 my-3 bg-gray rounded shadow-sm">
            <div class="d-flex justify-content-between">
                <strong class="text-gray-dark">${x.username}</strong>
                <div>
                    <button class="btn btn-success" onclick="setAdmin('${x.userid}')">กำหนดเป็นแอดมิน</button>
                    <button class="btn btn-danger" onclick="deleteUser('${x.userid}')">ลบผู้ใช้</button>
                </div>
            </div>
            id:&nbsp;<span id="userid">${x.userid}</span><br>
            สิทธิ์การใช้งาน:&nbsp;<span id="auth">${x.user_type}</span>
        </div>`
        })
    })
}

async function getUserid() {
    const profile = await liff.getProfile();
    document.getElementById("profile").src = await profile.pictureUrl;
    document.getElementById("displayName").innerHTML = await profile.displayName;
    document.getElementById("statusMessage").innerHTML = await profile.statusMessage;
    document.getElementById("userid").value = await profile.userId;
    chkAdmin(await profile.userId)
}

initializeLiff()