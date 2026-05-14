const firebaseConfig = {
    apiKey: "AIzaSyDiQAyW7xKXjkDP07KkP3w5Djd0r-yl55c",
    authDomain: "my-progress-4dd0b.firebaseapp.com",
    projectId: "my-progress-4dd0b",
    storageBucket: "my-progress-4dd0b.firebasestorage.app",
    messagingSenderId: "566611777787",
    appId: "1:566611777787:web:b2727bc9e47651edde385e",
    measurementId: "G-YFRCNQQMS1"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// إعداد مزود تسجيل الدخول الخاص بجوجل
const googleProvider = new firebase.auth.GoogleAuthProvider();

const authContainer = document.getElementById('authContainer');
const appContainer = document.getElementById('appContainer');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const googleBtn = document.getElementById('googleBtn');
const logoutBtn = document.getElementById('logoutBtn');

const liveClock = document.getElementById('liveClock');
const monthSelect = document.getElementById('monthSelect');
const currentDateDisplay = document.getElementById('currentDateDisplay');
const trackerWrapper = document.getElementById('trackerWrapper');
const newHabitInput = document.getElementById('newHabitInput');
const addHabitBtn = document.getElementById('addHabitBtn');
const toastContainer = document.getElementById('toastContainer');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentRealMonth = currentDate.getMonth();
const currentRealDay = currentDate.getDate();

let habits = [];
let state = {};
let draggedIndex = null;
let currentUser = null;

auth.onAuthStateChanged(user => {
    if (user) {
        currentUser = user;
        authContainer.style.display = 'none';
        appContainer.style.display = 'flex';
        loadUserData();
    } else {
        currentUser = null;
        authContainer.style.display = 'flex';
        appContainer.style.display = 'none';
        habits = [];
        state = {};
    }
});

// الدخول بالإيميل والباسورد
loginBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => showToast('Logged in successfully!'))
        .catch(error => showToast(error.message, 'error'));
});

registerBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => showToast('Account created successfully!'))
        .catch(error => showToast(error.message, 'error'));
});

// الدخول باستخدام جوجل
googleBtn.addEventListener('click', () => {
    auth.signInWithPopup(googleProvider)
        .then((result) => {
            showToast('Logged in with Google successfully!');
        })
        .catch((error) => {
            showToast(error.message, 'error');
        });
});

logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => showToast('Logged out'));
});

function loadUserData() {
    db.collection('users').doc(currentUser.uid).get().then(doc => {
        if (doc.exists) {
            const data = doc.data();
            habits = data.habits || [];
            state = data.state ? JSON.parse(data.state) : {};
        } else {
            habits = [];
            state = {};
        }
        buildGrid(currentRealMonth);
    }).catch(error => showToast('Error loading data', 'error'));
}

function saveUserData() {
    if (!currentUser) return;
    db.collection('users').doc(currentUser.uid).set({
        habits: habits,
        state: JSON.stringify(state)
    }).catch(error => showToast('Error saving data', 'error'));
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        if (toast.parentElement) toast.remove();
    }, 3000);
}

function updateClock() {
    const now = new Date();
    liveClock.textContent = now.toLocaleTimeString('en-US', { hour12: true });
}

setInterval(updateClock, 1000);
updateClock();

monthNames.forEach((month, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = month;
    if (index === currentRealMonth) {
        option.selected = true;
    }
    monthSelect.appendChild(option);
});

function getMonthState(monthIndex, daysInMonth) {
    if (!state[monthIndex]) {
        state[monthIndex] = Array.from({ length: daysInMonth }, () => Array(habits.length).fill(false));
    }
    return state[monthIndex];
}

function calculateDayProgress(monthIndex, dayIndex) {
    if (habits.length === 0) return 0;
    const dayData = state[monthIndex][dayIndex];
    const completed = dayData.filter(Boolean).length;
    return Math.round((completed / habits.length) * 100);
}

function calculateHabitProgress(monthIndex, habitIndex, daysInMonth) {
    let completed = 0;
    for (let i = 0; i < daysInMonth; i++) {
        if (state[monthIndex][i][habitIndex]) {
            completed++;
        }
    }
    return Math.round((completed / daysInMonth) * 100);
}

function deleteHabit(hIndex) {
    habits.splice(hIndex, 1);
    Object.keys(state).forEach(month => {
        state[month].forEach(dayArray => {
            dayArray.splice(hIndex, 1);
        });
    });
    showToast('Habit deleted!', 'error');
    saveUserData();
    buildGrid(monthSelect.value);
}

function reorderHabits(oldIndex, newIndex) {
    const movedHabit = habits.splice(oldIndex, 1)[0];
    habits.splice(newIndex, 0, movedHabit);

    Object.keys(state).forEach(month => {
        state[month].forEach(dayArray => {
            const movedState = dayArray.splice(oldIndex, 1)[0];
            dayArray.splice(newIndex, 0, movedState);
        });
    });
    saveUserData();
    buildGrid(monthSelect.value);
}

