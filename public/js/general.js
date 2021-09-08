function sendFormBehavior(){
    const frmEl = document.getElementById('frmBehavior');
    frmEl.behavior_date.disabled = false;

    setTimeout(function () {
        window.location.reload(); }, 1000)
}

function sendFormAction(){
    const frmEl = document.getElementById('frmAction');
    frmEl.action_date.disabled = false;

    setTimeout(function () {
        window.location.reload(); }, 1000)
}