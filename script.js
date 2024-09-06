let data /* array */;

let tenses = ["infinitive", "past", "past_participle"];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate random number
    let j = Math.floor(Math.random() * (i + 1));

    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

async function fetchData() {
  data = shuffleArray(d3.csvParse(await (await fetch("verbs.csv")).text()));
}

async function checkAnswers() {
  tenses.forEach((t) => {
    let ans_field = document.getElementById(t).querySelector("input");
    let div_field = document.getElementById(t).querySelector("div");
    let verb = data[0][t];
    let valid_verbs = verb.split("/").map((x) => x.trim());

    if (valid_verbs.includes(ans_field.value.toLowerCase())) {
      ans_field.classList.add("ok");
    } else {
      ans_field.classList.add("bad");
    }
    ans_field.disabled = true;

    div_field.innerText = verb;
  });
}

async function clearAnswerFields() {
  tenses.forEach((t) => {
    let ans_field = document.getElementById(t).querySelector("input");
    let div_field = document.getElementById(t).querySelector("div");

    ans_field.value = "";
    ans_field.classList.remove("bad", "ok");
    ans_field.disabled = false;

    div_field.innerText = "";
  });
  data.shift();
}

async function getNext() {
  await clearAnswerFields();
  if (data.length <= 0) {
    await fetchData();
  }

  let d = data[0];
  let verb = document.getElementById("verb");

  verb.innerText = d["SLO"];
}

async function registerListeners() {
  document.getElementById("next").addEventListener("click", function () {
    document.getElementById("check").hidden = false;
    document.getElementById("next").hidden = true;
    getNext();
  });
  document.getElementById("check").addEventListener("click", function () {
    document.getElementById("check").hidden = true;
    document.getElementById("next").hidden = false;
    checkAnswers();
  });
  document.getElementById("dark-mode").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    document
      .querySelectorAll("button, input")
      .forEach((x) => x.classList.toggle("dark-mode"));
  });

  for (let i = 0; i < tenses.length; i++) {
    document
      .getElementById(tenses[i])
      .querySelector("input")
      .addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.keyCode === 13) {
          document
            .getElementById(tenses[(i + 1) % tenses.length])
            .querySelector("input")
            .focus();
        }
      });
  }
}

async function init() {
  await registerListeners();
  await fetchData();
  await getNext();
}
