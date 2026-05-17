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

// Providers
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

// DOM Elements
const authContainer = document.getElementById('authContainer');
const appContainer = document.getElementById('appContainer');

const loginEmailInput = document.getElementById('loginEmailInput');
const loginPasswordInput = document.getElementById('loginPasswordInput');
const signUpEmailInput = document.getElementById('signUpEmailInput');
const signUpPasswordInput = document.getElementById('signUpPasswordInput');

const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const googleLoginBtn = document.getElementById('googleLoginBtn');
const googleSignUpBtn = document.getElementById('googleSignUpBtn');
const facebookLoginBtn = document.getElementById('facebookLoginBtn');
const facebookSignUpBtn = document.getElementById('facebookSignUpBtn');
const logoutBtn = document.getElementById('logoutBtn');

const liveClock = document.getElementById('liveClock');
const monthSelect = document.getElementById('monthSelect');
const currentDateDisplay = document.getElementById('currentDateDisplay');
const trackerWrapper = document.getElementById('trackerWrapper');
const newHabitInput = document.getElementById('newHabitInput');
const addHabitBtn = document.getElementById('addHabitBtn');
const toastContainer = document.getElementById('toastContainer');

// Slider Elements
let signUpButton = document.getElementById("sign-up-button");
let signUpHolder = document.querySelector(".sign-up-holder");
let signIn = document.getElementById("sign-in");
let signUp = document.getElementById("sign-up");
let holderH1 = document.getElementById("holder-h1");
let holderH3 = document.getElementById("holder-h3");
let mobileSignUp = document.getElementById("mobile-sign-up");
let mobileSignIn = document.getElementById("mobile-sign-in");

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentRealMonth = currentDate.getMonth();
const currentRealDay = currentDate.getDate();

let habits = [];
let state = {};
let draggedIndex = null;
let currentUser = null;

// --- نظام تسجيل الدخول والتحقق ---

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

// Email/Password Login
loginBtn.addEventListener('click', () => {
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => showToast('Welcome back!'))
        .catch(error => {
            if (error.code === 'auth/user-not-found') {
                showToast("أنت لا تمتلك حساباً مسجلاً بهذا البريد! الرجاء إنشاء حساب جديد.", 'error');
            } else if (error.code === 'auth/wrong-password') {
                showToast("كلمة المرور غير صحيحة!", 'error');
            } else {
                showToast(error.message, 'error');
            }
        });
});

// Email/Password Signup
registerBtn.addEventListener('click', () => {
    const email = signUpEmailInput.value;
    const password = signUpPasswordInput.value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => showToast('Account created successfully!'))
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                showToast("عفواً، أنت تمتلك حساباً بالفعل بهذا البريد! الرجاء تسجيل الدخول.", 'error');
            } else {
                showToast(error.message, 'error');
            }
        });
});

// Google Login
googleLoginBtn.addEventListener('click', () => {
    auth.signInWithPopup(googleProvider)
        .then((result) => {
            if (result.additionalUserInfo.isNewUser) {
                result.user.delete().then(() => {
                    auth.signOut();
                    showToast("لا يوجد حساب مرتبط ببريد Google هذا! الرجاء إنشاء حساب جديد أولاً.", 'error');
                });
            } else {
                showToast('Google sign-in successful!');
            }
        })
        .catch((error) => showToast(error.message, 'error'));
});

// Google Signup
googleSignUpBtn.addEventListener('click', () => {
    auth.signInWithPopup(googleProvider)
        .then((result) => {
            if (!result.additionalUserInfo.isNewUser) {
                showToast("أنت تمتلك حساباً بالفعل مرتبطاً بـ Google هذا! تم تسجيل دخولك بنجاح.");
            } else {
                showToast('Account created successfully with Google!');
            }
        })
        .catch((error) => showToast(error.message, 'error'));
});

// Facebook Login
facebookLoginBtn.addEventListener('click', () => {
    auth.signInWithPopup(facebookProvider)
        .then((result) => {
            if (result.additionalUserInfo.isNewUser) {
                result.user.delete().then(() => {
                    auth.signOut();
                    showToast("لا يوجد حساب مرتبط بـ Facebook هذا! الرجاء إنشاء حساب جديد أولاً.", 'error');
                });
            } else {
                showToast('Facebook sign-in successful!');
            }
        })
        .catch((error) => {
            if(error.code === 'auth/account-exists-with-different-credential') {
                showToast("هذا البريد مسجل بالفعل بطريقة أخرى (مثل Google أو إيميل عادي). الرجاء تسجيل الدخول بتلك الطريقة.", 'error');
            } else {
                showToast(error.message, 'error');
            }
        });
});

