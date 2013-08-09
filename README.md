Drop In Music Server
=====

This is a server/client combo written using Python/Tornado for the server and jQuery as the client.
Basically, the client/server passes JSON back and forth to retrieve filesystem info. 

The only things you need to set are in the server.py file and they are:

1) rootPath: this is the root of your music library (Ex: C:\Users\username\Music)
2) htmlPath: this is the path to the html folder which contains the Javascript, CSS, and HTML to make the client work
3) patterns: this is the array of search patterns for files to be delivered by the server (NOTE: they must be in format "*.ext")

