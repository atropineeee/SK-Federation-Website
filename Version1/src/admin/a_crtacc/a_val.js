const m_crtbtn = document.querySelector('.m-add-user-crtbtn');

const xfni = document.getElementById('first-name');
const xlni = document.getElementById('last-name');
const xemi = document.getElementById('email');
const xsri = document.getElementById('select-role');

const xxer = document.querySelector('.m-add-user-err');

export let XFN, XLN, XEM, XSR;
export let XFNC, XLNC, XEMC, XSRC;

let MPFT = 3;
let MPFE = 7;

xfni.addEventListener('input', () => {
    snc();
    ckfni();
});

xlni.addEventListener('input', () => {
    snc();
    cklni();
});


xemi.addEventListener('input', () => {
    snc();
    ckemi();
});

xsri.addEventListener('change', () => {
    snc();
    cksri();
});

function snc() {
    XFN = xfni.value;
    XLN = xlni.value;
    XEM = xemi.value;
    XSR = xsri.value;
}

function ckfni() {
    if (containsNumbersOrSymbols(XFN)) {
        xxer.textContent = "First Name cannot contain any Number or Symbols!";
        XFNC = false;
        return;
    } else if (XFN.length < MPFT) {
        xxer.textContent = "Enter a Valid First Name!";
        XFNC = false;
        return;
    } else if (XFN == "") {
        xxer.textContent = "First Name cannot be Empty!";
        XFNC = false;
        return;
    }

    XFNC = true;
    xxer.textContent = "";
}

function cklni() {
    if (containsNumbersOrSymbols(XLN)) {
        xxer.textContent = "Last Name cannot contain any Number or Symbols!";
        XLNC = false;
        return;
    } else if (XLN.length < MPFT) {
        xxer.textContent = "Enter a Valid Last Name!";
        XLNC = false;
        return;
    } else if (XLN == "") {
        xxer.textContent = "Last Name cannot be Empty!";
        XLNC = false;
        return;
    }

    XLNC = true;
    xxer.textContent = "";
}

function ckemi() {
    if (containsSymbols(XEM)) {
        xxer.textContent = "Email cannot contain any Symbols!";
        XEMC = false;
        return
    } else if (XEM.length < MPFE) {
        xxer.textContent = "Enter a Valid Email!";
        XEMC = false;
        return;
    } else if (XEM == "") {
        xxer.textContent = "Email cannot be Empty!";
        XEMC = false;
        return;
    }

    XEMC = true;
    xxer.textContent = "";
}

function cksri() {
    if (XSR == "") { 
        XSRC = false;
        return;
    }

    XSRC = true;
}

function containsNumbersOrSymbols(str) 
{
    const regex = /[0-9!@#$%^&*()_+{}\[\]:;"'<>,.?~`\\|/]/;
    return regex.test(str);
}

function containsSymbols(str) {
    const symbolRegex = /[^a-zA-Z0-9]/;
    return symbolRegex.test(str);
}