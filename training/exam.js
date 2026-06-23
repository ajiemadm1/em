// =====================================================
// EXAM MODULE (PRODUCTION READY)
// =====================================================

let currentSessionId = null;
let currentCaseId = null;
let currentQuestions = [];
let timerInterval = null;
let remainingSeconds = 0;

// =====================================================
// API WRAPPER
// =====================================================
async function apiGet(params) {
  const query = new URLSearchParams(params).toString();

  const res = await fetch(`${PostTest_URL}?${query}`);
  return await res.json();
}

async function apiPost(data) {
  const res = await fetch(PostTest_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(data)
  });

  return await res.json();
}

// =====================================================
// OPEN EXAM PAGE (INFO ONLY)
// =====================================================
async function openExam(caseId) {
  showLoading();

  try {
    currentCaseId = caseId;

    const exam = await apiGet({
      action: "getExam",
      caseId
    });

    renderExamInfo(exam);

  } finally {
    hideLoading();
  }
}

// =====================================================
// RENDER EXAM INFO PAGE
// =====================================================
function renderExamInfo(exam) {

  const content = document.getElementById("pageContent");

  content.innerHTML = `
    <div class="exam-container">

      <div class="exam-header">
        <h2>${exam.title}</h2>
      </div>

      <div class="exam-pdf">
        <iframe src="${exam.pdf}" style="width:100%;height:500px;border:0;"></iframe>
      </div>

      <div class="exam-info">
        <div>⏱ ${exam.duration} Minutes</div>
        <div>🎯 Passing: ${exam.passing}</div>
      </div>

      <div id="examAction">
        ${renderExamButton(exam)}
      </div>

    </div>
  `;
}

// =====================================================
// START / STATUS BUTTON
// =====================================================
function renderExamButton(exam) {

  if (exam.passed) {
    return `
      <button class="btn-primary" disabled>
        ✅ Already Passed (Score: ${exam.lastScore})
      </button>
    `;
  }

  return `
    <button class="btn-primary" onclick="startExam('${exam.caseId}')">
      🚀 Start Exam
    </button>
  `;
}

// =====================================================
// START OR RESUME EXAM
// =====================================================
async function startExam(caseId) {

  showLoading();

  try {

    currentCaseId = caseId;

    const res = await apiGet({
      action: "startExam",
      user: currentUser.username,
      caseId
    });

    if (!res.success) {
      showMessage("Error", "Failed to start exam", "error");
      return;
    }

    currentSessionId = res.sessionId;
    currentQuestions = res.questions;
    remainingSeconds = res.duration * 60;

    renderQuestionPage(res);

  } finally {
    hideLoading();
  }
}

// =====================================================
// RESUME SESSION (AUTO RESTORE)
// =====================================================
async function checkResumeExam() {

  const res = await apiGet({
    action: "getRunningExam",
    user: currentUser.username
  });

  if (!res.success) return;

  currentSessionId = res.sessionId;
  currentCaseId = res.caseId;
  remainingSeconds = res.remaining;

  const exam = await apiGet({
    action: "getExam",
    caseId: currentCaseId
  });

  startExam(currentCaseId);
}

// =====================================================
// RENDER QUESTION PAGE
// =====================================================
function renderQuestionPage(data) {

  const content = document.getElementById("pageContent");

  content.innerHTML = `
    <div class="exam-running">

      <div class="exam-topbar">
        <div><b>${data.title}</b></div>
        <div id="examTimer" class="exam-timer"></div>
      </div>

      <div id="questionContainer"></div>

      <div style="margin-top:20px;text-align:center;">
        <button class="btn-primary" onclick="submitExam()">
          Submit Exam
        </button>
      </div>

    </div>
  `;

  renderQuestions(data.questions);
  startTimer(data.remaining);
}

// =====================================================
// RENDER QUESTIONS
// =====================================================
function renderQuestions(questions) {

  const container = document.getElementById("questionContainer");

  container.innerHTML = "";

  questions.forEach((q, i) => {

    container.innerHTML += `
      <div class="question-card">

        <div style="display:flex;justify-content:space-between;">
          <b>Q${i + 1}</b>
          <span>⭐ ${q.weight || 1} point</span>
        </div>

        <div style="margin:10px 0;">
          ${q.question}
        </div>

        ${renderOption(q, "A")}
        ${renderOption(q, "B")}
        ${renderOption(q, "C")}
        ${renderOption(q, "D")}

      </div>
    `;
  });
}

// =====================================================
// OPTION RENDER
// =====================================================
function renderOption(q, opt) {
  return `
    <label>
      <input type="radio"
        name="${q.id}"
        value="${opt}"
        onchange="saveAnswer('${q.id}','${opt}')">
      ${q[opt]}
    </label><br>
  `;
}

// =====================================================
// SAVE ANSWER (REALTIME)
// =====================================================
async function saveAnswer(questionId, answer) {

  if (!currentSessionId) return;

  await apiPost({
    action: "saveAnswer",
    sessionId: currentSessionId,
    questionId,
    answer
  });
}

// =====================================================
// TIMER
// =====================================================
function startTimer(seconds) {

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {

    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;

    document.getElementById("examTimer").innerText =
      `${String(h).padStart(2,"0")}:` +
      `${String(m).padStart(2,"0")}:` +
      `${String(s).padStart(2,"0")}`;

    seconds--;

    if (seconds < 0) {
      clearInterval(timerInterval);
      submitExam();
    }

  }, 1000);
}

// =====================================================
// SUBMIT EXAM
// =====================================================
async function submitExam() {

  if (!currentSessionId) return;

  const confirmSubmit = confirm("Submit exam now?");
  if (!confirmSubmit) return;

  showLoading();

  try {

    const res = await apiPost({
      action: "submitExam",
      sessionId: currentSessionId,
      user: currentUser.username
    });

    clearInterval(timerInterval);

    showMessage(
      "Exam Finished",
      `Score: ${res.score}`,
      "success"
    );

    openExam(currentCaseId);

  } finally {
    hideLoading();
  }
}

// =====================================================
// AUTO RESTORE ON LOGIN
// =====================================================
async function restoreExam() {

  const res = await apiGet({
    action: "getRunningExam",
    user: currentUser.username
  });

  if (!res.success) return;

  currentSessionId = res.sessionId;
  currentCaseId = res.caseId;
  remainingSeconds = res.remaining;

  startExam(currentCaseId);
}
