javascript
// ==========================================
// 1. เปิดหน้าเว็บ HTML ใน iframe
// ==========================================
function runProject(filePath, title) {
    const viewer = document.getElementById('viewer-container');
    const iframe = document.getElementById('project-frame');
    const video = document.getElementById('project-video');
    const titleElem = document.getElementById('current-project-title');

    if (!viewer || !iframe || !titleElem) return;

    // หยุดวิดีโอเดิม
    if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
        video.classList.add('hidden');
    }

    // เปิดหน้าเว็บที่เลือก
    iframe.classList.remove('hidden');
    iframe.src = filePath;

    titleElem.innerText = 'PREVIEW: ' + title;
    viewer.classList.remove('hidden');
    viewer.scrollIntoView({ behavior: 'smooth' });
}


// ==========================================
// 2. เปิดวิดีโอจากไฟล์ในโปรเจกต์
//    เช่น ICE RUNNER
// ==========================================
function runVideo(videoPath, title) {
    const viewer = document.getElementById('viewer-container');
    const iframe = document.getElementById('project-frame');
    const video = document.getElementById('project-video');
    const titleElem = document.getElementById('current-project-title');

    if (!viewer || !video || !titleElem) return;

    // หยุด iframe เดิม
    if (iframe) {
        iframe.src = 'about:blank';
        iframe.classList.add('hidden');
    }

    // เตรียมวิดีโอใหม่
    video.pause();
    video.removeAttribute('src');
    video.load();

    video.src = videoPath;
    video.muted = false;
    video.controls = true;
    video.playsInline = true;
    video.classList.remove('hidden');

    titleElem.innerText = 'VIDEO DEMO: ' + title;
    viewer.classList.remove('hidden');
    viewer.scrollIntoView({ behavior: 'smooth' });

    // พยายามเล่นวิดีโอ
    video.load();

    video.play().catch((error) => {
        console.warn('ไม่สามารถเล่นอัตโนมัติได้ กรุณากด Play:', error);
    });
}


// ==========================================
// 3. เปิดวิดีโอ Smart Office จาก Google Drive
// ==========================================
function runDriveVideo(fileId, title) {
    const viewer = document.getElementById('viewer-container');
    const iframe = document.getElementById('project-frame');
    const video = document.getElementById('project-video');
    const titleElem = document.getElementById('current-project-title');

    if (!viewer || !iframe || !titleElem) return;

    // หยุดวิดีโอจากไฟล์ในเครื่อง
    if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
        video.classList.add('hidden');
    }

    // เปิดตัวเล่นของ Google Drive
    iframe.classList.remove('hidden');

    iframe.src =
        'https://drive.google.com/file/d/' +
        encodeURIComponent(fileId) +
        '/preview';

    titleElem.innerText = 'VIDEO DEMO: ' + title;

    viewer.classList.remove('hidden');
    viewer.scrollIntoView({ behavior: 'smooth' });
}


// ==========================================
// 4. ปิดหน้าต่างพรีวิวและหยุดการเล่น
// ==========================================
function closeViewer() {
    const viewer = document.getElementById('viewer-container');
    const iframe = document.getElementById('project-frame');
    const video = document.getElementById('project-video');

    // หยุดวิดีโอจาก Google Drive หรือหน้าเว็บ
    if (iframe) {
        iframe.src = 'about:blank';
        iframe.classList.add('hidden');
    }

    // หยุดวิดีโอในเครื่อง
    if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
        video.classList.add('hidden');
    }

    if (viewer) {
        viewer.classList.add('hidden');
    }
}