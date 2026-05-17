// تكوين Firebase الخاص بك
const firebaseConfig = {
    apiKey: "AIzaSyDiQAyW7xKXjkDP07KkP3w5Djd0r-yl55c",
    authDomain: "my-progress-4dd0b.firebaseapp.com",
    projectId: "my-progress-4dd0b",
    storageBucket: "my-progress-4dd0b.firebasestorage.app",
    messagingSenderId: "566611777787",
    appId: "1:566611777787:web:b2727bc9e47651edde385e",
    measurementId: "G-YFRCNQQMS1"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// قوالب الطاعات الإسلامية التلقائية للحسابات الجديدة
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

// نظام اللغات والترجمة
const i18n = {
    en: {
        appTitle: "Elite Tracker", welcomeBack: "Welcome Back", signInSub: "Sign in to continue your journey",
        email: "Email Address", password: "Password", loginBtn: "Login", or: "OR", loginGoogle: "Continue with Google",
        mobileCreate: "Create Account", sliderH1Unswitched: "Welcome To Elite!", sliderH3Unswitched: "If you are new here and don't know where to start, just sign up to start your journey!",
        sliderBtnUnswitched: "Create Account", sliderH1Switched: "Already have an account?", sliderH3Switched: "Sign-in to continue tracking your progress!",
        sliderBtnSwitched: "Sign In", createAcc: "Create Account", createAccSub: "Join us and start tracking",
        reqLength: "6 characters minimum", reqUpper: "Uppercase letter (A-Z)", reqLower: "Lowercase letter (a-z)",
        reqNumber: "Number (0-9)", reqSpecial: "Special character (!@#$%^&*)", signUpBtn: "Sign Up", signUpGoogle: "Continue with Google",
        mobileAlready: "Already have an account?", logout: "Logout", settings: "Account Settings", profileName: "Name", profileDate: "Joined On",
        bio: "Bio", bioPlaceholder: "Write something about yourself...", saveChanges: "Save Changes", uploading: "Processing image...", imgReady: "Image ready, click save",
        newHabit: "Enter new habit...", addHabit: "Add Habit", msgWelcomeBack: "Welcome back!", msgUserNotFound: "No account found with this email! Please create one.",
        msgWrongPass: "Incorrect password!", msgAccCreated: "Account created successfully!", msgEmailInUse: "Email already in use! Please login.",
        msgReqNotMet: "Please fulfill all password requirements (green checks) first!", msgGoogleNoAcc: "No account linked to this Google email. Please sign up first.",
        msgGoogleSuccess: "Google sign-in successful!", msgGoogleAlready: "Account already exists! Signed in successfully.", msgLoggedOut: "Logged out securely.",
        msgHabitAdded: "Habit cultivated successfully!", msgHabitRemoved: "Habit removed", msgHabitUpdated: "Habit updated successfully!", msgProfileUpdated: "Profile updated successfully!",
        leaderboardTitle: "Elite Leaderboard", leaderboardSub: "The top performers of the elite journey in obedience",
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },
    ar: {
        appTitle: "إليت تراكر", welcomeBack: "مرحباً بعودتك", signInSub: "سجل الدخول لمتابعة رحلتك",
        email: "البريد الإلكتروني", password: "كلمة المرور", loginBtn: "تسجيل الدخول", or: "أو", loginGoogle: "التسجيل بواسطة Google",
        mobileCreate: "إنشاء حساب", sliderH1Unswitched: "مرحباً بك في إليت!", sliderH3Unswitched: "إذا كنت جديداً هنا، فقط قم بإنشاء حساب لتبدأ رحلتك وتحقق أهدافك!",
        sliderBtnUnswitched: "إنشاء حساب", sliderH1Switched: "لديك حساب بالفعل؟", sliderH3Switched: "سجل الدخول لمتابعة تقدمك وعاداتك اليومية!",
        sliderBtnSwitched: "تسجيل الدخول", createAcc: "إنشاء حساب", createAccSub: "انضم إلينا وابدأ التتبع",
        reqLength: "6 أحرف على الأقل", reqUpper: "حرف إنجليزي كبير (A-Z)", reqLower: "حرف إنجليزي صغير (a-z)",
        reqNumber: "رقم (0-9)", reqSpecial: "رمز خاص (!@#$%^&*)", signUpBtn: "إنشاء الحساب", signUpGoogle: "التسجيل بواسطة Google",
        mobileAlready: "لديك حساب بالفعل؟", logout: "تسجيل الخروج", settings: "إعدادات الحساب", profileName: "الاسم", profileDate: "تاريخ الانضمام",
        bio: "نبذة عني (Bio)", bioPlaceholder: "اكتب شيئاً عن نفسك...", saveChanges: "حفظ التعديلات", uploading: "جاري معالجة الصورة...", imgReady: "تم تجهيز الصورة، اضغط حفظ",
        newHabit: "أدخل عادة جديدة...", addHabit: "إضافة عادة", msgWelcomeBack: "مرحباً بعودتك!", msgUserNotFound: "أنت لا تمتلك حساباً مسجلاً بهذا البريد! الرجاء إنشاء حساب جديد.",
        msgWrongPass: "كلمة المرور غير صحيحة!", msgAccCreated: "تم إنشاء الحساب بنجاح!", msgEmailInUse: "عفواً، أنت تمتلك حساباً بالفعل بهذا البريد! الرجاء تسجيل الدخول.",
        msgReqNotMet: "الرجاء استيفاء جميع شروط كلمة المرور الموضحة (علامات صح خضراء) أولاً!", msgGoogleNoAcc: "لا يوجد حساب مرتبط ببريد Google هذا! الرجاء إنشاء حساب جديد أولاً.",
        msgGoogleSuccess: "تم تسجيل الدخول بواسطة Google بنجاح!", msgGoogleAlready: "أنت تمتلك حساباً بالفعل مرتبطاً بـ Google هذا! تم تسجيل دخولك بنجاح.", msgLoggedOut: "تم تسجيل الخروج بأمان.",
        msgHabitAdded: "تمت إضافة العادة بنجاح!", msgHabitRemoved: "تم حذف العادة", msgHabitUpdated: "تم تعديل العادة بنجاح!", msgProfileUpdated: "تم تحديث الملف الشخصي بنجاح!",
        leaderboardTitle: "لوحة النخبة", leaderboardSub: "أفضل المنجزين في التنافس على الطاعات والعبادات",
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

// عناصر الليدربورد والمذكر والتنزيل الجديدة
const userPointsDisplay = document.getElementById('userPointsDisplay');
const toggleLeaderboardBtn = document.getElementById('toggleLeaderboardBtn');
const leaderboardContainer = document.getElementById('leaderboardContainer');
const podiumContainer = document.getElementById('podiumContainer');
const leaderboardList = document.getElementById('leaderboardList');
const islamicReminderText = document.getElementById('islamicReminderText');
const installAppBtn = document.getElementById('installAppBtn');

let signUpButton = document.getElementById("sign-up-button");
let signUpHolder = document.getElementById("signUpHolder");
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
let pendingPhotoURL = null; 
let userPoints = 0; 
let deferredPrompt;
let prayerTimings = null;

// --- دالة الترجمة وتوجيه الواجهات ---
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

// Profile Menu Click Action
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

openSettingsBtn.addEventListener('click', () => { settingsModal.style.display = 'flex'; });
closeModalBtn.addEventListener('click', () => { settingsModal.style.display = 'none'; });
settingsModal.addEventListener('click', (e) => { if (e.target === settingsModal) settingsModal.style.display = 'none'; });

// تبديل واجهة الليدربورد
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

// ضغط الصورة وحفظ الملف الشخصي بـ Base64 مجاناً
document.getElementById('avatarUpload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    showToast(i18n[selectedLanguage].uploading);
    document.getElementById('modalAvatar').style.opacity = '0.5';

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const MAX_SIZE = 250;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; }
            } else {
                if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }
            }
            canvas.width = width; canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            pendingPhotoURL = canvas.toDataURL('image/jpeg', 0.7);
            document.getElementById('modalAvatar').src = pendingPhotoURL;
            document.getElementById('modalAvatar').style.opacity = '1';
            showToast(i18n[selectedLanguage].imgReady);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

document.getElementById('saveProfileBtn').addEventListener('click', async () => {
    const newName = document.getElementById('modalNameInput').value.trim();
    const newBio = document.getElementById('modalBioInput').value.trim();
    const finalPhotoURL = pendingPhotoURL || document.getElementById('modalAvatar').src;
    
    try {
        await currentUser.updateProfile({ displayName: newName, photoURL: finalPhotoURL });
        await db.collection('users').doc(currentUser.uid).set({
            displayName: newName, photoURL: finalPhotoURL, bio: newBio
        }, { merge: true });
        
        document.getElementById('userNameDisplay').textContent = newName;
        document.getElementById('userAvatar').src = finalPhotoURL;
        showToast(i18n[selectedLanguage].msgProfileUpdated);
        settingsModal.style.display = 'none';
    } catch (error) {
        showToast(error.message, 'error');
    }
});

// Password Requirements
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
        const input = this.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text'; this.classList.replace('fa-eye-slash', 'fa-eye');
        } else {
            input.type = 'password'; this.classList.replace('fa-eye', 'fa-eye-slash');
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
    if (isValid) { icon.className = 'fa-solid fa-check req-valid'; element.classList.add('valid-text'); }
    else { icon.className = 'fa-solid fa-xmark req-invalid'; element.classList.remove('valid-text'); }
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

// Authentication Listeners
auth.onAuthStateChanged(user => {
    if (user) {
        currentUser = user;
        selectedLanguage = localStorage.getItem('elite_language') || 'en';
        applyTranslations(selectedLanguage);
        routeApp();
        loadUserData();
    } else {
        currentUser = null; habits = []; state = {}; userPoints = 0;
        routeApp();
    }
});

loginBtn.addEventListener('click', () => { auth.signInWithEmailAndPassword(loginEmailInput.value, loginPasswordInput.value).then(() => showToast(i18n[selectedLanguage].msgWelcomeBack)).catch(error => showToast(error.message, 'error')); });
registerBtn.addEventListener('click', () => { if (!isPasswordValid) return showToast(i18n[selectedLanguage].msgReqNotMet, 'error'); auth.createUserWithEmailAndPassword(signUpEmailInput.value, signUpPasswordInput.value).then(() => showToast(i18n[selectedLanguage].msgAccCreated)).catch(error => showToast(error.message, 'error')); });
googleLoginBtn.addEventListener('click', () => { auth.signInWithPopup(googleProvider).catch(err => showToast(err.message, 'error')); });
googleSignUpBtn.addEventListener('click', () => { auth.signInWithPopup(googleProvider).catch(err => showToast(err.message, 'error')); });
logoutBtn.addEventListener('click', () => { auth.signOut().then(() => showToast(i18n[selectedLanguage].msgLoggedOut)); });

// Slider Actions
signUpButton.addEventListener("click", function () {
    signUpHolder.classList.toggle("switched");
    signUpHolder.classList.toggle("unswitched");
    signIn.classList.toggle("hidden");
    signUp.classList.toggle("hidden");
    updateSliderText(); 
});
mobileSignUp.addEventListener("click", () => { signIn.classList.add("hidden"); setTimeout(() => { signIn.style.display = "none"; signUp.style.display = "flex"; setTimeout(() => signUp.classList.remove("hidden"), 50); }, 300); });
mobileSignIn.addEventListener("click", () => { signUp.classList.add("hidden"); setTimeout(() => { signUp.style.display = "none"; signIn.style.display = "flex"; setTimeout(() => signIn.classList.remove("hidden"), 50); }, 300); });

// --- إدارة البيانات ونظام النقاط الإسلامي ---
function loadUserData() {
    db.collection('users').doc(currentUser.uid).get().then(doc => {
        let finalName = currentUser.displayName || currentUser.email.split('@')[0];
        let finalPhoto = currentUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(finalName)}&background=d4af37&color=000&bold=true`;
        let finalBio = "";

        if (doc.exists) {
            const data = doc.data();
            habits = data.habits || [];
            state = data.state ? JSON.parse(data.state) : {};
            userPoints = data.points || 0;
            if(data.displayName) finalName = data.displayName;
            if(data.photoURL) finalPhoto = data.photoURL;
            if(data.bio) finalBio = data.bio;
        } else {
            // تزويد المستخدم الجديد بالطاعات الإسلامية الأساسية تلقائياً تلقائياً
            habits = selectedLanguage === 'ar' ? [...defaultIslamicHabitsAR] : [...defaultIslamicHabitsEN];
            state = {}; userPoints = 0;
            const daysInMonth = new Date(currentYear, currentRealMonth + 1, 0).getDate();
            state[currentRealMonth] = Array.from({ length: daysInMonth }, () => Array(habits.length).fill(false));
            saveUserData();
        }
        
        if (userPointsDisplay) userPointsDisplay.textContent = userPoints;
        document.getElementById('userAvatar').src = finalPhoto;
        document.getElementById('userNameDisplay').textContent = finalName;
        document.getElementById('modalAvatar').src = finalPhoto;
        document.getElementById('modalNameInput').value = finalName;
        document.getElementById('modalBioInput').value = finalBio;
        
        if(currentUser.metadata && currentUser.metadata.creationTime) {
            const creationTime = new Date(currentUser.metadata.creationTime);
            const locale = selectedLanguage === 'ar' ? 'ar-EG' : 'en-US';
            document.getElementById('modalDate').textContent = creationTime.toLocaleString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
        }
        buildGrid(monthSelect.value || currentRealMonth);
    }).catch(error => console.log(error));
}

function saveUserData() {
    if (!currentUser) return;
    db.collection('users').doc(currentUser.uid).set({ 
        habits: habits, state: JSON.stringify(state), points: userPoints 
    }, { merge: true }).catch(error => console.log(error));
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`; toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => { if (toast.parentElement) toast.remove(); }, 4000);
}

// --- نظام المذكر والاشعارات الذكية ووقت الاذان الحقيقي ---
function updateIslamicReminder() {
    const now = new Date(); const hours = now.getHours(); const isFriday = now.getDay() === 5;
    let text = "";
    if (isFriday) {
        text = selectedLanguage === 'ar' ? "✨ جمعة مباركة: قراءة سورة الكهف، كثرة الصلاة على النبي ﷺ، وساعة الاستجابة." : "✨ Blessed Friday: Read Surah Al-Kahf, multiply blessings upon the Prophet ﷺ, and seek the hour of response.";
    } else {
        if (hours >= 4 && hours < 11) text = selectedLanguage === 'ar' ? "☀️ مُذكّر: أذكار الصباح حصنك، ولا تنسَ صلاة الضحى صدقة عن مفاصلك." : "☀️ Reminder: Read Morning Adhkar, and perform Duha prayer.";
        else if (hours >= 11 && hours < 15) text = selectedLanguage === 'ar' ? "🕌 مُذكّر: صلاة الظهر في وقتها تجارة لن تبور وعماد دينك." : "🕌 Reminder: Pray Dhuhr on time, it's the pillar of your faith.";
        else if (hours >= 15 && hours < 19) text = selectedLanguage === 'ar' ? "🌙 مُذكّر: حان وقت أذكار المساء لتُحفظ بحفظ الله حتى تصبح." : "🌙 Reminder: It is time for Evening Adhkar to be protected by Allah.";
        else text = selectedLanguage === 'ar' ? "🛏️ مُذكّر: اقرأ سورة الملك المنجية قبل النوم واختم يومك بالوتر." : "🛏️ Reminder: Read Surah Al-Mulk before sleeping and end your day with Witr.";
    }
    if(islamicReminderText) islamicReminderText.textContent = text;
}

function checkTimeBasedToasts() {
    const now = new Date(); const h = now.getHours(); const m = now.getMinutes();
    if (m === 0) {
        if (h === 6) showToast(selectedLanguage === 'ar' ? "🌤️ حان وقت أذكار الصباح" : "🌤️ Time for Morning Adhkar");
        if (h === 10) showToast(selectedLanguage === 'ar' ? "☀️ صلاة الضحى | صلاة الأوابين" : "☀️ Duha Prayer Reminder");
        if (h === 16) showToast(selectedLanguage === 'ar' ? "🌙 حان وقت أذكار المساء" : "🌙 Time for Evening Adhkar");
        if (h === 22) showToast(selectedLanguage === 'ar' ? "✨ لا تنم قبل الوتر وسورة الملك" : "✨ Read Surah Al-Mulk & Witr");
    }
}

function fetchPrayerTimes() {
    fetch('https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=5')
        .then(res => res.json()).then(data => { prayerTimings = data.data.timings; }).catch(e => console.log(e));
}

function checkPrayerReminders() {
    if (!prayerTimings) return;
    const now = new Date();
    const currentHHMM = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    const prayers = { 'Fajr': 'الفجر', 'Dhuhr': 'الظهر', 'Asr': 'العصر', 'Maghrib': 'المغرب', 'Isha': 'العشاء' };

    for (const [key, name] of Object.entries(prayers)) {
        if (prayerTimings[key] === currentHHMM) {
            const label = selectedLanguage === 'ar' ? `🕌 حان الآن موعد أذان ${name}` : `🕌 Time for ${key} prayer`;
            showToast(label, 'success');
            if (Notification.permission === "granted") {
                new Notification(selectedLanguage === 'ar' ? "إليت الإسلامي" : "Elite Islamic", { body: label, icon: "https://cdn-icons-png.flaticon.com/512/2362/2362892.png" });
            }
        }
    }
}

// طلب صلاحية الإشعارات
if ("Notification" in window && Notification.permission === "default") { Notification.requestPermission(); }

// العداد المشغل للمواقيت والكل أوتوماتيكياً
setInterval(() => {
    const now = new Date(); liveClock.textContent = now.toLocaleTimeString('en-US', { hour12: true });
    const secs = now.getSeconds();
    if(secs === 0) { updateIslamicReminder(); checkTimeBasedToasts(); checkPrayerReminders(); }
}, 1000);
fetchPrayerTimes();

// --- نظام بناء جدول المربعات والتتبع التفاعلي ---
function getMonthState(monthIndex, daysInMonth) {
    if (!state[monthIndex]) state[monthIndex] = Array.from({ length: daysInMonth }, () => Array(habits.length).fill(false));
    return state[monthIndex];
}
function calculateDayProgress(monthIndex, dayIndex) {
    if (habits.length === 0) return 0;
    return Math.round((state[monthIndex][dayIndex].filter(Boolean).length / habits.length) * 100);
}
function calculateHabitProgress(monthIndex, hIndex, daysInMonth) {
    let comp = 0; for (let i = 0; i < daysInMonth; i++) { if (state[monthIndex][i][hIndex]) comp++; }
    return Math.round((comp / daysInMonth) * 100);
}
function deleteHabit(hIndex) { habits.splice(hIndex, 1); Object.keys(state).forEach(m => state[m].forEach(d => d.splice(hIndex, 1))); showToast(i18n[selectedLanguage].msgHabitRemoved, 'error'); saveUserData(); buildGrid(monthSelect.value); }

function buildGrid(monthIndex) {
    trackerWrapper.innerHTML = ''; monthIndex = parseInt(monthIndex);
    const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
    getMonthState(monthIndex, daysInMonth);
    currentDateDisplay.textContent = `${i18n[selectedLanguage].monthNames[monthIndex]} ${currentYear}`;

    const headerRow = document.createElement('div'); headerRow.className = 'row header-row';
    const emptyCorner = document.createElement('div'); emptyCorner.className = 'habit-name';
    headerRow.appendChild(emptyCorner);

    const daysGrid = document.createElement('div'); daysGrid.className = 'grid-container';
    const statusElements = [];

    for (let d = 0; d < daysInMonth; d++) {
        const column = document.createElement('div'); column.className = 'column';
        const statusDiv = document.createElement('div'); statusDiv.className = 'day-status'; statusElements.push(statusDiv);
        const numberDiv = document.createElement('div'); numberDiv.className = 'day-number'; numberDiv.textContent = d + 1;
        
        // تلوين وتمييز أيام الجمعة باللون الزمردي الإسلامي الفخم
        if (new Date(currentYear, monthIndex, d + 1).getDay() === 5) { numberDiv.classList.add('friday-highlight'); }
        if (d + 1 === currentRealDay && monthIndex === currentRealMonth) { numberDiv.classList.add('today-highlight'); }
        
        column.appendChild(statusDiv); column.appendChild(numberDiv); daysGrid.appendChild(column);
    }
    headerRow.appendChild(daysGrid);
    const dummy = document.createElement('div'); dummy.className = 'progress-section'; dummy.style.visibility = 'hidden';
    dummy.innerHTML = '<div class="progress-bar-container"></div><div class="percentage-text">0%</div>';
    headerRow.appendChild(dummy); trackerWrapper.appendChild(headerRow);

    const habitFills = []; const habitTexts = [];

    habits.forEach((habit, hIndex) => {
        const row = document.createElement('div'); row.className = 'row habit-row';
        const nameDiv = document.createElement('div'); nameDiv.className = 'habit-name';
        const actionBtns = document.createElement('div'); actionBtns.className = 'action-btns';
        const delBtn = document.createElement('button'); delBtn.className = 'delete-btn'; delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        delBtn.onclick = () => deleteHabit(hIndex);
        
        const nameSpan = document.createElement('span'); nameSpan.className = 'habit-text-span'; nameSpan.textContent = habit;
        actionBtns.appendChild(delBtn); nameDiv.appendChild(actionBtns); nameDiv.appendChild(nameSpan); row.appendChild(nameDiv);

        const checksGrid = document.createElement('div'); checksGrid.className = 'grid-container';

        for (let d = 0; d < daysInMonth; d++) {
            const column = document.createElement('div'); column.className = 'column';
            const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.className = 'day-checkbox';
            checkbox.checked = state[monthIndex][d][hIndex] || false;

            if (new Date(currentYear, monthIndex, d + 1).getDay() === 5) { checkbox.classList.add('friday-checkbox'); }
            if (!(monthIndex === currentRealMonth && (d + 1) === currentRealDay)) { checkbox.disabled = true; }

            // احتساب النقاط (+10 عند الصح و -10 عند الإلغاء) لمنع الغش والتنافس العادل
            checkbox.addEventListener('change', (e) => {
                state[monthIndex][d][hIndex] = e.target.checked;
                if (e.target.checked) userPoints += 10;
                else userPoints = Math.max(0, userPoints - 10);
                
                if (userPointsDisplay) userPointsDisplay.textContent = userPoints;
                updateAllProgress(monthIndex, daysInMonth, statusElements, habitFills, habitTexts);
                saveUserData();
            });
            column.appendChild(checkbox); checksGrid.appendChild(column);
        }
        row.appendChild(checksGrid);

        const progressSection = document.createElement('div'); progressSection.className = 'progress-section';
        const barContainer = document.createElement('div'); barContainer.className = 'progress-bar-container';
        const fill = document.createElement('div'); fill.className = 'progress-fill'; habitFills.push(fill);
        const text = document.createElement('div'); text.className = 'percentage-text'; text.textContent = '0%'; habitTexts.push(text);

        barContainer.appendChild(fill); progressSection.appendChild(barContainer); progressSection.appendChild(text);
        row.appendChild(progressSection); trackerWrapper.appendChild(row);
    });
    if (habits.length > 0) updateAllProgress(monthIndex, daysInMonth, statusElements, habitFills, habitTexts);
}

function updateAllProgress(monthIndex, daysInMonth, statusElements, habitFills, habitTexts) {
    if (habits.length === 0) return;
    for (let d = 0; d < daysInMonth; d++) {
        const isPast = monthIndex < currentRealMonth || (monthIndex === currentRealMonth && (d + 1) < currentRealDay);
        const isToday = monthIndex === currentRealMonth && (d + 1) === currentRealDay;
        const percent = calculateDayProgress(monthIndex, d);
        const statusDiv = statusElements[d];
        if (isToday) statusDiv.innerHTML = `<span style="color:var(--primary-gold);font-size:16px;">✦</span><div class="percent-text">${percent}%</div>`;
        else if (isPast) statusDiv.innerHTML = percent === 0 ? '<span style="opacity:0.3;">-</span>' : `<span style="color:var(--text-muted);font-size:12px;">✓</span><div class="percent-text" style="color:var(--text-muted)">${percent}%</div>`;
        else statusDiv.innerHTML = '';
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
        Object.keys(state).forEach(m => state[m].forEach(d => d.push(false)));
        newHabitInput.value = ''; showToast(i18n[selectedLanguage].msgHabitAdded); saveUserData(); buildGrid(monthSelect.value);
    }
});
newHabitInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addHabitBtn.click(); });
monthSelect.addEventListener('change', (e) => buildGrid(e.target.value));

