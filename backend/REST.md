# WEB SERVICE

is any software system that supports interoperable machine-to-machine interaction over a network

REST est une interface programatique baséé sur HTTP permettant à un client et serverur d'interagir suivant un échange de
requete/réponse

In SOAP web services have a defined interface in a machine processable format (called WSDL).
Other systems interact with the Web service in a manner defined by it's description.and exchange XML serialized.

# HTTP

est un protocole de la couche application.Dans sa versions 1.1 est orienté text.

Http et un protocole définit une format des requete et réponse entre client et serveur
le client emet une requete HTTP qui contient toutes les unformations nécessaires/suffisantes
au serveur de fournir une réponse.

example
requete http get:

```http request
GET /html/rfc7230 HTTP/1.1
Host: tools.ietf.org

```

Réponse serveur:

```HTTP

HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 420

<html>
...
</html>

```

1. Request Line:  une requete HTTP débute par une ligne de requete(request line) terminée par saut de ligne.
   Cette ligne contient la méthode HTTP que le client souhaite éxcuter, le chemin de la resource cible sur laquelle la
   méthode doit s'appliquer et enfin la version HTTP.
2. Liste d'en-tetes: et une ligne vide qui marque la fin des en-tetes.
3. Corp de message

```http request
[méthode] [ressource cible] HTTP/1.1
[Nom de l'en-tête]: [Valeur de l'en-tête]
...
[ligne vide]
[corps de message]
```

Lorsque le serveur recoit la rquete il reconstitue l'URI de la requete déterminée à partir de la ressource cible et de
la valeur de l’en-tête Host. Ainsi pour la requête suivante :

```http request
GET /html/rfc7230 HTTP/1.1
Host: tools.ietf.org
```

Le serveur infère que le client veut exécuter la méthode GET su URI:https://tools.ietf.org/html/rfc7230

Lorsqu’on saisit une URI dans la barre d’adresse du navigateur, ce dernier effectue le traitement inverse d’un serveur.
Il transforme l’URI en une requête HTTP valide en utilisant la méthode GET.

## Structure d'une réponse HTTP

1. Response line: commence par la version HTTP, le code de statut du traitement de la requete en enfin un message
   décrivant le code statut.
2. Liste des en-tete puis ligne vide
3. corps de message

```http request
HTTP/1.1 [code statut] [message]
[Nom de l'en-tête]: [Valeur de l'en-tête]
...
[ligne vide]
[corps de message]
```

### Les méthodes HTTP

Désignenet le type d'opération le client désire réaliser.

#### GET

Demande au serveur une réprésentation de la resources cible.

####  PUT
met à jour l’état d’une ressource identifiée par l’URI

### PATCH
Change partiellement l’état d’une ressource cible. 

### DELETE
Supprimer une resource

### POST
Créer une nouvelle ressource

## Les en-têtes HTTP

Les en-têtes de requête et de réponse permettent d’enrichir le contexte de la requête ou la réponse. 
et fournir des données pour le support des fonctionalité http.
Gestion des stratégies de cache, Compression du corps du message
Gestion de la taille et du contenu des entités de requête et de réponse

### HOST (request)
Contient le nom et le port du serveur.
```http request
GET / HTTP/1.1
Host: www.monserveur.fr:9090
```
### Content-Type (requete et reponse)
indique au destinataire le type de corps de message (contenu).Sous la forme d'un type MIME.
![Screenshot from 2024-01-09 11-53-59.png](..%2F..%2F..%2F..%2FPictures%2FScreenshots%2FScreenshot%20from%202024-01-09%2011-53-59.png)

```http request
POST /utilisateur HTTP/1.1
Host: www.monserveur.fr:9090
Content-Type: application/x-www-form-urlencoded
Content-Length: 36

nom=David&prenom=Gayerie&taille=174
```
reponse
```http request
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Content-Length: 17

Hello the world!
```

## RPC
de permettre d’invoquer une procédure à travers un réseau pour la faire exécuter sur un serveur et récupérer le résultat par le client.