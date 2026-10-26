# 3D Mesh

A small browser-based 3D wireframe demo. It parses a Wavefront OBJ mesh in JavaScript and draws its faces on an HTML canvas, rotating the model with a simple perspective projection.

## Run locally

Run either server command from the project root, then open the URL it prints (or `http://localhost:8000`) in a browser. Serve the files over HTTP so the browser can fetch the OBJ model.

### With Node.js

Requires Node.js and npm. `npx` downloads and runs the lightweight static file server if it is not already available:

```sh
npx --yes http-server . --port 8000
```

### With Python

Requires Python 3:

```sh
python3 -m http.server 8000
```

Stop the server with `Ctrl+C`.
