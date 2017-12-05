var url = require('url');
var nodemailer = require('nodemailer');			//module pour l'envoi de mail automatique
var querystring = require("querystring");
var fs = require('fs');							//module qui permet la gestion de fichiers (écriture, lecture...)
var http = require('http');
var express = require ('express');
var app = express();
var bodyParser = require('body-parser');		//module qui permet la récupération de POST
var mysql = require('mysql');					//module de connection a un serveur mysql
var CronJob = require('cron').CronJob;			//module de planification de tâches
var path = require('path')
var ejs = require('ejs');
var server = require('http').Server(app);

server.listen(8080);

app.use(express.static(__dirname + '/public'));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

console.log('Application running...');

var index = fs.readFileSync('./Vue/index.html', 'utf8');

app.get("/", function(request, response){
  var html = ejs.render(index, {variableServeur: "toto"});
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(html);
  response.write("<br/><h4>hTEST BASE DE DONNEES</h4>");
  var mysqlClient = mysql.createConnection({
				host:"vclons.fr",
				user:"admin_madera",
				password:"UlVnzxb8ut",
				database:"admin_bdd-madera"
			});

			var requete = "SELECT * FROM test";

			mysqlClient.query(requete, function(error, results, fields){
				if(error){
					console.log(error);
					mysqlClient.end();
				}
        response.write('<table><tr><th>id</th><th>Nom</th><th>Age</th></tr>');
				for(var i = 0; i<results.length; i++){
						var result = results[i];
						response.write(
							"<tr><td>num. " + result['id'] + "</td>"+
							"<td>" + result['nom'] + "</td>"+
							"<td>" + result['age'] + "</td></tr>"
						);
				}
			  response.write('</table>');
        response.end();
			});

});
