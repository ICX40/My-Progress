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

// المهام الإسلامية الافتراضية
const defaultIslamicHabitsAR = [
    "الصلوات الخمس في وقتها 🕌",
    "أذكار الصباح والمساء 📿",
    "ورد القرآن الكريم 📖",
    "صلاة الضحى ☀️",
    "الوتر / قيام الليل 🌙",
    "سورة الكهف (الجمعة) ✨"
];
const defaultIslamicHabitsEN = [
    "Five Daily Prayers 🕌",
    "Morning/Evening Adhkar 📿",
    "Daily Quran Reading 📖",
    "Duha Prayer ☀️",
    "Witr / Night Prayer 🌙",
    "Surah Al-Kahf (Friday) ✨"
];

const i18n = {
    en: {
        appTitle: "Elite Tracker", welcomeBack: "Welcome Back", signInSub: "Sign in to continue your journey",
        email: "Email Address", password: "Password", loginBtn: "Login", or: "OR", loginGoogle: "Continue with Google",
        mobileCreate: "Create Account", sliderH1Unswitched: "Welcome To Elite!", sliderH3Unswitched: "If you are new here and don't know where to start, just sign up to start your journey!",
        sliderBtnUnswitched: "Create Account", sliderH1Switched: "Already have an account?", sliderH3Switched: "Sign-in to continue tracking your progress!",
        sliderBtnSwitched: "Sign In", createAcc: "Create Account", createAccSub: "Join us and start tracking",
        reqLength: "6 characters minimum", reqUpper: "Uppercase letter (A-Z)", reqLower: "Lowercase letter (a-z)", reqNumber: "Number (0-9)", reqSpecial: "Special character (!@#$%^&*)", signUpBtn: "Sign Up", signUpGoogle: "Continue with Google",
        mobileAlready: "Already have an account?", logout: "Logout", settings: "Account Settings", profileName: "Name", profileDate: "Joined On",
        bio: "Bio", bioPlaceholder: "Write something about yourself...", saveChanges: "Save Changes", uploading: "Processing image...", imgReady: "Image ready, click save",
        newHabit: "Enter new habit...", addHabit: "Add Habit", msgWelcomeBack: "Welcome back!", msgUserNotFound: "No account found with this email!", msgWrongPass: "Incorrect password!", msgAccCreated: "Account created successfully!", msgEmailInUse: "Email already in use!", msgReqNotMet: "Please fulfill all password requirements!", msgGoogleNoAcc: "No account linked to this Google email.", msgGoogleSuccess: "Google sign-in successful!", msgGoogleAlready: "Account already exists! Signed in successfully.", msgLoggedOut: "Logged out securely.", msgHabitAdded: "Habit added successfully!", msgHabitRemoved: "Habit removed", msgHabitUpdated: "Habit updated successfully!", msgProfileUpdated: "Profile updated successfully!",
        leaderboardTitle: "Elite Leaderboard", leaderboardSub: "The top performers of the elite journey",
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },
    ar: {
        appTitle: "إليت تراكر", welcomeBack: "مرحباً بعودتك", signInSub: "سجل الدخول لمتابعة رحلتك",
        email: "البريد الإلكتروني", password: "كلمة المرور", loginBtn: "تسجيل الدخول", أو: "أو", loginGoogle: "التسجيل بواسطة Google",
        mobileCreate: "إنشاء حساب", sliderH1Unswitched: "مرحباً بك في إليت!", sliderH3Unswitched: "إذا كنت جديداً هنا، فقط قم بإنشاء حساب لتبدأ رحلتك وتحقق أهدافك!",
        sliderBtnUnswitched: "إنشاء حساب", sliderH1Switched: "لديك حساب بالفعل؟", sliderH3Switched: "سجل الدخول لمتابعة تقدمك وعاداتك اليومية!",
        sliderBtnSwitched: "تسجيل الدخول", createAcc: "إنشاء حساب", createAccSub: "انضم إلينا وابدأ التتبع",
        reqLength: "6 أحرف على الأقل", reqUpper: "حرف إنجليزي كبير (A-Z)", reqLower: "حرف إنجليزي صغير (a-z)", reqNumber: "رقم (0-9)", reqSpecial: "رمز خاص (!@#$%^&*)", signUpBtn: "إنشاء الحساب", signUpGoogle: "التسجيل بواسطة Google",
        mobileAlready: "لديك حساب بالفعل؟", logout: "تسجيل الخروج", settings: "إعدادات الحساب", profileName: "الاسم", profileDate: "تاريخ الانضمام",
        bio: "نبذة عني (Bio)", bioPlaceholder: "اكتب شيئاً عن نفسك...", saveChanges: "حفظ التعديلات", uploading: "جاري معالجة الصورة...", imgReady: "تم تجهيز الصورة، اضغط حفظ",
        newHabit: "أدخل عادة جديدة...", addHabit: "إضافة عادة", msgWelcomeBack: "مرحباً بعودتك!", msgUserNotFound: "البريد غير مسجل!", msgWrongPass: "كلمة المرور غير صحيحة!", msgAccCreated: "تم إنشاء الحساب بنجاح!", msgEmailInUse: "هذا البريد مستخدم بالفعل!", msgReqNotMet: "الرجاء استيفاء جميع شروط كلمة المرور!", msgGoogleNoAcc: "لا يوجد حساب مرتبط ببريد Google هذا.", msgGoogleSuccess: "تم تسجيل الدخول بنجاح!", msgGoogleAlready: "تم تسجيل دخولك بنجاح.", msgLoggedOut: "تم تسجيل الخروج بأمان.", msgHabitAdded: "تمت الإضافة بنجاح!", msgHabitRemoved: "تم الحذف", msgHabitUpdated: "تم التعديل بنجاح!", msgProfileUpdated: "تم تحديث الملف الشخصي!",
        leaderboardTitle: "لوحة النخبة", leaderboardSub: "أفضل المنجزين في التنافس على الطاعات",
        monthNames: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
    }
};

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

