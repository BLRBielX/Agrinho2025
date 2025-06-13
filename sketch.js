let player;
let items = [];
let score = 0;
let fieldItems = ["🌾", "🐄", "🌻"];
let cityItems = ["💡", "📱", "🚗"];
let bridge = [];

function setup() {
  createCanvas(800, 400);
  player = createVector(width / 2, height / 2);
  for (let i = 0; i < 6; i++) {
    spawnItem();
  }
  textAlign(CENTER, CENTER);
  textSize(32);
}

function draw() {
  background(200, 255, 200); // campo
  fill(150);
  rect(width / 2 - 5, 0, 10, height); // divisória cidade-campo
  fill(180, 220, 255); // cidade
  rect(width / 2, 0, width / 2, height);

  fill(0);
  text("🌿 Campo", width / 4, 30);
  text("🏙️ Cidade", 3 * width / 4, 30);

  // Desenhar jogador
  fill(255, 100, 100);
  ellipse(player.x, player.y, 30, 30);

  // Mostrar itens
  for (let i = items.length - 1; i >= 0; i--) {
    let item = items[i];
    text(item.symbol, item.pos.x, item.pos.y);
    if (dist(player.x, player.y, item.pos.x, item.pos.y) < 20) {
      bridge.push(item.symbol);
      items.splice(i, 1);
      spawnItem();
      score++;
    }
  }

  // Mostrar ponte
  fill(0);
  textSize(24);
  text("🌉 Ponte: " + bridge.join(" "), width / 2, height - 30);
  textSize(32);
}

function spawnItem() {
  let side = random(["left", "right"]);
  let symbol = side === "left" 
    ? random(fieldItems) 
    : random(cityItems);
  let x = side === "left" 
    ? random(30, width / 2 - 30) 
    : random(width / 2 + 30, width - 30);
  let y = random(60, height - 60);
  items.push({ symbol, pos: createVector(x, y) });
}

function keyPressed() {
  let step = 10;
  if (keyCode === LEFT_ARROW) player.x -= step;
  if (keyCode === RIGHT_ARROW) player.x += step;
  if (keyCode === UP_ARROW) player.y -= step;
  if (keyCode === DOWN_ARROW) player.y += step;

  // Limites
  player.x = constrain(player.x, 15, width - 15);
  player.y = constrain(player.y, 15, height - 15);
}
