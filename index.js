var cz_subject = ['语文', '数学', '英语', '物理', '化学', '生物', '思想品德', '历史', '地理', '音乐', '体育与健康', '美术', '信息技术', '历史与社会', '科学', '心理健康教育', '日语', '俄语']
var gz_subject = ['语文', '数学', '英语', '物理', '化学', '生物', '思想政治', '历史', '地理', '音乐', '体育与健康', '美术', '信息技术', '通用技术', '心理健康教育', '日语', '俄语']

var exam_item = [
    ['101-综合素质 (幼儿园)', '102-保教知识与能力 (幼儿园)'],
    ['201-综合素质 (中学)', '202-教育教学知识与能力 (中学)', '学科知识与教学能力'],
    ['301-综合素质 (中学)', '302-教育知识与能力 (中学)', '学科知识与教学能力']
]
var examArr = [];
window.onload = function () {

    // year
    var curYear = new Date().getFullYear();
    var selectYear = document.getElementById('year');
    selectYear.innerHTML = `<option value="">请选择</option>`
    for (var i = curYear; i > curYear - 11; i--) {
        selectYear.innerHTML += `<option value="` + i + `">` + i + `</option>`;
    }

    // 友情链接弹出列表
    var linkList1 = document.getElementsByClassName("hasLinkList")[0];
    linkList1.onclick = function (e) {
        e.preventDefault();
        var linkList = document.getElementsByClassName("linkList")[0];
        console.log(linkList.style.display);
        linkList.style.display = (linkList.style.display !== "block") ? "block" : "none";
    }

    // 按学段划分科目
    var level = document.getElementById('level');
    var subject = document.getElementById('subject');
    var score = document.getElementById('scoreDiv');
    subject.disabled = "disabled";
    score.innerHTML = "";
    exam_item[0].forEach((v, i) => score.innerHTML += (v + `: <input type="text" class="score"><br>`));
    level.onchange = function () {
        var selectedIndex = this.selectedIndex;
        var value = this.options[selectedIndex].value;
        subject.disabled = "disabled";
        if (value == "初中") {
            subject.innerHTML = `<option value="">请选择</option>`;
            cz_subject.forEach(i => subject.innerHTML += `<option value="` + i + `">` + i + `</option>`)


            subject.disabled = null

        } else if (value == "高中") {
            subject.innerHTML = `<option value="">请选择</option>`;
            gz_subject.forEach(i => subject.innerHTML += `<option value="` + i + `">` + i + `</option>`)

            subject.disabled = null
        } else {
            score.innerHTML = "";
            exam_item[0].forEach((v, i) => {
                examArr.push(v);
                score.innerHTML += (v + `: <input type="text" class="score">
            <br>`)
            });
            console.log(examArr)
        }
    }
    // 学科选择后
    subject.onchange = function () {
        var curSubIndex = this.selectedIndex;
        
        var selected = level.options[level.selectedIndex].value
        var curSub = this.options[curSubIndex].value
        if(selected=="高中"){
            curSub= "4"+curSubIndex+"-"+curSub
        }else if(selected=="初中"){
            curSub= "3"+curSubIndex+"-"+curSub
        }
        if (selected == "初中") {
            score.innerHTML = "";
            exam_item[2].forEach((v, i) => {
                if (i == 2) {
                    examArr.push(curSub + " " + v);
                    score.innerHTML += (curSub + "" + v + `: <input type="text" class="score">
                <br>`)
                } else {
                    examArr.push(v);
                    score.innerHTML += (v + `: <input type="text" class="score">
                <br>`)
                }
            })
        } else if (selected == "高中") {
            score.innerHTML = "";
            exam_item[2].forEach((v, i) => {
                    if (i == 2) {
                        examArr.push(curSub + " " + v);
                        score.innerHTML += (curSub + " " + v + `: <input type="text" class="score">
                <br>`)
                    } else {
                        examArr.push(v);
                        score.innerHTML += (v + `: <input type="text" class="score">
                <br>`)
                    }
                }

            )
        }

    }

    //提交信息 
    var btn = document.getElementById('btn');
    btn.onclick = function () {
        // 收集信息
        // 姓名
        var name = document.getElementById('name').value;
        var nameSlot = document.getElementById('nameSlot');
        nameSlot.innerText = name;
        // 身份证
        var idcard = document.getElementById('idcard').value;
        var idcardSlot = document.getElementById('idcardSlot');
        idcardSlot.innerText = idcard;
        // 准考证
        var zkcard = "51"
        for (var i = 1; i <= 13; i++) {
            zkcard += ("" + Math.floor(Math.random() * 10));
        }
        // 学段
        var level = getSelectedValue(document.getElementById('level'));
        // 科目
        var subject = getSelectedValue(document.getElementById('subject'));
        // 年
        var year = getSelectedValue(document.getElementById('year'));
        // 上下
        var updown = getSelectedValue(document.getElementById('updown'));
        // 成绩
        var score = document.getElementsByClassName('score')
        var scoreArr = [];
        for (var i = 0; i < score.length; i++) {
            scoreArr.push(score[i].value);
        }
        // 省份
        var province = getSelectedValue(document.getElementById('province'));

        //console.log(name,idcard,zkcard,level,subject,year,updown,scoreArr);

        var inputBox = document.getElementsByClassName('input')[0];
        inputBox.style.display = "none";

        var table = document.getElementsByTagName('tbody')[0];

        if (level == "高中") {
            exam_item
        }
        console.log(examArr)
        // table 必须有tbody
        for (var i = 0; i < scoreArr.length, i < examArr.length; i++) {
            
            table.innerHTML +=
                `
            <tr>
            <td>` + examArr[i] + `</td>
            <td class="zh_score">` + scoreArr[i] + `</td>
            <td class="zh_valid"><span>` + (parseInt(scoreArr[i]) >= 70 ? "合格" : "不合格") + `</span></td>
            <td class="zh_id">` + zkcard + `</td>
            <td class="zh_time">` + year + `年` + updown + `半年</td>
            <td class="zh_valid_time">` + (parseInt(year) + 2) + `年` + updown + `半年</td>
            <td class="zh_province">` + province + `</td>
            </tr>`
        }
    }
}

function getSelectedValue(obj) {
    var index = 0;
    try {
        index = obj.selectedIndex;
        return obj.options[obj.selectedIndex].value
    } catch (err) {
        return ""
    }

}