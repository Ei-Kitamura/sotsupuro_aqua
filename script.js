const quiz = [
  {
    word: "benefit",
    choices: ["目的", "お金", "共通の", "利益"],
    answer: 3
  },
  {
    word: "countryside",
    choices: ["農園", "田舎", "発展途上国", "国境"],
    answer: 1
  },
  {
    word: "law",
    choices: ["列", "法律", "生乳", "低い"],
    answer: 1
  },
  {
    word: "effort",
    choices: ["事実", "飛行機", "努力", "勝利"],
    answer: 2
  },
  {
    word: "nowadays",
    choices: ["近ごろは", "未来の", "今後は", "数日以内に"],
    answer: 0
  },
  {
    word: "attend",
    choices: ["出席する", "成功する", "立つ", "当てる"],
    answer: 0
  },
  {
    word: "garbage",
    choices: ["キャベツ", "大将", "栄養素", "ゴミ"],
    answer: 3
  },
  {
    word: "suggest",
    choices: ["議論する", "を提案する", "を合わせる", "を捉える"],
    answer: 1
  },
  {
    word: "frequently",
    choices: ["頻繁に", "自由に", "格好よく", "滑らかに"],
    answer: 0
  },
  {
    word: "ordinary",
    choices: ["普通の", "オルゴール", "並外れた", "車"],
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