// --- جلب ومعالجة لوحة صدارة المتنافسين ---
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
        if (users.length === 0) { podiumContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center; width: 100%; padding: 20px;">سارع لتكون أول المتصدرين في الطاعات!</p>'; return; }
        
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
            const u = users[i]; const row = document.createElement('div'); row.className = 'lb-row';
            row.innerHTML = `
                <div class="lb-user-info"><div class="lb-rank">#${i + 1}</div><img src="${u.photo}" class="lb-avatar"><div class="lb-name">${u.name}</div></div>
                <div class="lb-score"><i class="fa-solid fa-star"></i> ${u.points}</div>`;
            leaderboardList.appendChild(row);
        }
    } catch (e) { podiumContainer.innerHTML = '<p style="color: var(--danger); text-align: center; width: 100%;">خطأ في تحميل لوحة الصدارة</p>'; }
}

// --- نظام تحميل وتثبيت الموقع كتطبيق PWA على الهاتف ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(err => console.log('SW Registration Failed', err));
    });
}
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); deferredPrompt = e;
    if (installAppBtn) installAppBtn.style.display = 'flex'; // إظهار زر التنزيل تلقائياً
});
if (installAppBtn) {
    installAppBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') installAppBtn.style.display = 'none';
            deferredPrompt = null;
        }
    });
}