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
      ans_field.classList = ["ok"];
    } else {
      ans_field.classList = ["bad"];
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
    ans_field.classList = [];
    ans_field.disabled = false;

    div_field.innerText = "";
  });
  data.shift();
}

async function getNext() {
  await clearAnswerFields();

  let d = data[0];
  let verb = document.getElementById("verb");

  verb.innerText = d["SLO"];

  if (data.length <= 1) {
    await fetchData();
  }
}

async function init() {
  await fetchData();
  await getNext();
}