const userPointsDisplay = document.getElementById('userPointsDisplay');
const toggleLeaderboardBtn = document.getElementById('toggleLeaderboardBtn');
const leaderboardContainer = document.getElementById('leaderboardContainer');
const podiumContainer = document.getElementById('podiumContainer');
const leaderboardList = document.getElementById('leaderboardList');
const islamicReminderText = document.getElementById('islamicReminderText');

let signUpButton = document.getElementById("sign-up-button");
let signUpHolder = document.getElementById("signUpHolder");
let signIn = document.getElementById("sign-in");
let signUp = document.getElementById("sign-up");
let holderH1 = document.getElementById("holder-h1");
let holderH3 = document.getElementById("holder-h3");

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentRealMonth = currentDate.getMonth();
const currentRealDay = currentDate.getDate();

let habits = [];
let state = {};
let draggedIndex = null;
let currentUser = null;
let selectedLanguage = localStorage.getItem('elite_language');
let pendingPhotoURL = null; 
let userPoints = 0; 

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
    updateIslamicReminder();
    if (currentUser) {
        buildGrid(monthSelect.value || currentRealMonth);
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

btnLangEn.addEventListener('click', () => { localStorage.setItem('elite_language', 'en'); selectedLanguage = 'en'; routeApp(); });
btnLangAr.addEventListener('click', () => { localStorage.setItem('elite_language', 'ar'); selectedLanguage = 'ar'; routeApp(); });

// Profile & Modals
userProfileBtn.addEventListener('click', (e) => { e.stopPropagation(); profileDropdown.classList.toggle('show'); document.querySelector('.user-profile-container').classList.toggle('active'); });
document.addEventListener('click', (e) => { if (!profileDropdown.contains(e.target) && !userProfileBtn.contains(e.target)) { profileDropdown.classList.remove('show'); document.querySelector('.user-profile-container').classList.remove('active'); } });
openSettingsBtn.addEventListener('click', () => { settingsModal.style.display = 'flex'; });
closeModalBtn.addEventListener('click', () => { settingsModal.style.display = 'none'; });

toggleLeaderboardBtn.addEventListener('click', () => {
    const isShowing = leaderboardContainer.style.display === 'block';
    if (isShowing) {
        leaderboardContainer.style.display = 'none';
        document.querySelector('.tracker-container').style.display = 'block';
        document.querySelector('.add-habit-container').style.display = 'flex';
        currentDateDisplay.style.display = 'block';
        toggleLeaderboardBtn.classList.remove('active');
    } else {
        leaderboardContainer.style.display = 'block';
        document.querySelector('.tracker-container').style.display = 'none';
        document.querySelector('.add-habit-container').style.display = 'none';
        currentDateDisplay.style.display = 'none';
        toggleLeaderboardBtn.classList.add('active');
        fetchLeaderboard();
    }
});

// Authentication
auth.onAuthStateChanged(user => {
    if (user) {
        currentUser = user;
        selectedLanguage = localStorage.getItem('elite_language') || 'en';
        applyTranslations(selectedLanguage);
        languageContainer.style.display = 'none';
        authContainer.style.display = 'none';
        appContainer.style.display = 'flex';
        loadUserData();
    } else {
        currentUser = null; habits = []; state = {}; userPoints = 0;
        languageContainer.style.display = 'flex'; authContainer.style.display = 'none'; appContainer.style.display = 'none';
    }
});

loginBtn.addEventListener('click', () => { auth.signInWithEmailAndPassword(loginEmailInput.value, loginPasswordInput.value).then(() => showToast(i18n[selectedLanguage].msgWelcomeBack)).catch(error => showToast(error.message, 'error')); });
registerBtn.addEventListener('click', () => { auth.createUserWithEmailAndPassword(signUpEmailInput.value, signUpPasswordInput.value).then(() => showToast(i18n[selectedLanguage].msgAccCreated)).catch(error => showToast(error.message, 'error')); });
googleLoginBtn.addEventListener('click', () => { auth.signInWithPopup(googleProvider).then(() => showToast(i18n[selectedLanguage].msgGoogleSuccess)).catch((error) => showToast(error.message, 'error')); });
logoutBtn.addEventListener('click', () => { auth.signOut().then(() => showToast(i18n[selectedLanguage].msgLoggedOut)); });

// Data Management & Default Tasks
function loadUserData() {
    db.collection('users').doc(currentUser.uid).get().then(doc => {
        let finalName = currentUser.displayName || currentUser.email.split('@')[0];
        let finalPhoto = currentUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(finalName)}&background=d4af37&color=000&bold=true`;
        
        if (doc.exists) {
            const data = doc.data();
            habits = data.habits || [];
            state = data.state ? JSON.parse(data.state) : {};
            userPoints = data.points || 0;
        } else {
            // إضافة العادات الإسلامية الافتراضية للمستخدم الجديد
            habits = selectedLanguage === 'ar' ? [...defaultIslamicHabitsAR] : [...defaultIslamicHabitsEN];
            state = {};
            userPoints = 0;
            // تهيئة الشهر الحالي
            const daysInMonth = new Date(currentYear, currentRealMonth + 1, 0).getDate();
            state[currentRealMonth] = Array.from({ length: daysInMonth }, () => Array(habits.length).fill(false));
            saveUserData(); 
        }
        
        if (userPointsDisplay) userPointsDisplay.textContent = userPoints;
        document.getElementById('userAvatar').src = finalPhoto;
        document.getElementById('userNameDisplay').textContent = finalName;
        buildGrid(monthSelect.value || currentRealMonth);
    }).catch(error => console.log(error));
}

function saveUserData() {
    if (!currentUser) return;
    db.collection('users').doc(currentUser.uid).set({ 
        habits: habits, 
        state: JSON.stringify(state),
        points: userPoints 
    }, { merge: true }).catch(error => console.log(error));
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => { if (toast.parentElement) toast.remove(); }, 4000);
}

// المُذكّر الإسلامي (Islamic Reminder System)
function updateIslamicReminder() {
    const now = new Date();
    const hours = now.getHours();
    const isFriday = now.getDay() === 5;
    let text = "";

    if (isFriday) {
        text = selectedLanguage === 'ar' 
            ? "✨ جمعة مباركة: لا تنسَ قراءة سورة الكهف، والإكثار من الصلاة على النبي ﷺ، وساعة الاستجابة." 
            : "✨ Blessed Friday: Don't forget Surah Al-Kahf, sending blessings upon the Prophet, and the hour of response.";
    } else {
        if (hours >= 4 && hours < 11) {
            text = selectedLanguage === 'ar' ? "☀️ مُذكّر: هل قرأت أذكار الصباح؟ لا تنسَ صلاة الضحى (صلاة الأوابين)." : "☀️ Reminder: Did you read Morning Adhkar? Don't forget Duha prayer.";
        } else if (hours >= 11 && hours < 15) {
            text = selectedLanguage === 'ar' ? "🕌 مُذكّر: ﴿حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ﴾ - جدد نيتك." : "🕌 Reminder: Maintain your prayers strictly, especially the middle prayer.";
        } else if (hours >= 15 && hours < 19) {
            text = selectedLanguage === 'ar' ? "🌙 مُذكّر: حان وقت أذكار المساء، حصّن نفسك وعائلتك." : "🌙 Reminder: It's time for Evening Adhkar. Protect yourself with remembrance.";
        } else {
            text = selectedLanguage === 'ar' ? "🛏️ مُذكّر: سورة الملك تنجي من عذاب القبر، واختم يومك بركعة الوتر." : "🛏️ Reminder: Surah Al-Mulk protects you. End your day with Witr prayer.";
        }
    }
    if(islamicReminderText) islamicReminderText.textContent = text;
}

function checkTimeBasedToasts() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    
    // تذكير مرة واحدة عند الدقائق الصفرية
    if (m === 0) {
        if (h === 6) showToast(selectedLanguage === 'ar' ? "🌤️ حان الآن وقت أذكار الصباح" : "🌤️ Time for Morning Adhkar");
        if (h === 10) showToast(selectedLanguage === 'ar' ? "☀️ تذكير بصلاة الضحى صدقة عن مفاصلك" : "☀️ Reminder: Duha Prayer");
        if (h === 16) showToast(selectedLanguage === 'ar' ? "🌙 حان الآن وقت أذكار المساء" : "🌙 Time for Evening Adhkar");
        if (h === 22) showToast(selectedLanguage === 'ar' ? "✨ لا تنم قبل الوتر وسورة الملك" : "✨ Don't sleep before Witr & Al-Mulk");
    }
}

setInterval(() => {
    updateClock();
    updateIslamicReminder();
    checkTimeBasedToasts();
}, 60000); // تحديث كل دقيقة

function updateClock() {
    const now = new Date();
    liveClock.textContent = now.toLocaleTimeString('en-US', { hour12: true });
}
updateClock();
updateIslamicReminder();

function getMonthState(monthIndex, daysInMonth) {
    if (!state[monthIndex]) state[monthIndex] = Array.from({ length: daysInMonth }, () => Array(habits.length).fill(false));
    return state[monthIndex];
}

function calculateDayProgress(monthIndex, dayIndex) {
    if (habits.length === 0) return 0;
    const dayData = state[monthIndex][dayIndex];
    return Math.round((dayData.filter(Boolean).length / habits.length) * 100);
}
function calculateHabitProgress(monthIndex, hIndex, daysInMonth) {
    let completed = 0;
    for (let i = 0; i < daysInMonth; i++) { if (state[monthIndex][i][hIndex]) completed++; }
    return Math.round((completed / daysInMonth) * 100);
}

function deleteHabit(hIndex) { habits.splice(hIndex, 1); Object.keys(state).forEach(month => { state[month].forEach(dayArray => { dayArray.splice(hIndex, 1); }); }); showToast(i18n[selectedLanguage].msgHabitRemoved, 'error'); saveUserData(); buildGrid(monthSelect.value); }

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
        
        // تمييز يوم الجمعة
        const loopDate = new Date(currentYear, monthIndex, d + 1);
        if (loopDate.getDay() === 5) {
            numberDiv.classList.add('friday-highlight');
            numberDiv.title = selectedLanguage === 'ar' ? "يوم الجمعة" : "Friday";
        }
        
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

        const nameDiv = document.createElement('div');
        nameDiv.className = 'habit-name';
        
        const actionBtns = document.createElement('div');
        actionBtns.className = 'action-btns';
        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        delBtn.onclick = () => deleteHabit(hIndex);

        const nameSpan = document.createElement('span');
        nameSpan.className = 'habit-text-span';
        nameSpan.textContent = habit;

        actionBtns.appendChild(delBtn);
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

            const loopDate = new Date(currentYear, monthIndex, d + 1);
            if (loopDate.getDay() === 5) {
                checkbox.classList.add('friday-checkbox');
            }

            const dayNum = d + 1;
            const isToday = monthIndex === currentRealMonth && dayNum === currentRealDay;
            if (!isToday) checkbox.disabled = true;

            checkbox.addEventListener('change', (e) => {
                state[monthIndex][d][hIndex] = e.target.checked;
                if (e.target.checked) userPoints += 10;
                else userPoints = Math.max(0, userPoints - 10);
                
                if (userPointsDisplay) userPointsDisplay.textContent = userPoints;
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

    if (habits.length > 0) updateAllProgress(monthIndex, daysInMonth, statusElements, habitFills, habitTexts);
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
            statusDiv.innerHTML = percent === 0 ? '<span style="opacity:0.3;">-</span>' : '<span style="color:var(--text-muted);font-size:12px;">✓</span><div class="percent-text" style="color:var(--text-muted)">' + percent + '%</div>';
        } else {
            statusDiv.innerHTML = '';
        }
    }

    habits.forEach((_, hIndex) => {
        const percent = calculateHabitProgress(monthIndex, hIndex, daysInMonth);
        if(habitFills[hIndex]) { habitFills[hIndex].style.width = percent + '%'; habitTexts[hIndex].textContent = percent + '%'; }
    });
}

addHabitBtn.addEventListener('click', () => {
    const newHabit = newHabitInput.value.trim();
    if (newHabit) {
        habits.push(newHabit);
        Object.keys(state).forEach(month => state[month].forEach(dayArray => dayArray.push(false)));
        newHabitInput.value = ''; showToast(i18n[selectedLanguage].msgHabitAdded); saveUserData(); buildGrid(monthSelect.value);
    }
});
newHabitInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addHabitBtn.click(); });
monthSelect.addEventListener('change', function(e) { buildGrid(e.target.value); });

async function fetchLeaderboard() {
    podiumContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; width: 100%; padding: 20px;"><i class="fa-solid fa-spinner fa-spin" style="color: var(--primary-gold); font-size: 30px;"></i></div>';
    leaderboardList.innerHTML = '';
    try {
        const snapshot = await db.collection('users').orderBy('points', 'desc').limit(20).get();
        const users = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.points && data.points > 0) {
                users.push({
                    name: data.displayName || 'Elite Muslim',
                    photo: data.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.displayName || 'Muslim')}&background=d4af37&color=000&bold=true`,
                    points: data.points
                });
            }
        });
        podiumContainer.innerHTML = '';
        if (users.length === 0) { podiumContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center; width: 100%; padding: 20px;">كن أول المتنافسين في طاعة الله!</p>'; return; }
        const podiumUsers = [null, null, null]; 
        if (users[1]) podiumUsers[0] = { ...users[1], rank: 2 };
        if (users[0]) podiumUsers[1] = { ...users[0], rank: 1 };
        if (users[2]) podiumUsers[2] = { ...users[2], rank: 3 };

        podiumUsers.forEach(u => {
            if (!u) { const emptySpot = document.createElement('div'); emptySpot.className = 'podium-spot empty'; podiumContainer.appendChild(emptySpot); return; }
            const spot = document.createElement('div'); spot.className = `podium-spot rank-${u.rank}`;
            spot.innerHTML = `
                <img src="${u.photo}" class="podium-avatar" alt="${u.name}">
                <div class="podium-step">${u.rank}</div>
                <div class="podium-name">${u.name}</div>
                <div class="podium-points"><i class="fa-solid fa-star"></i> ${u.points}</div>`;
            podiumContainer.appendChild(spot);
        });

        for (let i = 3; i < users.length; i++) {
            const u = users[i];
            const row = document.createElement('div'); row.className = 'lb-row';
            row.innerHTML = `
                <div class="lb-user-info"><div class="lb-rank">#${i + 1}</div><img src="${u.photo}" class="lb-avatar"><div class="lb-name">${u.name}</div></div>
                <div class="lb-score"><i class="fa-solid fa-star"></i> ${u.points}</div>`;
            leaderboardList.appendChild(row);
        }
    } catch (error) { console.error("Error fetching leaderboard:", error); podiumContainer.innerHTML = '<p style="color: var(--danger); text-align: center; width: 100%;">Error loading leaderboard</p>'; }
}
