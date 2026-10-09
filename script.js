// ฟังก์ชันสำหรับเปิดรันหน้าเว็บ HTML ปกติใน iframe
function runProject(filePath, title) {
    const viewer = document.getElementById('viewer-container');
    const iframe = document.getElementById('project-frame');
    const video = document.getElementById('project-video');
    const titleElem = document.getElementById('current-project-title');

    if (viewer && iframe && titleElem) {
        // ซ่อนและหยุดเล่นวิดีโอ
        if (video) {
            video.pause();
            video.removeAttribute('src');
            video.classList.add('hidden');
        }

        // แสดง iframe และโหลด path
        iframe.classList.remove('hidden');
        iframe.src = filePath;
        titleElem.innerText = 'PREVIEW: ' + title;

        viewer.classList.remove('hidden');
        viewer.scrollIntoView({ behavior: 'smooth' });
    }
}

// ฟังก์ชันสำหรับเปิดรันคลิปวิดีโอ (Smart Office / ICE RUNNER)
function runVideo(videoPath, title) {
    const viewer = document.getElementById('viewer-container');
    const iframe = document.getElementById('project-frame');
    const video = document.getElementById('project-video');
    const titleElem = document.getElementById('current-project-title');

    if (viewer && video && titleElem) {
        // 1. ซ่อนและเคลียร์ iframe ของหน้าเว็บ
        if (iframe) {
            iframe.src = '';
            iframe.classList.add('hidden');
        }

        // 2. เคลียร์ค่าตัวเล่นเดิมก่อนเพื่อป้องกันแคชไฟล์ค้าง
        video.pause();
        video.removeAttribute('src');

        // 3. กำหนดพาธไฟล์ใหม่โดยตรงเข้าแท็ก video
        video.src = videoPath;
        video.classList.remove('hidden');
        video.load(); // สั่งให้เบราว์เซอร์เตรียมพร้อมและดึง metadata

        // 4. สั่งเล่นวิดีโอ (เริ่มต้นด้วยการเปิดเสียง หากเบราว์เซอร์บล็อกจะสลับมา Mute ให้อัตโนมัติ)
        video.muted = false;
        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise.catch((err) => {
                console.warn("เบราว์เซอร์บล็อก Autoplay แบบมีเสียง กำลังสลับเป็นโหมดปิดเสียงชั่วคราว:", err);
                video.muted = true;
                video.play().catch(e => {
                    console.log("กรุณากดปุ่ม Play บนจอเพื่อเล่นวิดีโอ:", e);
                });
            });
        }

        titleElem.innerText = 'VIDEO DEMO: ' + title;
        viewer.classList.remove('hidden');
        viewer.scrollIntoView({ behavior: 'smooth' });
    }
}

// ฟังก์ชันปิดหน้าต่างพรีวิว
function closeViewer() {
    const viewer = document.getElementById('viewer-container');
    const iframe = document.getElementById('project-frame');
    const video = document.getElementById('project-video');

    if (iframe) iframe.src = '';
    if (video) {
        video.pause();
        video.removeAttribute('src');
        video.classList.add('hidden');
    }
    if (viewer) viewer.classList.add('hidden');
}