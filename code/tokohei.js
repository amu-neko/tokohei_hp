'use strict'
//header-fix
'use strict'

window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;

    // PC版のヘッダー表示制御
    const pcheader = document.getElementById('pc-header');
    const top = document.getElementById('top');
    if (top && pcheader) {
        const topBottom = top.offsetTop + top.offsetHeight;
        if (scrollY >= topBottom) {
            pcheader.classList.add('fixed');
        } else {
            pcheader.classList.remove('fixed');
        }
    }

    // モバイル版のヘッダー表示制御
    const mbheader = document.getElementById('mb-header');
    const topMb = document.getElementById('top-mb');
    if (topMb && mbheader) {
        const topMbBottom = topMb.offsetTop + topMb.offsetHeight;
        if (scrollY >= topMbBottom) {
            mbheader.classList.add('fixed-mb');
            mbheader.style.opacity = '1'; // 表示する
        } else {
            mbheader.classList.remove('fixed-mb');
            mbheader.style.opacity = '0'; // 非表示に戻す
        }
    }
});

//hanburger
$(function () {
  $('#js-hamburger-menu, .navigation__link').on('click', function () {
    $('.navigation').slideToggle(500)
    $('.hamburger-menu').toggleClass('hamburger-menu--open')
  });
});

//現在の年月の取得
let now=new Date();
let currentYear=now.getFullYear();
let currentMonth=now.getMonth();

//カレンダーの作成
function createCalender(year,month){    //(year,month)でで取得した年月の情報をfunction createCalenderに渡す
    const title=document.getElementById("title");
    const calender =document.getElementById("calender");    //HTMLから要素を取得

    title.textContent= `${year}.${month+1}`;    //カレンダーのタイトル

    //曜日
    const day=["日","月","火","水","木","金","土"];
    let html = "<tr>";  //HTMLに追加する用の入れ物 行の生成
    for (let weekdays of day){  //weekdaysはdayからひとつずつ取り出すものとする
        html += `<th>${weekdays}</th>`; //行の中身の生成
    }
    html +="</tr>"; //行閉じる

    //日付

    let isToday=year===now.getFullYear() && month === now.getMonth();
    const firstDay=new Date(year,month,1).getDay(); //月初めの曜日を取得
    const lastDate=new Date(year,month+1,0).getDate() //次の月の０日の日付（月末）の日付を取得
    let date =1
    for(let i=0;i<6 ; i++){
        html +="<tr>"
        for(let j=0;j<7;j++){
            if(i===0 && j<firstDay){
                html+="<td></td>";  //１日より前の時空白のマスを作る
            }else if(date > lastDate){
                html +="<td></td>";  //月末より後に空白のマスを作る
            }else{
                let className="";
                if(isToday&&date===now.getDate()) className+="today";
                html += `<td data-date="${date}" class="${className.trim()}">${date}</td>`; 
                date++;
            }
        }
        html +="</tr>";
        if(date > lastDate) break;  //月末を超えたら終わり
       
      
    }
    calender.innerHTML=html; //htmlに埋め込み

    //日付クリック
    const tdCell=calender.querySelectorAll("td[data-date]"); //日付を取得
    tdCell.forEach(td =>{
        td.addEventListener("click",()=>{
            const clickedDate =td.getAttribute("data-date");    //date-dateの値を文字列にして取得
            alert(`${year}年${month+1}月${clickedDate}日です`);
        });
        });
 }
    
    //前後ろ
    document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("prev").addEventListener("click", () => {
    currentMonth--;
    // 1月を超えたら12月に
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--; // 年を変える
    }
    createCalender(currentYear, currentMonth);
        });
});
  document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("next").addEventListener("click", () => {
    currentMonth++;
    // 12月を超えたら1月に
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++; // 年を変える
    }
    createCalender(currentYear, currentMonth);
    });
});

 //slide

const slide = document.getElementById('slide');
const prev = document.getElementById('slide-prev');
const next = document.getElementById('slide-next');
const indicator = document.getElementById('indicator');
const lists = document.querySelectorAll('.list');
const totalSlides = lists.length;
let count = 0;
let autoPlayInterval;
function updateListBackground() {
  for (let i = 0; i < lists.length; i++) {
    lists[i].style.backgroundColor = i === count % totalSlides ? '#28385E' : '#cccccc';
  }
}
function nextClick() {
  slide.classList.remove(`slide${count % totalSlides + 1}`);
  count++;
  slide.classList.add(`slide${count % totalSlides + 1}`);
  updateListBackground();
}
function prevClick() {
  slide.classList.remove(`slide${count % totalSlides + 1}`);
  count--;
  if (count < 0) count = totalSlides - 1;
  slide.classList.add(`slide${count % totalSlides + 1}`);
  updateListBackground();
}
function startAutoPlay() {
  autoPlayInterval = setInterval(nextClick, 3000);
}
function resetAutoPlayInterval() {
  clearInterval(autoPlayInterval);
  startAutoPlay();
}
    next.addEventListener('click', () => {
  nextClick();
  resetAutoPlayInterval();
    });
prev.addEventListener('click', () => {
  prevClick();
  resetAutoPlayInterval();
});
indicator.addEventListener('click', (event) => {
  if (event.target.classList.contains('list')) {
    const index = Array.from(lists).indexOf(event.target);
    slide.classList.remove(`slide${count % totalSlides + 1}`);
    count = index;
    slide.classList.add(`slide${count % totalSlides + 1}`);
    updateListBackground();
    resetAutoPlayInterval();
  }
});
startAutoPlay();