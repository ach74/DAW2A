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

function reg(){
	document.getElementById('register').style.display="none";
	document.getElementById('login').style.display="block";
}

function log(){
	document.getElementById('register').style.display="block";
	document.getElementById('login').style.display="none";
}

function carrito(){
	location.href ="carrito.html";
}