// Facebook Signup
facebookSignUpBtn.addEventListener('click', () => {
    auth.signInWithPopup(facebookProvider)
        .then((result) => {
            if (!result.additionalUserInfo.isNewUser) {
                showToast("أنت تمتلك حساباً بالفعل مرتبطاً بـ Facebook هذا! تم تسجيل دخولك بنجاح.");
            } else {
                showToast('Account created successfully with Facebook!');
            }
        })
        .catch((error) => {
            if(error.code === 'auth/account-exists-with-different-credential') {
                showToast("هذا البريد مسجل بالفعل بطريقة أخرى (مثل Google أو إيميل عادي). الرجاء تسجيل الدخول بتلك الطريقة.", 'error');
            } else {
                showToast(error.message, 'error');
            }
        });
});

logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => showToast('Logged out securely.'));
});

// --- حركة اللوحة الجانبية (Slider) ---
signUpButton.addEventListener("click", function () {
    if (!signUpHolder.classList.contains("switched")) {
        signUpHolder.classList.remove("unswitched");
        signUpHolder.classList.add("switched");
        signUp.classList.remove("hidden");
        signIn.classList.add("hidden");
        holderH1.innerHTML = "Already have an account?";
        holderH3.innerHTML = "Sign-in to continue tracking your progress!";
        signUpButton.innerHTML = "Sign In";
    } else {
        signUpHolder.classList.remove("switched");
        signUpHolder.classList.add("unswitched");
        signIn.classList.remove("hidden");
        signUp.classList.add("hidden");
        holderH1.innerHTML = "Welcome To Elite!";
        holderH3.innerHTML = "If you are new here and don't know where to start, just sign up!";
        signUpButton.innerHTML = "Create Account";
    }
});

mobileSignUp.addEventListener("click", function () {
    signIn.classList.add("hidden");
    setTimeout(() => {
        signIn.style.display = "none";
        signUp.style.display = "flex";
        setTimeout(() => signUp.classList.remove("hidden"), 50);
    }, 300);
});

mobileSignIn.addEventListener("click", function () {
    signUp.classList.add("hidden");
    setTimeout(() => {
        signUp.style.display = "none";
        signIn.style.display = "flex";
        setTimeout(() => signIn.classList.remove("hidden"), 50);
    }, 300);
});

// --- وظائف التطبيق (Habit Tracker Logic) ---
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
    }).catch(error => console.log(error));
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
    showToast('Habit removed', 'error');
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
        dragHandle.innerHTML = '⋮⋮';
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

        // أزرار التحكم
        const actionBtns = document.createElement('div');
        actionBtns.className = 'action-btns';

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
        
        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        delBtn.onclick = () => deleteHabit(hIndex);

        const nameSpan = document.createElement('span');
        nameSpan.className = 'habit-text-span';
        nameSpan.textContent = habit;

        // التعديل المدمج
        editBtn.onclick = () => {
            if (nameDiv.querySelector('.edit-input')) return;

            const currentText = nameSpan.textContent;
            
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentText;
            input.className = 'edit-input';

            nameDiv.replaceChild(input, nameSpan);
            input.focus();

            const saveChanges = () => {
                const newText = input.value.trim();
                if (newText && newText !== currentText) {
                    habits[hIndex] = newText;
                    saveUserData();
                    showToast('Habit updated successfully!');
                }
                buildGrid(monthSelect.value); 
            };

            input.addEventListener('blur', saveChanges);
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    input.blur(); 
                }
            });
        };

        actionBtns.appendChild(editBtn);
        actionBtns.appendChild(delBtn);

        nameDiv.appendChild(dragHandle);
        nameDiv.appendChild(actionBtns);
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
            statusDiv.innerHTML = '<span style="color:var(--primary-gold);font-size:16px;">✦</span><div class="percent-text">' + percent + '%</div>';
        } else if (isPast) {
            if (percent === 0) {
                statusDiv.innerHTML = '<span style="opacity:0.3;">-</span>';
            } else {
                statusDiv.innerHTML = '<span style="color:var(--text-muted);font-size:12px;">✓</span><div class="percent-text" style="color:var(--text-muted)">' + percent + '%</div>';
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
        showToast('Habit cultivated successfully!');
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
