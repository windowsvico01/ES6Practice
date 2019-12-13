$(function(){
    const aaa = 231233;
    //const header = require('tpl/header/header.art');
    const header = window.TPL.header;
    const nav = window.TPL.nav;
    console.log(header)
    // console.log(header());
    $('#header').html(header({aa: 111}));
    console.log(nav());
    $('#nav').html(nav());
})