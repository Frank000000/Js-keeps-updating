   class Manager {
       constructor(data) {
           this.data = data;
           this.root = null;
       }
       init() {
           /* (1) 先根据数据来生成UI(数据渲染) */
           this.render();
           /* (2) 默认设置让电影和对应的列表显示(选中状态) */
           this.root.querySelector(".tab-list").children[0].className = "active";
           this.root.querySelector(".list").className = "list cur";

           /* (3) 给电影|电视|等标签注册事件监听 */
           this.addClickHandler();
           this.addMouseenterHandler(this.root.querySelector(".list").children)
       }
       render() {
           /* 创建外层的div标签 */
           this.root = document.createElement("div");
           this.root.className = "box";
           var html1 = `<h1>${this.data.title}</h1>`;

           // ["电影", "电视", "综艺", "动漫"]
           var tpl = this.data.types.map(function(ele) {
               return `<li class="">${ele}</li>`;
           }).join("");

           var html2 = `<div class="tab">
                 <ul class="tab-list">${tpl}</ul>
             </div>`;
           var html3 = "";
           this.data.data.forEach(function(item) {
               var html = item.map(function(ele) {
                   return `
             <li class="">
                 <p><span>${ele.index + 1}</span>${ele.name}</p>
                 <div class="content"><img src=${ele.src}>
                     <p>${ele.detail}</p>
                 </div>
             </li>`;
               }).join("");
               html3 += `<ul class="list">${html}</ul>`;
           });

           this.root.innerHTML = html1 + html2 + html3;
           document.body.appendChild(this.root);
       }
       addClickHandler() {
           var tabList = this.root.querySelector(".tab-list").children;
           var list = this.root.querySelectorAll(".list");
           var self = this;
           for (let i = 0, len = tabList.length; i < len; i++) {
               tabList[i].onclick = function() {
                   /* 001-设置当前标签为选中状态 */
                   Array.from(tabList).forEach((ele) => ele.classList.remove("active"));
                   this.classList.add("active");

                   /* 002-切换对应的列表 */
                   Array.from(list).forEach((ele) => ele.classList.remove("cur"));
                   list[i].classList.add("cur");

                   /* 获取当前列表中所有的li标签，给这些li标签添加鼠标移入事件 */
                   self.addMouseenterHandler(list[i].children);
               }
           }

       }
       addMouseenterHandler(eles) {
           /* 给标签都绑定事件，设置当前标签的样式为current,排它处理*/

           /* 001-先转换为数组，然后遍历数组 */
           Array.from(eles).forEach(function(ele) {
               /* 002-把每个标签都取出来添加鼠标移入事件 */
               ele.onmouseenter = function() {
                   /* 003-把所有li标签中的current样式移除 */
                   Array.from(eles).forEach((ele) => ele.classList.remove("current"));
                   /* 004-给当前自己添加current样式 */
                   this.classList.add("current");
               }
           })
       }
   }