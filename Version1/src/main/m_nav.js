const m_dbtn = document.querySelector('.m-tbar-button');
const m_cnts = document.querySelector('.m-tbar-contents');
const m_icns = document.querySelector('.m-tbar-button i');

const m_sbtn = document.querySelector('.m-tbar-side-button');
const m_sbtcnts = document.querySelector('.m-tbar-side-container');
const m_sbticns = document.querySelector('.m-tbar-side-button i');

m_dbtn.addEventListener('click', ftx);
m_sbtn.addEventListener('click', fxt);

// Top Panel
function ftx() {
    m_cnts.classList.toggle('close');
    m_icns.classList.toggle('close');
}

// Side Panel
function fxt() {
    m_sbtcnts.classList.toggle('open');
    m_sbticns.classList.toggle('open');
}

// Notification
const m_ntfbtn = document.querySelector('.m-tbar-side-ntf');

// Messages
const m_msgbtn = document.querySelector('.m-tbar-side-msg');

// Settings
const m_stnbtn = document.querySelector('.m-tbar-side-stn');