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

// --- نظام الترجمة ---
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
        leaderboardTitle: "Elite Leaderboard", leaderboardSub: "The top performers of the elite journey",
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },
    ar: {
        appTitle: "إليت تراكر", welcomeBack: "مرحباً بعودتك", signInSub: "سجل الدخول لمتابعة رحلتك",
        email: "البريد الإلكتروني", password: "كلمة المرور", loginBtn: "تسجيل الدخول", أو: "أو", loginGoogle: "التسجيل بواسطة Google",
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
        leaderboardTitle: "لوحة النخبة", leaderboardSub: "أفضل المنجزين في رحلة إليت",
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

// عناصر لوحة الصدارة الجديدة (Leaderboard DOM)
const userPointsDisplay = document.getElementById('userPointsDisplay');
const toggleLeaderboardBtn = document.getElementById('toggleLeaderboardBtn');
const leaderboardContainer = document.getElementById('leaderboardContainer');
const podiumContainer = document.getElementById('podiumContainer');
const leaderboardList = document.getElementById('leaderboardList');

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
let userPoints = 0; // متغير النقاط العام

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

openSettingsBtn.addEventListener('click', () => { settingsModal.style.display = 'flex'; });
closeModalBtn.addEventListener('click', () => { settingsModal.style.display = 'none'; });
settingsModal.addEventListener('click', (e) => { if (e.target === settingsModal) settingsModal.style.display = 'none'; });

// التبديل بين الليدربورد والصفحة الرئيسية للتتبع
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

// Base64 Profile Image Compressor
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
                if (width > MAX_SIZE) {
                    height *= MAX_SIZE / width;
                    width = MAX_SIZE;
                }
            } else {
                if (height > MAX_SIZE) {
                    width *= MAX_SIZE / height;
                    height = MAX_SIZE;
                }
            }
            canvas.width = width;
            canvas.height = height;
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
            displayName: newName,
            photoURL: finalPhotoURL,
            bio: newBio
        }, { merge: true });
        
        document.getElementById('userNameDisplay').textContent = newName;
        document.getElementById('userAvatar').src = finalPhotoURL;
        showToast(i18n[selectedLanguage].msgProfileUpdated);
        settingsModal.style.display = 'none';
    } catch (error) {
        showToast(error.message, 'error');
    }
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
        selectedLanguage = localStorage.getItem('elite_language') || 'en';
        applyTranslations(selectedLanguage);
        
        languageContainer.style.display = 'none';
        authContainer.style.display = 'none';
        appContainer.style.display = 'flex';
        loadUserData();
    } else {
        currentUser = null;
        habits = [];
        state = {};
        pendingPhotoURL = null;
        userPoints = 0;
        languageContainer.style.display = 'flex';
        authContainer.style.display = 'none';
        appContainer.style.display = 'none';
    }
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
    if (!isPasswordValid) { showToast(i18n[selectedLanguage].msgReqNotMet, 'error'); return; }

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
                result.user.delete().then(() => { auth.signOut(); showToast(i18n[selectedLanguage].msgGoogleNoAcc, 'error'); });
            } else { showToast(i18n[selectedLanguage].msgGoogleSuccess); }
        }).catch((error) => showToast(error.message, 'error'));
});

googleSignUpBtn.addEventListener('click', () => {
    auth.signInWithPopup(googleProvider)
        .then((result) => {
            if (!result.additionalUserInfo.isNewUser) showToast(i18n[selectedLanguage].msgGoogleAlready);
            else showToast(i18n[selectedLanguage].msgAccCreated);
        }).catch((error) => showToast(error.message, 'error'));
});

logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => showToast(i18n[selectedLanguage].msgLoggedOut));
});

// Slider Elements
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

