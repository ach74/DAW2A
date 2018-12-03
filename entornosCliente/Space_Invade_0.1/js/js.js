

window.onload = function(){
	//------------------Variables-----------------//
	const canvas = document.createElement("canvas");
	const WIDTH = 500, HEIGHT = 500;
	const ctx = canvas.getContext("2d");

	var fondo;

	var gameScore = 0;
	var nave = {
		width: 25,
		height: 25,
		x:WIDTH/2 -(25/2),
		y:HEIGHT - 60,
		count: 0,
		score: 0,
		nivel: 1
	}

	var enemigos = [];

	var juego = {
		estado: 'iniciado'
	};

	var teclado = {};

	var textoJuego = {
		count: -1,
		titulo: "",
		subtitulo: ""
	}

	var disparos = [];

	var disparosEnemigos = [];
	//--------Inicio funciones ---------//

	function score() {
		var score = document.getElementById('score');
		score.innerHTML=nave.score;
	}


	function main(){
		canvas.width = WIDTH;
		canvas.height = HEIGHT;
		document.body.appendChild(canvas);
		agregarEventoTeclado();
		loadMedia();
	}
	main();
	function loadMedia(){
		fondo = new Image();
		fondo.src = "img/fondo.jpg";
		fondo.onload = function(){
			var intervalo = window.setInterval(actualizarJuego,20);
		}
	}

	function pintarFondo(){
		ctx.drawImage(fondo,0,0);
	}

	function pintarNave(){
		ctx.save();
		const imgNave = new Image();
		imgNave.src="img/nave.png";
		ctx.fillStyle = "white";
		ctx.drawImage(imgNave, nave.x,nave.y,nave.width,nave.height);
		ctx.restore();
	}

	function pintarEnemigos(){
		const imgEnemigo = new Image();
		imgEnemigo.src="img/enemigo.png";
		for(var i in enemigos){
			var enemigo = enemigos[i];
			ctx.save();
			if (enemigo.estado == "vivo") {
				ctx.fillStyle = "red";
			}
			if (enemigo.estado == "muerto") {
				ctx.fillStyle = "black";
			}
			ctx.drawImage(imgEnemigo,enemigo.x,enemigo.y,enemigo.width,enemigo.height);
		}
	}

	function actualizarJuego(){
		moverNave();
		actualizaEnemigos();
		pintarFondo();
		pintarNave();
		pintarDisparos();
		moverDisparos();
		moverDisparosEnemigos();
		pintarEnemigos();
		pintarDisparosEnemigos();
		verificarImpacto();
		actualizarEstadoJuego();
		score();
		pintarTexto();
	}
	function verificarImpacto(){
		for (var i in disparos) {
			var disparo = disparos[i];
			for (j in enemigos) {
				var enemigo = enemigos[j];
				if (impactoEnemigo(disparo,enemigo)) {
					enemigo.estado="golpeado";
					enemigo.contador=0;
				}
			}
		}
		for (var i in disparosEnemigos){
			var disparo = disparosEnemigos[i];
			if (impactoEnemigo(disparo,nave)) {
				nave.estado = "golpeada";
			}
		}
		
	}
	function pintarTexto(){
		if (textoJuego.count == -1) return;
		var apl = textoJuego.count/50.0;
		/*if (apl>1) {

		}*/
		ctx.save();
		ctx.globalAlpha = apl;
		
		if (juego.estado=="perdido") {
			ctx.fillStyle = "white";
			ctx.font = "Bold 40pt Arial";
			ctx.fillText(textoJuego.titulo, 100,200);
			ctx.font = "14pt Arial";
			ctx.fillText(textoJuego.subtitulo,140,250);

			for(var i in enemigos){
				delete enemigos[i];
			}
			for(var j in disparosEnemigos){
				delete disparosEnemigos[j];
			}
		}
		
		if (juego.estado == "victoria") {
			ctx.fillStyle = "white";
			ctx.font = "Bold 40pt Arial";
			ctx.fillText(textoJuego.titulo, 100,200);
			ctx.font = "14pt Arial";
			ctx.fillText(textoJuego.subtitulo,200,250);
		}
		ctx.restore();
	}

	function actualizarEstadoJuego(){
		if (juego.estado == "jugando" && enemigos.length == 0) {
			juego.estado = "victoria";
			textoJuego.titulo = "Has ganado";
			textoJuego.subtitulo = "Pulsa la tecla R para continuar";
			textoJuego.count = 0;
			nave.nivel++;
		}
		if (textoJuego.count >= 0) {
			textoJuego.count++;
		}
		if (juego.estado == "victoria"&& teclado[82]) {
			juego.estado = "iniciado";
			nave.estado = "vivo";
			textoJuego.count = -1;
		}
		if (juego.estado == "perdido" && teclado[82]) {
			juego.estado = "iniciado";
			nave.estado = "vivo";
			nave.score=0;
			textoJuego.count = -1;
			nave.nivel=1;
		}
	}
	function agregarEventoTeclado(){ 
		agregarEvento(document,"keydown",function(e){ 
			//True tecla presionada 
			teclado[e.keyCode] = true; 
		}); 
		agregarEvento(document,"keyup",function(e){ 
			//Falso tecla que no esta presionada 
			teclado[e.keyCode] = false; 
		}); 
		
		function agregarEvento(elemento,nombreEvento,funcion){ 
			if(elemento.addEventListener){ 
				elemento.addEventListener(nombreEvento, funcion, false); 
			} 
		} 	
	}﻿
	function impactoEnemigo(a,b){
		var impactoEnemigo = false;
		//Coliciones
		if (b.x + b.width >= a.x && b.x < a.x + a.width) {
			if (b.y + b.height >= a.y && b.y < a.y + a.height) {
				impactoEnemigo = true;
			}
		}

		if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
			if (b.y <= a.y && b.x + b.height >= a.y + a.height) {
				impactoEnemigo = true;
			}
		}

		if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
			if (a.y <= b.y && a.x + a.height >= b.y + b.height) {
				impactoEnemigo = true;
			}
		}
		return impactoEnemigo;
	}

	function pintarDisparosEnemigos(){
		for(var i in disparosEnemigos){
			var disparo = disparosEnemigos[i];
			ctx.save();
			ctx.fillStyle = "yellow";
			ctx.fillRect(disparo.x+15,disparo.y+20,disparo.width,disparo.height);
			ctx.restore();
		}
	}

	function moverDisparosEnemigos(){
		for(var i in disparosEnemigos){
			var disparo = disparosEnemigos[i];
			disparo.y += nave.nivel;
		}
		disparosEnemigos =disparosEnemigos.filter(function(disparo){
			return disparo.y < canvas.height;
		});
	}

	function actualizaEnemigos(){
		function agregarDisparosEnemigos(enemigo){
			return {
				x: enemigo.x,
				y: enemigo.y,
				width: 2,
				height:1,
				contador:0
			}
		}


		if (juego.estado=="iniciado") {
			for (var i = 0; i < 5; i++) {
				enemigos.push({
					x: 10 + ( i * 50),
					y: 10 + (50),
					height: 30,
					width: 30,
					estado : "vivo",
					contador : 0,
					velocidad : 0.9,
					direccion : true
				});

			}
			juego.estado = "jugando";
		}


		for(var i in enemigos){

			var enemigo = enemigos[i];

			if (enemigo && enemigo.estado == "vivo") {
				enemigo.contador++;
				//enemigo.x += Math.sin(enemigo.contador * Math.E / 90)*3.8;
				
				if (enemigos[enemigos.length-1].x==canvas.width-25) {
					enemigo.direccion=false;
					enemigo.y+=30;
				}else if (enemigos[0].x==0) {
					enemigo.direccion=true;
					enemigo.y+=30;
				}
				if (enemigo.direccion==true){
					enemigo.x++;
				}
				if (enemigo.direccion==false){
					enemigo.x--;
				}

				if (aletorio(0,enemigos.length*10)==4) {
					disparosEnemigos.push(agregarDisparosEnemigos(enemigo));
				}
			}

			if (enemigo && enemigo.estado == "golpeado") {
				enemigo.contador++;
				nave.score++;
				if (enemigo.contador >= 20) {
					enemigo.estado = "muerto";
					enemigo.contador = 0;
				}
			}
		}

		enemigos = enemigos.filter(function(enemigo){
			if (enemigo && enemigo.estado != "muerto") {
				return true;
			}else{
				return false;
			}
		})
	}

	function aletorio(inferior,superior){
		var num = superior -inferior;
		var a = Math.random() * num;
		a = Math.floor(a);
		return parseInt(inferior) + a;
	}

	function moverNave() {
		if (teclado[37]) {
			//Mover a la izquierda
			nave.x-=6;
			if (nave.x < 0) {
				nave.x = 0;
			}
		}
		if (teclado[39]) {
			//Mover a la derecha
			var limite = canvas.width - nave.width;
			nave.x+=6;
			if (nave.x > limite) {
				nave.x = limite;
			}
		}

		if (teclado[32]) {
			//Condicion para que los disparos salgan de uno en uno
			if (!teclado.disparar) {
				disparar();
				teclado.disparar = true;
			}
		}else{
			teclado.disparar = false;
		}

		if (nave.estado=="golpeada") {
			nave.count++;
			if (nave.count>=20) {
				nave.count = 0;
				nave.estado = "muerto";
				juego.estado = "perdido";
				textoJuego.titulo = "Game Over";
				textoJuego.subtitulo = "Pulsa R para volver a jugar";
				textoJuego.count = 0;
			}
		}

	}

	function moverDisparos() {
		for(var i in disparos){
			var disparo = disparos[i];
			disparo.y-=5;
		}
		//Eliminar los disparos que has salido de la pantalla
		disparos = disparos.filter(function(disparo){
			return disparo.y > 0;
		});
	}

	function pintarDisparos(){
		ctx.save();
		ctx.fillStyle = "white";
		for(var i in disparos){
			var disparo = disparos[i];
			ctx.fillRect(disparo.x-9,disparo.y,disparo.width,disparo.height);
		}
		ctx.restore();
	}
	function disparar() {
		disparos.push({
			x:nave.x + 20,
			y:nave.y -10,
			width: 2,
			height:5
		});
	}


}
