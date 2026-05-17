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
const googleProvider = new firebase.auth.GoogleAuthProvider();

// --- نظام الترجمة (Dictionary) ---
const i18n = {
    en: {
        appTitle: "Elite Tracker",
        welcomeBack: "Welcome Back",
        signInSub: "Sign in to continue your journey",
        email: "Email Address",
        password: "Password",
        loginBtn: "Login",
        or: "OR",
        loginGoogle: "Continue with Google",
        mobileCreate: "Create Account",
        sliderH1Unswitched: "Welcome To Elite!",
        sliderH3Unswitched: "If you are new here and don't know where to start, just sign up to start your journey!",
        sliderBtnUnswitched: "Create Account",
        sliderH1Switched: "Already have an account?",
        sliderH3Switched: "Sign-in to continue tracking your progress!",
        sliderBtnSwitched: "Sign In",
        createAcc: "Create Account",
        createAccSub: "Join us and start tracking",
        reqLength: "6 characters minimum",
        reqUpper: "Uppercase letter (A-Z)",
        reqLower: "Lowercase letter (a-z)",
        reqNumber: "Number (0-9)",
        reqSpecial: "Special character (!@#$%^&*)",
        signUpBtn: "Sign Up",
        signUpGoogle: "Continue with Google",
        mobileAlready: "Already have an account?",
        logout: "Logout",
        settings: "Account Settings",
        profileName: "Name",
        profileDate: "Joined On",
        newHabit: "Enter new habit...",
        addHabit: "Add Habit",
        msgWelcomeBack: "Welcome back!",
        msgUserNotFound: "No account found with this email! Please create one.",
        msgWrongPass: "Incorrect password!",
        msgAccCreated: "Account created successfully!",
        msgEmailInUse: "Email already in use! Please login.",
        msgReqNotMet: "Please fulfill all password requirements (green checks) first!",
        msgGoogleNoAcc: "No account linked to this Google email. Please sign up first.",
        msgGoogleSuccess: "Google sign-in successful!",
        msgGoogleAlready: "Account already exists! Signed in successfully.",
        msgLoggedOut: "Logged out securely.",
        msgHabitAdded: "Habit cultivated successfully!",
        msgHabitRemoved: "Habit removed",
        msgHabitUpdated: "Habit updated successfully!",
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },
    ar: {
        appTitle: "إليت تراكر",
        welcomeBack: "مرحباً بعودتك",
        signInSub: "سجل الدخول لمتابعة رحلتك",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        loginBtn: "تسجيل الدخول",
        or: "أو",
        loginGoogle: "التسجيل بواسطة Google",
        mobileCreate: "إنشاء حساب",
        sliderH1Unswitched: "مرحباً بك في إليت!",
        sliderH3Unswitched: "إذا كنت جديداً هنا، فقط قم بإنشاء حساب لتبدأ رحلتك وتحقق أهدافك!",
        sliderBtnUnswitched: "إنشاء حساب",
        sliderH1Switched: "لديك حساب بالفعل؟",
        sliderH3Switched: "سجل الدخول لمتابعة تقدمك وعاداتك اليومية!",
        sliderBtnSwitched: "تسجيل الدخول",
        createAcc: "إنشاء حساب",
        createAccSub: "انضم إلينا وابدأ التتبع",
        reqLength: "6 أحرف على الأقل",
        reqUpper: "حرف إنجليزي كبير (A-Z)",
        reqLower: "حرف إنجليزي صغير (a-z)",
        reqNumber: "رقم (0-9)",
        reqSpecial: "رمز خاص (!@#$%^&*)",
        signUpBtn: "إنشاء الحساب",
        signUpGoogle: "التسجيل بواسطة Google",
        mobileAlready: "لديك حساب بالفعل؟",
        logout: "تسجيل الخروج",
        settings: "إعدادات الحساب",
        profileName: "الاسم",
        profileDate: "تاريخ الانضمام",
        newHabit: "أدخل عادة جديدة...",
        addHabit: "إضافة عادة",
        msgWelcomeBack: "مرحباً بعودتك!",
        msgUserNotFound: "أنت لا تمتلك حساباً مسجلاً بهذا البريد! الرجاء إنشاء حساب جديد.",
        msgWrongPass: "كلمة المرور غير صحيحة!",
        msgAccCreated: "تم إنشاء الحساب بنجاح!",
        msgEmailInUse: "عفواً، أنت تمتلك حساباً بالفعل بهذا البريد! الرجاء تسجيل الدخول.",
        msgReqNotMet: "الرجاء استيفاء جميع شروط كلمة المرور الموضحة (علامات صح خضراء) أولاً!",
        msgGoogleNoAcc: "لا يوجد حساب مرتبط ببريد Google هذا! الرجاء إنشاء حساب جديد أولاً.",
        msgGoogleSuccess: "تم تسجيل الدخول بواسطة Google بنجاح!",
        msgGoogleAlready: "أنت تمتلك حساباً بالفعل مرتبطاً بـ Google هذا! تم تسجيل دخولك بنجاح.",
        msgLoggedOut: "تم تسجيل الخروج بأمان.",
        msgHabitAdded: "تمت إضافة العادة بنجاح!",
        msgHabitRemoved: "تم حذف العادة",
        msgHabitUpdated: "تم تعديل العادة بنجاح!",
        monthNames: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
    }
};

