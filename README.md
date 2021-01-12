# sky-region-editor
JS widget for editing polygons. Based on AladinLite.

The packed JS is available as an [asset](https://github.com/lmichel/sky-region-editor/releases)

# Testing the Widget

- You need to run a HTTP server to make the JS code working
- Lite servers can be run on your working directory

### With Python
```
% cd sky-region-editor
% python3 -m http.server
```

### With Node

```
% install node
% ls
index.html
% npx http-server
npx: installed 23 in 4.28s
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://192.168.0.17:8080
  http://192.168.0.10:8080
Hit CTRL-C to stop the server
```
### License Watchout
This project contains imported resources (`cssimports` and `jsimports`) that are not covered by the licenses.
- This allows users to run the demo just with repository resources
- This porvides working spare resources in case of broken compatibility between the current JS code and imported `css` or `JS`
