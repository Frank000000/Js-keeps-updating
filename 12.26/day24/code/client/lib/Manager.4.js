class Manager {
    constructor(data) {
        this.data = data;
        this.root = null;
        this.sliderBoxItemWidth = 700;
        this.index = 0;
        this.timer = null;
        this.sliderBox = null;
        this.len = this.data.length;
    }
    init() {
        this.renderUI();
        this.setEleStyle();
        // this.autoPlayer();
        // this.eventMouseHandler();
        this.eventClickHandler();
        this.eventClickWithSliderNav();
    }
    renderUI() {
        this.root = document.createElement("div");
        this.root.classList.add("slider");
        let tpl1 = this.data.map((ele, index) => `<li class="slider-box-item">${index + 1}</li>`).join("");
        let html1 = `<ul class="slider-box">${tpl1}</ul>`;
        let html2 = `<div class="slider-control"><span class="prev">&lt;</span> <span class="next">&gt;</span></div>`;
        let tpl2 = this.data.map((ele, index) => `<li class="slider-nav-item ${index == 0 ? "active" :""}">${index + 1}</li>`).join("");
        let html3 = `<ol class="slider-nav">${tpl2}</ol>`;
        this.root.innerHTML = html1 + html2 + html3;
        document.body.appendChild(this.root);
        this.sliderBox = this.root.querySelector(".slider-box");
        this.sliderNav = this.root.querySelector(".slider-nav");
    }
    getRandomColor() {
        let r = parseInt(Math.random() * 256);
        let g = parseInt(Math.random() * 256);
        let b = parseInt(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
    }
    setEleStyle() {
        let lis = this.root.querySelectorAll(".slider-box-item");
        Array.from(lis).forEach(ele => ele.style.background = this.getRandomColor());
    }
    autoPlayer() {
        /* 核心：定时器 + 设置ul标签的样式(left) */
        this.timer = setInterval(() => this.next(), 2000);
    }
    eventMouseHandler() {
        /* 思路：获取标签，给标签添加鼠标移入事件，当鼠标移入的时候停止定时器，当鼠标离开的时候要重新恢复 */
        this.root.onmouseenter = () => clearInterval(this.timer);
        this.root.onmouseleave = () => this.autoPlayer();
    }
    eventClickHandler() {
        let sliderControl = this.root.querySelector(".slider-control");
        sliderControl.onclick = (e) => {
            e = e || window.event;
            let target = e.target || e.srcElement;
            if (target.className == "prev") {
                this.prev();
            } else if (target.className == "next") {
                this.next();
            }
        }
    }
    next() {
        this.index++;
        if (this.index == this.len) {
            this.index = 0;
        }
        this.sliderBox.style.left = -this.index * this.sliderBoxItemWidth + "px";
        this.switchNavItem();
    }
    prev() {
        this.index--;
        if (this.index == -1) {
            this.index = this.len - 1;
        }
        this.sliderBox.style.left = -this.index * this.sliderBoxItemWidth + "px";
        this.switchNavItem();
    }
    eventClickWithSliderNav() {

        /* 思路：先获取标签，添加点击事件，设置选中状态(排他) + 切换显示对应的滑块 */
        Array.from(this.sliderNav.children).forEach((ele, index) => {

            ele.onclick = () => {
                /* 更新当前的索引 */
                this.index = index;
                /* 切换显示对应的滑块 */
                this.sliderBox.style.left = -this.index * this.sliderBoxItemWidth + "px";

                this.switchNavItem();

                // Array.from(this.sliderNav.children).forEach((ele => ele.classList.remove("active")));
                // this.sliderNav.children[this.index].classList.add("active");
                // this.classList.add("active");
                // console.log(self.sliderNav.children[self.index], this, "___");

            }
        });
    }
    switchNavItem() {
        Array.from(this.sliderNav.children).forEach((ele => ele.classList.remove("active")));
        this.sliderNav.children[this.index].classList.add("active");
    }
}