// DOM Elements
const languageContainer = document.getElementById('languageContainer');
const authContainer = document.getElementById('authContainer');
const appContainer = document.getElementById('appContainer');
const btnLangEn = document.getElementById('btnLangEn');
const btnLangAr = document.getElementById('btnLangAr');

const loginEmailInput = document.getElementById('loginEmailInput');
const loginPasswordInput = document.getElementById('loginPasswordInput');
const signUpEmailInput = document.getElementById('signUpEmailInput');
const signUpPasswordInput = document.getElementById('signUpPasswordInput');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const googleLoginBtn = document.getElementById('googleLoginBtn');
const googleSignUpBtn = document.getElementById('googleSignUpBtn');

const userProfileBtn = document.getElementById('userProfileBtn');
const profileDropdown = document.getElementById('profileDropdown');
const openSettingsBtn = document.getElementById('openSettingsBtn');
const logoutBtn = document.getElementById('logoutBtn');
const settingsModal = document.getElementById('settingsModal');
const closeModalBtn = document.getElementById('closeModalBtn');

const liveClock = document.getElementById('liveClock');
const monthSelect = document.getElementById('monthSelect');
const currentDateDisplay = document.getElementById('currentDateDisplay');
const trackerWrapper = document.getElementById('trackerWrapper');
const newHabitInput = document.getElementById('newHabitInput');
const addHabitBtn = document.getElementById('addHabitBtn');
const toastContainer = document.getElementById('toastContainer');

let signUpButton = document.getElementById("sign-up-button");
let signUpHolder = document.querySelector(".sign-up-holder");
let signIn = document.getElementById("sign-in");
let signUp = document.getElementById("sign-up");
let holderH1 = document.getElementById("holder-h1");
let holderH3 = document.getElementById("holder-h3");
let mobileSignUp = document.getElementById("mobile-sign-up");
let mobileSignIn = document.getElementById("mobile-sign-in");

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentRealMonth = currentDate.getMonth();
const currentRealDay = currentDate.getDate();

let habits = [];
let state = {};
let draggedIndex = null;
let currentUser = null;
let selectedLanguage = localStorage.getItem('elite_language');

// --- Functions ---
function applyTranslations(lang) {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(i18n[lang][key]) el.innerHTML = i18n[lang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if(i18n[lang][key]) el.placeholder = i18n[lang][key];
    });
    updateSliderText();
    buildMonthSelector();
    if (currentUser) {
        buildGrid(monthSelect.value || currentRealMonth);
        updateProfileInfo(currentUser); 
    }
}

function updateSliderText() {
    if (!selectedLanguage) return;
    if (signUpHolder.classList.contains("switched")) {
        holderH1.innerHTML = i18n[selectedLanguage].sliderH1Switched;
        holderH3.innerHTML = i18n[selectedLanguage].sliderH3Switched;
        signUpButton.innerHTML = i18n[selectedLanguage].sliderBtnSwitched;
    } else {
        holderH1.innerHTML = i18n[selectedLanguage].sliderH1Unswitched;
        holderH3.innerHTML = i18n[selectedLanguage].sliderH3Unswitched;
        signUpButton.innerHTML = i18n[selectedLanguage].sliderBtnUnswitched;
    }
}

function buildMonthSelector() {
    if (!selectedLanguage) return;
    const mNames = i18n[selectedLanguage].monthNames;
    const currentVal = monthSelect.value;
    monthSelect.innerHTML = '';
    mNames.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = month;
        if (index == (currentVal !== "" ? currentVal : currentRealMonth)) option.selected = true;
        monthSelect.appendChild(option);
    });
}

