const FOREGROUND = "#FF0000"
const BACKGROUND = "#000000"
const FPS = 60

const ctx = game.getContext("2d")

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function clear() {
    ctx.fillStyle = BACKGROUND
    ctx.fillRect(0, 0, game.width, game.height)
}

function drawLine(p1, p2) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = FOREGROUND
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

function drawPoint(p) {
    const s = 4
    ctx.fillStyle = FOREGROUND
    ctx.fillRect(p.x, p.y, s/2, s/2)
}

function screen(p) {
    return {
        x: (p.x + 1)/2 * game.width,
        y: (1 - (p.y + 1)/2) * game.height,
    }
}

function project(p) {
    return {
        x: p.x/p.z,
        y: p.y/p.z,
    }
}

function paintVertex(p) {
    drawPoint(screen(project(p)))
}

function paintFace(f, vertices) {
    for (let i = 0; i < f.length - 1; i++) {
        const p1 = vertices[f[i]]
        const p2 = vertices[f[i + 1]]
        drawLine(screen(project(p1)), screen(project(p2)))
    }
    if (f.length > 2) {
        const p1 = vertices[f[0]]
        const p2 = vertices[f[f.length - 1]]
        drawLine(screen(project(p1)), screen(project(p2)))
    }
}

function translate(p, dz) {
    return {
        x: p.x,
        y: p.y,
        z: p.z + dz
    }
}

function rotate_xz(p, angle) {
    return {
        x: p.x * Math.cos(angle) - p.z * Math.sin(angle),
        y: p.y,
        z: p.x * Math.sin(angle) + p.z * Math.cos(angle),
    };
}

async function render(vertices, faces) {
    const dt = 1/FPS
    let dz = 4
    let angle = 0

    while (true) {
        // Rotate around the cube's own center (origin), then push it away from the camera.
        // Always start from the original vertices so transforms don't accumulate.
        const transformed = vertices.map((v) => translate(rotate_xz(v, angle), dz))

        // for (let v of transformed) {
        //     paintVertex(v)
        // }

        for (let f of faces) {
            paintFace(f, transformed)
        }

        if (dz < 4) {
            dz += dt
        }

        angle += Math.PI * dt
        await delay(1000/FPS)
        clear()
    }
}

