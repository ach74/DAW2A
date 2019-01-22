x=0;

function myFunction() {
    if (0==x) {
        document.getElementById('menu-icon').style.display = "none"; 
        document.getElementById('menu-icon-cerrar').style.display = "block"; 
        x=1;
    }else{
        document.getElementById('menu-icon').style.display = "block"; 
        document.getElementById('menu-icon-cerrar').style.display = "none"; 
        x=0;
    }
    
}