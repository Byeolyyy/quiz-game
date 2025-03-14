const questions = [
    { text: "结合分析，小美是Bigbang中谁的粉丝? 小美：今年是喜欢bigbang的第5年，我是他的梦女，我非常喜欢他在舞台上的舞姿和穿搭。", options: ["A. GD", "B. T.O.P", "C. 大声", "D. 太阳","E. 胜利"], answer: 0 },
    { text: "郑雅娴最像什么动物？", options: ["A. 老鼠", "B. 猫", "C. 熊", "D. 鸭子", "E. 松鼠"], answer: 1 },
    { text: "我的英文名叫什么？", options: ["A. Zavier", "B. Helen", "C. Olivia", "D. Eva", "E. Jay"], answer: 3 },
    { text: "要不要永远跟我做好朋友？", options: ["A. 要", "B. 不要"], answer: 0 }
];

let level = new URLSearchParams(window.location.search).get("level") || 1;
level = parseInt(level) - 1;

function loadQuestion() {
    const questionEl = document.getElementById("question");
    const questionTextEl = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");

    questionEl.textContent = `第 ${level + 1} 关`;
    questionTextEl.textContent = questions[level].text;

    optionsContainer.innerHTML = "";

    questions[level].options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.onclick = () => checkAnswer(index, button);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex, button) {
    const correctIndex = questions[level].answer;
    const options = document.querySelectorAll(".option");

    if (selectedIndex === correctIndex) {
        button.classList.add("correct");

        setTimeout(() => {
            if (level === questions.length - 1) {
                window.location.href = "youwin.html";
            } else {
                window.location.href = `index.html?unlocked=${level + 2}`;
            }
        }, 1000);
    } else {
        button.classList.add("wrong");
    }
}

loadQuestion();
