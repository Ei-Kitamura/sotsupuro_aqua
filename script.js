const quiz = [
  {
    word: "apple",
    choices: ["りんご", "みかん", "ぶどう", "ばなな"],
    answer: 0
  },
  {
    word: "book",
    choices: ["えんぴつ", "本", "ドア", "机"],
    answer: 1
  },
  {
    word: "dog",
    choices: ["ねこ", "とり", "いぬ", "さかな"],
    answer: 2
  },
  {
    word: "chair",
    choices: ["いす", "つくえ", "まど", "べッド"],
    answer: 0
  },
  {
    word: "water",
    choices: ["火", "土", "水", "風"],
    answer: 2
  },
  {
    word: "sun",
    choices: ["月", "星", "空", "太陽"],
    answer: 3
  },
  {
    word: "cat",
    choices: ["うし", "いぬ", "ねこ", "さる"],
    answer: 2
  },
  {
    word: "school",
    choices: ["びょういん", "えき", "学校", "公園"],
    answer: 2
  },
  {
    word: "car",
    choices: ["自転車", "電車", "車", "船"],
    answer: 2
  },
  {
    word: "music",
    choices: ["音楽", "絵", "数学", "歴史"],
    answer: 0
  }
];

let current = 0;
let score = 0;
let answered = false;

// ★ 追加：開始時間と終了時間
let startTime;
let endTime;

const question = document.getElementById("question");
const buttons = document.querySelectorAll(".choice");
const result = document.getElementById("result");
const questionNumber = document.getElementById("questionNumber");

function loadQuiz() {
  // 最初の問題が読み込まれたときに時間計測開始
  if (current === 0) {
    startTime = new Date();
  }

  result.innerText = "";
  answered = false;

  question.innerText = quiz[current].word;
  questionNumber.innerText = `第 ${current + 1} 問 / ${quiz.length} 問`;

  buttons.forEach((btn, index) => {
    btn.innerText = quiz[current].choices[index];
    btn.disabled = false;
  });
}

function checkAnswer(index) {
  answered = true;
  buttons.forEach(btn => btn.disabled = true);

  if (index === quiz[current].answer) {
    result.innerText = "⭕ 正解！";
    score++;
  } else {
    result.innerText = "✖️ 不正解！";
  }
}

function nextQuestion() {

  // ★ 未回答のとき確認する
  if (!answered) {
    const goNext = confirm("まだ回答していません。本当に次の問題に進みますか？");

    if (!goNext) {
      return;
    }

    result.innerText = "✖️ 未回答";
  }

  current++;

  if (current >= quiz.length) {
    endTime = new Date();
    showResult();
    return;
  }

  loadQuiz();
}

function showResult() {
  const timeDiff = Math.floor((endTime - startTime) / 1000); // 秒
  const minutes = Math.floor(timeDiff / 60);
  const seconds = timeDiff % 60;

  question.innerText = "クイズ終了！";
  questionNumber.innerText = "";
  document.getElementById("choices").style.display = "none";

  result.innerText =
    `あなたの結果：${quiz.length} 問中 ${score} 問正解 🎉\n` +
    `所要時間：${minutes} 分 ${seconds} 秒`;

  document.getElementById("nextBtn").style.display = "none";
}

loadQuiz();
