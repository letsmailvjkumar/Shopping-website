const btn = document.getElementById("login");

btn.addEventListener('click', ()=>{
    window.open("./login.html");
})

const btn1 = document.getElementById("signup");

btn1.addEventListener('click', ()=>{
    window.open("./signup.html");
})
window.addEventListener('load', function() {
    var navbar = document.querySelector('#navbarNavAltMarkup');
    var bsCollapse = new bootstrap.Collapse(navbar, {toggle: false});
    bsCollapse.hide();
});