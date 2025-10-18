let cnv;

function setup() {
  cnv = createCanvas(600, 800);
  cnv.parent(document.querySelector(".canvas-container"));
  noLoop();
  document.querySelectorAll("input, select").forEach(el => el.addEventListener("input", drawPattern));
  drawPattern();
}

function drawPattern() {
  background(255);
  stroke(0);
  noFill();
  strokeWeight(2);

  const tipo = document.getElementById("tipo").value;
  const pecho = +document.getElementById("pecho").value;
  const cintura = +document.getElementById("cintura").value;
  const espalda = +document.getElementById("espalda").value;
  const hombros = +document.getElementById("hombros").value;
  const largo = +document.getElementById("largo").value;
  const busto = +document.getElementById("busto").value;

  const escala = 3; // cm -> px
  const baseX = 150, baseY = 100;

  if (tipo === "hombre") drawChalecoHombre(baseX, baseY, pecho, cintura, espalda, hombros, largo, escala);
  else drawChalecoMujer(baseX, baseY, pecho, cintura, espalda, hombros, largo, busto, escala);
}

function drawChalecoHombre(x, y, pecho, cintura, espalda, hombros, largo, e) {
  beginShape();
  vertex(x, y); // cuello
  vertex(x + hombros/2 * e, y);
  vertex(x + hombros/2 * e, y + 25 * e);
  vertex(x + pecho/4 * e, y + largo * e);
  vertex(x, y + largo * e);
  vertex(x, y);
  endShape();

  text("Chaleco hombre", x, y - 10);
}

function drawChalecoMujer(x, y, pecho, cintura, espalda, hombros, largo, busto, e) {
  beginShape();
  vertex(x, y); // cuello
  bezierVertex(x + 10*e, y + 5*e, x + 15*e, y + 10*e, x + hombros/2 * e, y + 5*e);
  vertex(x + hombros/2 * e, y + 25*e);
  bezierVertex(x + pecho/5 * e, y + busto*e, x + pecho/4 * e, y + (largo*0.5)*e, x + cintura/4 * e, y + largo*e);
  vertex(x, y + largo*e);
  bezierVertex(x - 5*e, y + largo*0.6*e, x - 5*e, y + largo*0.3*e, x, y);
  endShape();

  // Pinza busto
  const px = x + espalda/4 * e;
  const py = y + busto * e;
  line(px, py, px + 15, py + 40);

  text("Chaleco mujer (entallado)", x, y - 10);
}

document.getElementById("exportSvg").addEventListener("click", () => saveCanvas("patron_chaleco", "svg"));
document.getElementById("exportPng").addEventListener("click", () => saveCanvas("patron_chaleco", "png"));
