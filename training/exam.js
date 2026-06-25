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
  const title = document.getElementById('pageTitle');

  title.textContent =
    exam.caseId;

  content.innerHTML = `
    <div class="exam-hero">
      <div class="hero-left">
      <h1>${exam.title}</h1>
      <p>
      Training & Assessment Module
      </p>
      </div>

      <div class="hero-right">
          <i class="fa-solid fa-fan"></i>
      </div>
    </div>

   <div class="exam-stat-grid">

          <div class="stat-card duration">
        
            <div class="icon">⏱</div>
        
            <div>
              <small>Duration</small>
              <h3>${exam.duration}</h3>
              <span>Minutes</span>
            </div>
        
          </div>
        
          <div class="stat-card passing">
        
            <div class="icon">🎯</div>
        
            <div>
              <small>Passing Score</small>
              <h3>${exam.passing}</h3>
            </div>
        
          </div>
        
          <div class="stat-card question">
        
            <div class="icon">📋</div>
        
            <div>
              <small>Total Questions</small>
              <h3>${exam.totalQuestion}</h3>
            </div>
        
          </div>
        
         <div class="stat-card attempt">

              <div class="icon">
                ${
                  exam.allowRetest === 'N'
                    ? '🔒'
                    : '🔄'
                }
              </div>
            
              <div>
            
                <small>Max Attempt</small>
            
                <h3>
                  ${
                    exam.allowRetest === 'N'
                      ? 'Not Allowed'
                      : (
                          Number(exam.maxAttempt) === 0
                            ? 'Unlimited'
                            : exam.maxAttempt
                        )
                  }
                </h3>
            
              </div>
            
          </div>

    </div>

    <div class="exam-content">

        <div class="pdf-panel">
      
          <div class="panel-header">
            <i class="fa fa-file-pdf"></i>
            Material Training
          </div>
      
          <iframe
            src="${exam.pdf}"
            class="pdf-frame">
          </iframe>
      
        </div>
      
        <div class="exam-sidebar">
      
          <div class="side-card">
      
            <h3>
              <i class="fa fa-list-check"></i>
              Petunjuk Ujian
            </h3>
    
            <br>
            
            <ul>
              <li>Baca materi terlebih dahulu</li>
              <li>Pastikan koneksi stabil</li>
              <li>Jangan refresh halaman</li>
              <li>Auto submit saat waktu habis</li>
            </ul>
      
          </div>
      
          <div class="side-card">
      
            <h3>
              <i class="fa fa-user"></i>
              Status Anda
            </h3>
      
            <div id="examStatus">
              ${renderExamStatus(exam)}
            </div>
      
          </div>
      
        </div>
    </div>

  `;
}

// ========================================
// RENDER BUTTON STATUS EXAM
// ========================================
function renderExamStatus(exam){

  // Sudah lulus
  if(exam.passed){

    return `
      <div class="status-pass">

        <div class="status-icon">
          ✅
        </div>

        <h4>
          Exam Completed
        </h4>

        <p>
          Score : ${exam.lastScore || '-'}
        </p>

        <button
          class="btn-disabled"
          disabled
        >
          Already Passed
        </button>

      </div>
    `;
  }

  // Sedang ada session berjalan
  if(exam.running){

    return `
      <div class="status-running">

        <div class="status-icon">
          ⏳
        </div>

        <h4>
          Exam In Progress
        </h4>

        <button
          class="btn-resume"
          onclick="resumeExam('${exam.caseId}')"
        >
          Resume Exam
        </button>

      </div>
    `;
  }

  // Belum pernah mengerjakan
  return `
    <div class="status-ready">

      <div class="status-icon">
        📚
      </div>

      <p>
        Belum mengerjakan ujian ini.
      </p>

      <br><br>

      ${renderExamButton(exam)}

    </div>
  `;
}

// =====================================================
// START / STATUS BUTTON
// =====================================================
function renderExamButton(exam) {

  if (exam.passed) {
    return `
      <button class="btn-disabled" disabled>
        ✅ Already Completed
      </button>
    `;
  }

  return `
    <button class="btn-start" onclick="startExam('${exam.caseId}')">
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
