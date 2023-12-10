let menu = document.querySelector("#menu-bar");
let navbar = document.querySelector(".navbar");
let header = document.querySelector(".header-2");
let scrollTop = document.querySelector(".scroll-top");

menu.addEventListener("click", () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
});

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");

  if (window.scrollY > 150) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }

  if (window.scrollY > 150) {
    scrollTop.style.display = "initial";
  } else {
    scrollTop.style.display = "none";
  }
};

var swiper = new Swiper(".home-slider", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    loop: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

let countDate = new Date("Januari 01, 2024 00:00:00").getTime();

function countDown() {
  let now = new Date().getTime();
  gap = countDate - now;

  let second = 1000;
  let minute = second * 60;
  let hour = minute * 60;
  let day = hour * 24;

  let d = Math.floor(gap / day);
  let h = Math.floor((gap % day) / hour);
  let m = Math.floor((gap % hour) / minute);
  let s = Math.floor((gap % minute) / second);

  document.getElementById("day").innerText = d;
  document.getElementById("hour").innerText = h;
  document.getElementById("minute").innerText = m;
  document.getElementById("second").innerText = s;
}

setInterval(function () {
  countDown();
}, 1000);

let sources = "product.json";

categoryMenu.onchange = function () {
  let selected = categoryMenu.value;
  console.log(selected);
  getData(selected);
};

function getData(selected) {
  let template = "";
  $.getJSON(sources).then(function (data) {
    let data_product = [];
    if (selected == "all") {
      data_product.push(...data.vegetables);
      data_product.push(...data.juices);
      data_product.push(...data.meats);
      data_product.push(...data.fruits);
    } else {
      data_product = data[selected];
    }
    console.log(data_product);

    data_product.forEach((item) => {
      template += `<div class="box">
                <div class="icons">
                    <a href="#" class="fas fa-heart"></a>
                    <a href="#" class="fas fa-share"></a>
                    <a href="#" class="fas fa-eye"></a>
                </div>
                <img src="${item.image}" alt="">
                <h3>${item.name}</h3>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <div class="price">${item.price}</div>
                <div class="quantity">
                    <span>quantity :</span>
                    <input type="number" min="1" max="1000" value="1">
                    <span> /kg </span>
                </div>
                <a href="#" class="btn">add to cart</a>
            </div>`;
    });

    baris_product.innerHTML = template;
  });
}

getData("all");