// Tracker Data Functions
function loadUserData() {
    db.collection('users').doc(currentUser.uid).get().then(doc => {
        let finalName = currentUser.displayName || currentUser.email.split('@')[0];
        let finalPhoto = currentUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(finalName)}&background=d4af37&color=000&bold=true`;
        let finalBio = "";

        if (doc.exists) {
            const data = doc.data();
            habits = data.habits || [];
            state = data.state ? JSON.parse(data.state) : {};
            if(data.displayName) finalName = data.displayName;
            if(data.photoURL) finalPhoto = data.photoURL;
            if(data.bio) finalBio = data.bio;
            userPoints = data.points || 0; // تحميل النقاط
        } else {
            habits = []; state = {};
            userPoints = 0;
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
            document.getElementById('modalDate').textContent = creationTime.toLocaleString(locale, {
                year: 'numeric', month: 'short', day: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
            });
        }
        buildGrid(monthSelect.value || currentRealMonth);
    }).catch(error => console.log(error));
}

function saveUserData() {
    if (!currentUser) return;
    db.collection('users').doc(currentUser.uid).set({ 
        habits: habits, 
        state: JSON.stringify(state),
        points: userPoints // حفظ النقاط الحالية
    }, { merge: true }).catch(error => console.log(error));
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
    if (!state[monthIndex]) state[monthIndex] = Array.from({ length: daysInMonth }, () => Array(habits.length).fill(false));
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

            // احتساب النقاط وإضافتها حياً (10 نقاط لكل علامة اختيار)
            checkbox.addEventListener('change', (e) => {
                state[monthIndex][d][hIndex] = e.target.checked;
                
                if (e.target.checked) {
                    userPoints += 10;
                } else {
                    userPoints = Math.max(0, userPoints - 10);
                }
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

// دالة جلب وعرض المتصدرين لبناء الـ Leaderboard الفخم
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
                    name: data.displayName || 'Elite User',
                    photo: data.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.displayName || 'Elite')}&background=d4af37&color=000&bold=true`,
                    points: data.points
                });
            }
        });

        podiumContainer.innerHTML = '';
        
        if (users.length === 0) {
            podiumContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center; width: 100%; padding: 20px;">No elite members yet. Be the first!</p>';
            return;
        }

        // توزيع المنصة بالترتيب البصري: الثاني (يسار)، الأول (منتصف)، الثالث (يمين)
        const podiumUsers = [null, null, null]; 
        if (users[1]) podiumUsers[0] = { ...users[1], rank: 2 };
        if (users[0]) podiumUsers[1] = { ...users[0], rank: 1 };
        if (users[2]) podiumUsers[2] = { ...users[2], rank: 3 };

        podiumUsers.forEach(u => {
            if (!u) {
                const emptySpot = document.createElement('div');
                emptySpot.className = 'podium-spot empty';
                podiumContainer.appendChild(emptySpot);
                return;
            }
            const spot = document.createElement('div');
            spot.className = `podium-spot rank-${u.rank}`;
            spot.innerHTML = `
                <img src="${u.photo}" class="podium-avatar" alt="${u.name}">
                <div class="podium-step">
                    ${u.rank}
                </div>
                <div class="podium-name">${u.name}</div>
                <div class="podium-points"><i class="fa-solid fa-star"></i> ${u.points}</div>
            `;
            podiumContainer.appendChild(spot);
        });

        // بقية الترتيب من المركز الـ 4 فما فوق
        for (let i = 3; i < users.length; i++) {
            const u = users[i];
            const row = document.createElement('div');
            row.className = 'lb-row';
            row.innerHTML = `
                <div class="lb-user-info">
                    <div class="lb-rank">#${i + 1}</div>
                    <img src="${u.photo}" class="lb-avatar" alt="${u.name}">
                    <div class="lb-name">${u.name}</div>
                </div>
                <div class="lb-score"><i class="fa-solid fa-star"></i> ${u.points}</div>
            `;
            leaderboardList.appendChild(row);
        }

    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        podiumContainer.innerHTML = '<p style="color: var(--danger); text-align: center; width: 100%;">Error loading leaderboard</p>';
    }
}