function updateProfileInfo(user) {
    const displayName = user.displayName || user.email.split('@')[0];
    const defaultPhoto = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=d4af37&color=000&bold=true`;
    const photoURL = user.photoURL || defaultPhoto;

    document.getElementById('userAvatar').src = photoURL;
    document.getElementById('userNameDisplay').textContent = displayName;
    document.getElementById('modalAvatar').src = photoURL;
    document.getElementById('modalName').textContent = displayName;

    if(user.metadata && user.metadata.creationTime) {
        const creationTime = new Date(user.metadata.creationTime);
        const locale = selectedLanguage === 'ar' ? 'ar-EG' : 'en-US';
        const formattedDate = creationTime.toLocaleString(locale, {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
        });
        document.getElementById('modalDate').textContent = formattedDate;
    }
}

function routeApp() {
    if (!selectedLanguage) {
        languageContainer.style.display = 'flex';
        authContainer.style.display = 'none';
        appContainer.style.display = 'none';
    } else {
        applyTranslations(selectedLanguage);
        languageContainer.style.display = 'none';
        if (currentUser) {
            authContainer.style.display = 'none';
            appContainer.style.display = 'flex';
        } else {
            authContainer.style.display = 'flex';
            appContainer.style.display = 'none';
        }
    }
}

// Language Listeners
btnLangEn.addEventListener('click', () => {
    localStorage.setItem('elite_language', 'en');
    selectedLanguage = 'en';
    routeApp();
});
btnLangAr.addEventListener('click', () => {
    localStorage.setItem('elite_language', 'ar');
    selectedLanguage = 'ar';
    routeApp();
});

// Profile Actions
userProfileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle('show');
    document.querySelector('.user-profile-container').classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!profileDropdown.contains(e.target) && !userProfileBtn.contains(e.target)) {
        profileDropdown.classList.remove('show');
        document.querySelector('.user-profile-container').classList.remove('active');
    }
});

openSettingsBtn.addEventListener('click', () => {
    settingsModal.style.display = 'flex';
});
closeModalBtn.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});
settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) settingsModal.style.display = 'none';
});

// Password Toggle & Validation
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
        const input = this.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text';
            this.classList.replace('fa-eye-slash', 'fa-eye');
        } else {
            input.type = 'password';
            this.classList.replace('fa-eye', 'fa-eye-slash');
        }
    });
});

const reqLength = document.getElementById('req-length');
const reqUpper = document.getElementById('req-upper');
const reqLower = document.getElementById('req-lower');
const reqNumber = document.getElementById('req-number');
const reqSpecial = document.getElementById('req-special');
let isPasswordValid = false;

function updateReqUI(element, isValid) {
    const icon = element.querySelector('i');
    if (isValid) {
        icon.className = 'fa-solid fa-check req-valid';
        element.classList.add('valid-text');
    } else {
        icon.className = 'fa-solid fa-xmark req-invalid';
        element.classList.remove('valid-text');
    }
}

signUpPasswordInput.addEventListener('input', (e) => {
    const val = e.target.value;
    const validLength = val.length >= 6;
    const validUpper = /[A-Z]/.test(val);
    const validLower = /[a-z]/.test(val);
    const validNumber = /[0-9]/.test(val);
    const validSpecial = /[^A-Za-z0-9]/.test(val);

    updateReqUI(reqLength, validLength);
    updateReqUI(reqUpper, validUpper);
    updateReqUI(reqLower, validLower);
    updateReqUI(reqNumber, validNumber);
    updateReqUI(reqSpecial, validSpecial);

    isPasswordValid = validLength && validUpper && validLower && validNumber && validSpecial;
});

// Authentication
auth.onAuthStateChanged(user => {
    if (user) {
        currentUser = user;
        loadUserData();
    } else {
        currentUser = null;
        habits = [];
        state = {};
    }
    routeApp(); 
});

loginBtn.addEventListener('click', () => {
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => showToast(i18n[selectedLanguage].msgWelcomeBack))
        .catch(error => {
            if (error.code === 'auth/user-not-found') showToast(i18n[selectedLanguage].msgUserNotFound, 'error');
            else if (error.code === 'auth/wrong-password') showToast(i18n[selectedLanguage].msgWrongPass, 'error');
            else showToast(error.message, 'error');
        });
});

registerBtn.addEventListener('click', () => {
    const email = signUpEmailInput.value;
    const password = signUpPasswordInput.value;
    if (!isPasswordValid) {
        showToast(i18n[selectedLanguage].msgReqNotMet, 'error');
        return;
    }
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => showToast(i18n[selectedLanguage].msgAccCreated))
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') showToast(i18n[selectedLanguage].msgEmailInUse, 'error');
            else showToast(error.message, 'error');
        });
});

googleLoginBtn.addEventListener('click', () => {
    auth.signInWithPopup(googleProvider)
        .then((result) => {
            if (result.additionalUserInfo.isNewUser) {
                result.user.delete().then(() => {
                    auth.signOut();
                    showToast(i18n[selectedLanguage].msgGoogleNoAcc, 'error');
                });
            } else {
                showToast(i18n[selectedLanguage].msgGoogleSuccess);
            }
        })
        .catch((error) => showToast(error.message, 'error'));
});

googleSignUpBtn.addEventListener('click', () => {
    auth.signInWithPopup(googleProvider)
        .then((result) => {
            if (!result.additionalUserInfo.isNewUser) {
                showToast(i18n[selectedLanguage].msgGoogleAlready);
            } else {
                showToast(i18n[selectedLanguage].msgAccCreated);
            }
        })
        .catch((error) => showToast(error.message, 'error'));
});

logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
        // Option: clear language on logout so they can pick again, or keep it. We'll keep it for now.
        showToast(i18n[selectedLanguage].msgLoggedOut);
    });
});

// Slider & UI
signUpButton.addEventListener("click", function () {
    if (!signUpHolder.classList.contains("switched")) {
        signUpHolder.classList.remove("unswitched");
        signUpHolder.classList.add("switched");
        signUp.classList.remove("hidden");
        signIn.classList.add("hidden");
    } else {
        signUpHolder.classList.remove("switched");
        signUpHolder.classList.add("unswitched");
        signIn.classList.remove("hidden");
        signUp.classList.add("hidden");
    }
    updateSliderText(); 
});

mobileSignUp.addEventListener("click", function () {
    signIn.classList.add("hidden");
    setTimeout(() => { signIn.style.display = "none"; signUp.style.display = "flex"; setTimeout(() => signUp.classList.remove("hidden"), 50); }, 300);
});

mobileSignIn.addEventListener("click", function () {
    signUp.classList.add("hidden");
    setTimeout(() => { signUp.style.display = "none"; signIn.style.display = "flex"; setTimeout(() => signIn.classList.remove("hidden"), 50); }, 300);
});

// Tracker Functions
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
        buildGrid(monthSelect.value || currentRealMonth);
    }).catch(error => console.log(error));
}

function saveUserData() {
    if (!currentUser) return;
    db.collection('users').doc(currentUser.uid).set({ habits: habits, state: JSON.stringify(state) }).catch(error => console.log(error));
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => { if (toast.parentElement) toast.remove(); }, 3000);
}

function updateClock() {
    const now = new Date();
    liveClock.textContent = now.toLocaleTimeString('en-US', { hour12: true });
}
setInterval(updateClock, 1000);
updateClock();

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
        if (state[monthIndex][i][habitIndex]) completed++;
    }
    return Math.round((completed / daysInMonth) * 100);
}

function deleteHabit(hIndex) {
    habits.splice(hIndex, 1);
    Object.keys(state).forEach(month => {
        state[month].forEach(dayArray => { dayArray.splice(hIndex, 1); });
    });
    showToast(i18n[selectedLanguage].msgHabitRemoved, 'error');
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
    
    currentDateDisplay.textContent = `${i18n[selectedLanguage].monthNames[monthIndex]} ${currentYear}`;

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
            if (e.clientY - offset > 0) targetIndex++;
            if (draggedIndex < targetIndex) targetIndex--;
            if (draggedIndex !== targetIndex) {
                reorderHabits(draggedIndex, targetIndex);
            }
            draggedIndex = null;
        });

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
                    showToast(i18n[selectedLanguage].msgHabitUpdated);
                }
                buildGrid(monthSelect.value); 
            };

            input.addEventListener('blur', saveChanges);
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') input.blur(); 
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
            if (!isToday) checkbox.disabled = true;

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
        showToast(i18n[selectedLanguage].msgHabitAdded);
        saveUserData();
        buildGrid(monthSelect.value);
    }
});

newHabitInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addHabitBtn.click();
});

monthSelect.addEventListener('change', function(e) {
    buildGrid(e.target.value);
});