function buildGrid(monthIndex) {
    trackerWrapper.innerHTML = '';
    monthIndex = parseInt(monthIndex);
    const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
    getMonthState(monthIndex, daysInMonth);
    
    currentDateDisplay.textContent = `${monthNames[monthIndex]} ${currentYear}`;

    const headerRow = document.createElement('div');
    headerRow.className = 'row header-row';
    
    const emptyCorner = document.createElement('div');
    emptyCorner.className = 'habit-name';
    headerRow.appendChild(emptyCorner);

    const daysGrid = document.createElement('div');
    daysGrid.className = 'grid-container';

    const statusElements = [];

    for (let d = 0; d < daysInMonth; d++) {
        const column = document.createElement('div');
        column.className = 'column';

        const statusDiv = document.createElement('div');
        statusDiv.className = 'day-status';
        statusElements.push(statusDiv);

        const numberDiv = document.createElement('div');
        numberDiv.className = 'day-number';
        numberDiv.textContent = d + 1;

        if (d + 1 === currentRealDay && monthIndex === currentRealMonth) {
            numberDiv.classList.add('today-highlight');
        }

        column.appendChild(statusDiv);
        column.appendChild(numberDiv);
        daysGrid.appendChild(column);
    }

    headerRow.appendChild(daysGrid);
    
    const dummyProgress = document.createElement('div');
    dummyProgress.className = 'progress-section';
    dummyProgress.style.visibility = 'hidden';
    dummyProgress.innerHTML = '<div class="progress-bar-container"></div><div class="percentage-text">100%</div>';
    headerRow.appendChild(dummyProgress);

    trackerWrapper.appendChild(headerRow);

    const habitFills = [];
    const habitTexts = [];

    habits.forEach((habit, hIndex) => {
        const row = document.createElement('div');
        row.className = 'row habit-row';
        row.setAttribute('data-index', hIndex);

        const nameDiv = document.createElement('div');
        nameDiv.className = 'habit-name';
        
        const dragHandle = document.createElement('span');
        dragHandle.className = 'drag-handle';
        dragHandle.innerHTML = '☰';
        dragHandle.draggable = true;

        dragHandle.addEventListener('dragstart', (e) => {
            draggedIndex = hIndex;
            row.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        });

        dragHandle.addEventListener('dragend', () => {
            row.classList.remove('dragging');
            document.querySelectorAll('.habit-row').forEach(r => r.classList.remove('drag-over-top', 'drag-over-bottom'));
        });

        row.addEventListener('dragover', (e) => {
            e.preventDefault();
            if(draggedIndex === null || draggedIndex === hIndex) return;
            const bounding = row.getBoundingClientRect();
            const offset = bounding.y + (bounding.height / 2);
            if (e.clientY - offset > 0) {
                row.classList.remove('drag-over-top');
                row.classList.add('drag-over-bottom');
            } else {
                row.classList.remove('drag-over-bottom');
                row.classList.add('drag-over-top');
            }
        });

        row.addEventListener('dragleave', () => {
            row.classList.remove('drag-over-top', 'drag-over-bottom');
        });

        row.addEventListener('drop', (e) => {
            e.preventDefault();
            row.classList.remove('drag-over-top', 'drag-over-bottom');
            if (draggedIndex === null || draggedIndex === hIndex) return;
            
            const bounding = row.getBoundingClientRect();
            const offset = bounding.y + (bounding.height / 2);
            let targetIndex = hIndex;
            if (e.clientY - offset > 0) {
                targetIndex++;
            }
            if (draggedIndex < targetIndex) {
                targetIndex--;
            }
            if (draggedIndex !== targetIndex) {
                reorderHabits(draggedIndex, targetIndex);
            }
            draggedIndex = null;
        });

        dragHandle.addEventListener('touchstart', (e) => {
            draggedIndex = hIndex;
            row.classList.add('dragging');
        }, {passive: true});

        dragHandle.addEventListener('touchmove', (e) => {
            if (e.cancelable) e.preventDefault();
            if (draggedIndex === null) return;
            
            const touch = e.touches[0];
            const target = document.elementFromPoint(touch.clientX, touch.clientY);
            const targetRow = target ? target.closest('.habit-row') : null;
            
            document.querySelectorAll('.habit-row').forEach(r => r.classList.remove('drag-over-top', 'drag-over-bottom'));
            
            if (targetRow && targetRow !== row) {
                const targetIdx = parseInt(targetRow.getAttribute('data-index'));
                if(!isNaN(targetIdx)) {
                    const bounding = targetRow.getBoundingClientRect();
                    const offset = bounding.y + (bounding.height / 2);
                    if (touch.clientY - offset > 0) {
                        targetRow.classList.add('drag-over-bottom');
                    } else {
                        targetRow.classList.add('drag-over-top');
                    }
                }
            }
        }, {passive: false});

        dragHandle.addEventListener('touchend', (e) => {
            row.classList.remove('dragging');
            if (draggedIndex === null) return;

            const touch = e.changedTouches[0];
            const target = document.elementFromPoint(touch.clientX, touch.clientY);
            const targetRow = target ? target.closest('.habit-row') : null;
            
            document.querySelectorAll('.habit-row').forEach(r => r.classList.remove('drag-over-top', 'drag-over-bottom'));
            
            if (targetRow && targetRow !== row) {
                let targetIndex = parseInt(targetRow.getAttribute('data-index'));
                if (!isNaN(targetIndex)) {
                    const bounding = targetRow.getBoundingClientRect();
                    const offset = bounding.y + (bounding.height / 2);
                    if (touch.clientY - offset > 0) {
                        targetIndex++;
                    }
                    if (draggedIndex < targetIndex) {
                        targetIndex--;
                    }
                    if (draggedIndex !== targetIndex) {
                        reorderHabits(draggedIndex, targetIndex);
                    }
                }
            }
            draggedIndex = null;
        });

        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.innerHTML = '✖';
        delBtn.onclick = () => deleteHabit(hIndex);
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = habit;

        nameDiv.appendChild(dragHandle);
        nameDiv.appendChild(delBtn);
        nameDiv.appendChild(nameSpan);
        row.appendChild(nameDiv);

        const checksGrid = document.createElement('div');
        checksGrid.className = 'grid-container';

        for (let d = 0; d < daysInMonth; d++) {
            const column = document.createElement('div');
            column.className = 'column';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'day-checkbox';
            checkbox.checked = state[monthIndex][d][hIndex] || false;

            const dayNum = d + 1;
            const isToday = monthIndex === currentRealMonth && dayNum === currentRealDay;
            
            if (!isToday) {
                checkbox.disabled = true;
            }

            checkbox.addEventListener('change', (e) => {
                state[monthIndex][d][hIndex] = e.target.checked;
                updateAllProgress(monthIndex, daysInMonth, statusElements, habitFills, habitTexts);
                saveUserData();
            });

            column.appendChild(checkbox);
            checksGrid.appendChild(column);
        }

        row.appendChild(checksGrid);

        const progressSection = document.createElement('div');
        progressSection.className = 'progress-section';
        
        const barContainer = document.createElement('div');
        barContainer.className = 'progress-bar-container';
        
        const fill = document.createElement('div');
        fill.className = 'progress-fill';
        habitFills.push(fill);
        
        const text = document.createElement('div');
        text.className = 'percentage-text';
        text.textContent = '0%';
        habitTexts.push(text);

        barContainer.appendChild(fill);
        progressSection.appendChild(barContainer);
        progressSection.appendChild(text);
        
        row.appendChild(progressSection);
        trackerWrapper.appendChild(row);
    });

    if (habits.length > 0) {
        updateAllProgress(monthIndex, daysInMonth, statusElements, habitFills, habitTexts);
    } else {
        for (let d = 0; d < daysInMonth; d++) {
            statusElements[d].innerHTML = '';
        }
    }
}

