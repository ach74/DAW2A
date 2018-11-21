window.onload = function() {
	carregar();
};



function guardar() {

	var nombre = document.getElementById("nom").value;
	var color = document.getElementById("sel").value;

	var eC1 = document.getElementById("c1").style.display;
	var eC2 = document.getElementById("c2").style.display;
	var eC3 = document.getElementById("c3").style.display;
	var eC4 = document.getElementById("c4").style.display;

	document.cookie= "nombre ="+nombre;
	document.cookie= "color ="+color;
	document.cookie= "eC1 ="+eC1;
	document.cookie= "eC2 ="+eC2;
	document.cookie= "eC3 ="+eC3;
	document.cookie= "eC4 ="+eC4;


	console.log(document.cookie);

};  

function carregar(){
	var valor_cookie, color_cookie,c1_cookie,c2_cookie,c3_cookie,c4_cookie;
	var temp;
	var array_cookies = document.cookie.split(";");

	for(var i = 0; i < array_cookies.length; i++) {
		console.log (array_cookies[i]);
		temp = array_cookies[i].split("=");
		if (i==0) {
			valor_cookie = temp[1];
		}if (i==1) {
			color_cookie = temp[1];
		}if (i==2) {
			c1_cookie = temp[1];
		}if (i==3) {
			c2_cookie = temp[1];
		}if (i==4) {
			c3_cookie = temp[1];
		}if (i==5) {
			c4_cookie = temp[1];
		}
	}
	document.getElementById("nom").value = valor_cookie;
	document.getElementById("sel").value = color_cookie;
	cambiarFondo();
	document.getElementById("c1").style.display = c1_cookie;
	document.getElementById("c2").style.display = c2_cookie;
	document.getElementById("c3").style.display = c3_cookie;
	document.getElementById("c4").style.display = c4_cookie;
	
}

function borrar(){
	document.cookie= "nombre =; expires=01 Jan 2000 00:00:00 UTC";
	document.cookie= "color =; expires=01 Jan 2000 00:00:00 UTC";
	document.cookie= "eC1 =; expires=01 Jan 2000 00:00:00 UTC";
	document.cookie= "eC2 =; expires=01 Jan 2000 00:00:00 UTC";
	document.cookie= "eC3 =; expires=01 Jan 2000 00:00:00 UTC";
	document.cookie= "eC4 =; expires=01 Jan 2000 00:00:00 UTC";
	location.href="html.html";
	console.log(document.cookie);
}


function cambiarFondo() {
	var sel = document.getElementById("sel").value;
	if (sel==1) {
		document.body.style.backgroundColor = "red";
	}else if (sel == 2) {
		document.body.style.backgroundColor = "blue";
	}else if (sel== 3) {
		document.body.style.backgroundColor = "green";
	}
}


function borrar1(){
	document.getElementById("c1").style.display = "none"; 
}
function borrar2(){
	document.getElementById("c2").style.display = "none"; 
}
function borrar3(){
	document.getElementById("c3").style.display = "none"; 
}
function borrar4(){
	document.getElementById("c4").style.display = "none"; 
}













