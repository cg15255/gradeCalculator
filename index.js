const state = {
  clickedToSecondScreen: false,
  knowCurrentGrade: false
};

const app = document.querySelector(".app");

const knowCurrentGradeHTML = `
    <span class="goBack"><a href="/">&laquo;</a></span>
        <div class="top-card">
          <h1>Your Final Mark</h1>
          <h2 class="finalPercent">100%</h2>
          <div class="current-grade input-label-group">
            <label for="currentGrade">Current Grade</label>
            <div class="input-group">
              <input
                type="number"
                min="0"
                step="0.1"
                name="currentGrade"
                id="currentGrade"
              />
              <span class="input-after">%</span>
            </div>
          </div>
        </div>

        <h1>FINAL EXAM</h1>
        <div class="bottom-card">
          <div class="input-label-group">
            <label for="estimatedGrade">What you think you'll get</label>
            <div class="input-group">
              <input
                type="number"
                min="0"
                step="0.1"
                name="estimatedGrade"
                id="estimatedGrade"
              />
              <span class="input-after">%</span>
            </div>
          </div>
          <div class="input-label-group">
            <label for="finalWeight">What it's worth</label>
            <div class="input-group">
              <input
                type="number"
                min="0"
                step="0.1"
                name="finalWeight"
                id="finalWeight"
              />
              <span class="input-after">%</span>
            </div>
          </div>
        </div>
`;

const dontKnowCurrentGradeHTML = `
    <h1>I'M AN IDIOT</h1>
`;

// FUNCTIONS

function handleAppClick(e) {
  if (e.target.dataset.know === "true") {
    state.knowCurrentGrade = true;
    loadSecondScreen();
  } else if (e.target.dataset.know === "false") {
    state.knowCurrentGrade = false;
    loadSecondScreen();
  }
}

function loadSecondScreen() {
  if (state.knowCurrentGrade) {
    app.innerHTML = knowCurrentGradeHTML;
    app.classList.add("secondScreen");
    app.classList.add("knowCurrentGrade");
  } else {
    app.innerHTML = dontKnowCurrentGradeHTML;
    app.classList.add("secondScreen");
    app.classList.add("dontKnowCurrentGrade");
  }
}

// EVENTS

app.addEventListener("click", handleAppClick);