function updateAllProgress(monthIndex, daysInMonth, statusElements, habitFills, habitTexts) {
    if (habits.length === 0) return;

    for (let d = 0; d < daysInMonth; d++) {
        const dayNum = d + 1;
        const isPast = monthIndex < currentRealMonth || (monthIndex === currentRealMonth && dayNum < currentRealDay);
        const isToday = monthIndex === currentRealMonth && dayNum === currentRealDay;
        
        const percent = calculateDayProgress(monthIndex, d);
        const statusDiv = statusElements[d];

        if (isToday) {
            statusDiv.innerHTML = '⭐<div class="percent-text">' + percent + '%</div>';
        } else if (isPast) {
            if (percent === 0) {
                statusDiv.innerHTML = '❌';
            } else {
                statusDiv.innerHTML = '✔<div class="percent-text">' + percent + '%</div>';
            }
        } else {
            statusDiv.innerHTML = '';
        }
    }

    habits.forEach((_, hIndex) => {
        const percent = calculateHabitProgress(monthIndex, hIndex, daysInMonth);
        if(habitFills[hIndex]) {
            habitFills[hIndex].style.width = percent + '%';
            habitTexts[hIndex].textContent = percent + '%';
        }
    });
}

addHabitBtn.addEventListener('click', () => {
    const newHabit = newHabitInput.value.trim();
    if (newHabit) {
        habits.push(newHabit);
        Object.keys(state).forEach(month => {
            state[month].forEach(dayArray => {
                dayArray.push(false);
            });
        });
        newHabitInput.value = '';
        showToast('Habit added successfully!');
        saveUserData();
        buildGrid(monthSelect.value);
    }
});

newHabitInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addHabitBtn.click();
    }
});

monthSelect.addEventListener('change', function(e) {
    buildGrid(e.target.value);
});