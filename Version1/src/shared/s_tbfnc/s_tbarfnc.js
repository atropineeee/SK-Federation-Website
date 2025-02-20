import { sncevt } from "../s_mngevt/s_sycevt.js";

const s_dbbtn = document.getElementById('m-ddp-btn-1');
const s_mevbtn = document.getElementById('m-ddp-btn-2');
const s_cevbtn = document.getElementById('m-ddp-btn-3');

const s_mevpnl = document.querySelector('.m-mng-event-container');
const s_cevpnl = document.querySelector('.m-crt-event-container');

const sss_dv = document.querySelector('.m-s-mng-event-ctn');

s_dbbtn.addEventListener('click', dbfnc);
s_mevbtn.addEventListener('click', mevfnc);
s_cevbtn.addEventListener('click', cevfnc);


function dbfnc() {
    s_dbbtn.classList.add('active');
    s_mevbtn.classList.remove('active');
    s_cevbtn.classList.remove('active');

    s_mevpnl.classList.remove('open');
    s_cevpnl.classList.remove('open');

    sss_dv.classList.remove('open');
}

function mevfnc() {
    s_dbbtn.classList.remove('active');
    s_mevbtn.classList.add('active');
    s_cevbtn.classList.remove('active');

    s_mevpnl.classList.add('open');
    s_cevpnl.classList.remove('open');

    sss_dv.classList.remove('open');
    sncevt();
}

function cevfnc() {
    s_dbbtn.classList.remove('active');
    s_mevbtn.classList.remove('active');
    s_cevbtn.classList.add('active');
    
    s_mevpnl.classList.remove('open');
    s_cevpnl.classList.add('open');

    sss_dv.classList.remove('open');
}