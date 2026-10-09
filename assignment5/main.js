// ========================================================
// Assignment 5: JavaScript Post and Reply
// ========================================================

// สร้างตัวแปรนับลำดับการโพสต์ชื่อว่า postCount และกำหนดค่าเริ่มต้นเป็น 0
let postCount = 0;

window.onload = setupFunction;

function setupFunction() {
    // 1. กำหนดชื่อหัวข้อของหน้าเว็บที่ id="top"
    document.getElementById("top").innerHTML = "Welcome to the Forum";

    // 2. ผูกฟังก์ชันเข้ากับปุ่ม Post และ Clear แบบ Unobtrusive
    document.getElementById("postButton").onclick = postFunction;
    document.getElementById("clearButton").onclick = clearFunction;
}

function postFunction() {
    // 1. อ่านค่าข้อความจาก textarea (id="message")
    let messageBox = document.getElementById("message");
    let text = messageBox.value;

    // เช็คว่ามีข้อความหรือไม่ (ถ้าเป็นช่องว่าง ไม่ต้องโพสต์)
    if (text.trim() === "") {
        alert("กรุณากรอกข้อความก่อนโพสต์ครับ");
        return;
    }

    // 2. นำข้อความไปใส่ในแต่ละกล่องตามลำดับ
    if (postCount === 0) {
        document.getElementById("topic").innerHTML = text;
        postCount++;
    } else if (postCount === 1) {
        document.getElementById("reply1").innerHTML = text;
        postCount++;
    } else if (postCount === 2) {
        document.getElementById("reply2").innerHTML = text;
        postCount++;
    } else {
        alert("กระทู้นี้โพสต์เต็มแล้ว (สามารถโพสต์ได้สูงสุด 3 ข้อความ กรุณากด Clear เพื่อเริ่มใหม่)");
    }

    // 3. เคลียร์ข้อความใน textarea ให้ว่างหลังจากโพสต์
    messageBox.value = "";
    messageBox.focus(); // ให้เคอร์เซอร์กลับไปกระพริบที่ช่องพิมพ์พร้อมใช้งานต่อ
}

function clearFunction() {
    // 1. ล้างข้อความใน id="topic", id="reply1", id="reply2"
    document.getElementById("topic").innerHTML = "";
    document.getElementById("reply1").innerHTML = "";
    document.getElementById("reply2").innerHTML = "";

    // 2. ล้างข้อความใน textarea (id="message")
    let messageBox = document.getElementById("message");
    if (messageBox) {
        messageBox.value = "";
    }

    // 3. รีเซ็ตตัวแปร postCount กลับเป็นค่าเริ่มต้น
    postCount = 0;
}