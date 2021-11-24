function sendMessage() {
    axios.post("/pushmsg").then(r => {
        console.log(r);
    })
}

function sendMulticast() {
    axios.post("/multicast").then(r => {
        console.log(r);
    })
}