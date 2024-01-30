let inputText = document.getElementById("count");
let inputRes = document.getElementById("result");
const button = document.getElementById("copy");
const allowedKeys = [
  "(",
  ")",
  "/",
  "*",
  "-",
  "+",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
  ".",
  "%",
  " ",
];

inputText.focus();

//Trocar Tema
document.getElementById("switchTheme").addEventListener("click", () => {
  let main = document.getElementById("main");

  main.dataset.theme = main.dataset.theme == "dark" ? "light" : "dark";

  const root = document.querySelector(":root");

  if (main.dataset.theme == "dark") {
    root.style.setProperty("--color-01", "#212529");
    root.style.setProperty("--color-02", "rgba(255, 255, 255, 0.788)");
  } else {
    root.style.setProperty("--color-01", "rgba(255, 255, 255, 0.788)");
    root.style.setProperty("--color-02", "#212529");
  }
});

//Escrever na calculadora por botões
document.querySelectorAll(".calcButton").forEach((button) => {
  button.addEventListener("click", () => {
    inputText.value += button.dataset.value;
  });
});

//Calcular
document.getElementById("resButton").addEventListener("click", calcular);

function calcular() {
  if (!inputText.value) {
    return;
  }
  let conta = inputText.value;
  inputRes.value = "ERROR";
  inputRes.classList.add("error");
  let res = eval(conta);
  inputRes.value = res;
  inputRes.classList.remove("error");
  button.innerText = "Copy";
  button.classList.remove("copied");
}

//Limpar calculadora
document.getElementById("cleanButton").addEventListener("click", () => {
  inputText.value = "";
  inputRes.value = "";
  inputText.focus();
  document.getElementById("copy").innerText = "Copy";
  document.getElementById("copy").classList.remove("copied");
  inputRes.classList.remove("error");
});

//Digitar a conta
inputText.addEventListener("keydown", (ev) => {
  ev.preventDefault();
  if (allowedKeys.includes(ev.key)) {
    inputText.value += ev.key;
    return;
  }
  if (ev.key == "Enter") {
    calcular();
  }
  if (ev.key == "Backspace") {
    inputText.value = inputText.value.slice(0, -1);
  }
});

//função copiar
button.addEventListener("click", () => {
  if (button.innerText == "Copy") {
    button.disabled = false;
    navigator.clipboard.writeText(inputRes.value);
    button.innerText = "Copied";
    button.classList.add("copied");
  }
});
