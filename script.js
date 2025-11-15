// Don't CRY - พื้นหลังสีดำ - เวอร์ชันสะอาด

// ป้องกัน F12, Context Menu, และการดูโค้ด
(function() {
    // ป้องกัน Right Click
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // ป้องกัน F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === 123 || // F12
            (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
            (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
            (e.ctrlKey && e.keyCode === 85)) { // Ctrl+U
            e.preventDefault();
            return false;
        }
    });
    
    // ตรวจจับการเปิด DevTools
    const devtools = /./;
    devtools.toString = function() {
        this.opened = true;
    };
    const checkDevTools = setInterval(function() {
        console.log('%c', devtools);
        console.clear();
    }, 1000);
})();

document.addEventListener('DOMContentLoaded', function() {
    let popupCount = 0;
    // ตรวจสอบว่าเพิ่มใช้ GPU acceleration หรือไม่
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    const maxPopups = isMobile ? 150 : 300;
    let lastUrlOpenTime = 0;
    const urlCooldown = 600000; // 10 นาที = 600000 มิลลิวินาที
    
    // รายการข้อความแบบสุ่ม
    const messages = [
        { first: "Don't", second: "CRY" },
        { first: "Don't", second: "LOOK" },
        { first: "Don't", second: "MOVE" },
        { first: "Can't", second: "STOP" },
        { first: "HELP", second: "ME" },
        { first: "WHY", second: "ME?" },
        { first: "I'M", second: "HERE" },
        { first: "LOOK", second: "AT ME" },
        { first: "DON'T", second: "SPEAK" },
        { first: "I", second: "CAN'T" },
        { first: "STOP", second: "IT" },
        { first: "HELP", second: "ME?" },
        { first: "WHERE", second: "AM I" },
        { first: "LOOK", second: "HERE" },
        { first: "DON'T", second: "GO" },
        { first: "STAY", second: "HERE" }
    ];
    
    const fileNames = ['about:blank', 'localhost:70...', 'untitled', 'localhost:70', 'localhost:7090...'];
    const animations = ['', '', '', '', '', '']; // ไม่มี animation พิเศษ
    const popupTypes = ['glitch', 'header']; // สองแบบ: glitch กับ header
    
    function getRandomAnimation() {
        return ''; // ไม่ใส่ class animation
    }
    
    function getRandomPopupType() {
        return popupTypes[Math.floor(Math.random() * popupTypes.length)];
    }
    
    function createPopup() {
        if (popupCount >= maxPopups) {
            // ลบ popup เก่าทีละน้อย เพื่อให้มี popup ใหม่ขึ้นเรื่อยๆ
            const oldPopups = document.querySelectorAll('.popup-container');
            const deleteThreshold = isMobile ? 120 : 250;
            const deleteCount = isMobile ? 15 : 20;
            
            if (oldPopups.length > deleteThreshold) {
                // ลบ popup เก่า
                for (let i = 0; i < deleteCount; i++) {
                    if (oldPopups[i]) {
                        oldPopups[i].style.opacity = '0';
                        oldPopups[i].style.transition = 'opacity 0.3s';
                        setTimeout(() => {
                            if (oldPopups[i]) oldPopups[i].remove();
                        }, 300);
                    }
                }
                popupCount -= deleteCount;
            } else {
                // ถ้ายังไม่ถึง threshold ก็ลบเลยเพื่อให้มี popup ใหม่
                if (oldPopups[0]) {
                    oldPopups[0].style.opacity = '0';
                    oldPopups[0].style.transition = 'opacity 0.2s';
                    setTimeout(() => {
                        if (oldPopups[0]) oldPopups[0].remove();
                    }, 200);
                }
                popupCount -= 1;
            }
            return;
        }
        
        popupCount++;
        
        const popupContainer = document.createElement('div');
        popupContainer.className = 'popup-container';
        popupContainer.id = 'popup-' + popupCount;
        
        // สุ่มตำแหน่งและขนาด - แสดงทั่วทั้งหน้าจอรวมขอบ
        let randomX = Math.random() * window.innerWidth - 100;
        let randomY = Math.random() * window.innerHeight - 75;
        
        // ให้แน่ใจว่า popup อยู่ในหน้าจอ (แต่ให้ไปถึงขอบได้)
        if (randomX < -50) randomX = -50;
        if (randomY < -50) randomY = -50;
        if (randomX > window.innerWidth - 50) randomX = window.innerWidth - 50;
        if (randomY > window.innerHeight - 50) randomY = window.innerHeight - 50;
        
        const randomScale = 0.6 + Math.random() * 0.6;
        
        // สุ่มข้อความและ animation
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const randomFileName = fileNames[Math.floor(Math.random() * fileNames.length)];
        const randomAnim = getRandomAnimation();
        const popupType = getRandomPopupType();
        
        // ไม่ปรับตำแหน่ง - popup แสดงตรงที่สุ่ม
        
        // สร้าง HTML ตามประเภท popup
        if (popupType === 'header') {
            // แบบมี header bar ธรรมดา
            popupContainer.innerHTML = `
                <div class="popup popup-header-style ${randomAnim}" style="transform: scale(${randomScale})">
                    <div class="popup-header">
                        <div class="popup-controls">
                            <div class="control red"></div>
                            <div class="control yellow"></div>
                            <div class="control green"></div>
                        </div>
                        <div class="popup-url">${randomFileName}</div>
                    </div>
                    <div class="popup-content-normal">
                        <div class="normal-text">${randomMessage.first}</div>
                        <div class="normal-text">${randomMessage.second}</div>
                    </div>
                </div>
            `;
        } else {
            // แบบ glitch (เดิม)
            popupContainer.innerHTML = `
                <div class="popup ${randomAnim}" style="transform: scale(${randomScale})">
                    <div class="popup-header">
                        <div class="popup-controls">
                            <div class="control red"></div>
                            <div class="control yellow"></div>
                            <div class="control green"></div>
                        </div>
                        <div class="popup-url">${randomFileName}</div>
                    </div>
                    <div class="popup-content">
                        <div class="dont-text">${randomMessage.first}</div>
                        <div class="cry-text">${randomMessage.second}</div>
                    </div>
                </div>
            `;
        }
        
        popupContainer.style.position = 'fixed';
        popupContainer.style.left = randomX + 'px';
        popupContainer.style.top = randomY + 'px';
        popupContainer.style.zIndex = 9999 + (popupCount % 1000);
        
        document.body.appendChild(popupContainer);
        
        // เพิ่ม click event บน popup ทั้งหมด
        popupContainer.style.cursor = 'pointer';
        popupContainer.addEventListener('click', function(e) {
            const now = Date.now();
            const timeSinceLastOpen = now - lastUrlOpenTime;
            
            if (timeSinceLastOpen >= urlCooldown) {
                // เปิด URL ได้
                window.open('https://www.instagram.com/whatvidentit/', '_blank');
                lastUrlOpenTime = now;
                
                // แสดงข้อความว่าเปิดแล้ว
                const urlBar = popupContainer.querySelector('.popup-url');
                if (urlBar) {
                    const originalText = urlBar.textContent;
                    urlBar.textContent = 'opened!';
                    setTimeout(() => {
                        urlBar.textContent = originalText;
                    }, 1000);
                }
                
                // สร้าง popup เพิ่มเมื่อเปิด URL สำเร็จ
                if (popupCount % 4 === 0) {
                    for (let i = 0; i < 6; i++) {
                        setTimeout(createPopup, i * 50);
                    }
                }
            } else {
                // ยังเปิดไม่ได้ แสดงเวลาที่เหลือ
                const remainingTime = Math.ceil((urlCooldown - timeSinceLastOpen) / 60000);
                const urlBar = popupContainer.querySelector('.popup-url');
                if (urlBar) {
                    const originalText = urlBar.textContent;
                    urlBar.textContent = `wait ${remainingTime}m`;
                    setTimeout(() => {
                        urlBar.textContent = originalText;
                    }, 2000);
                }
                
                // ยังสร้าง popup เพิ่มได้ตามปกติแม้ยังไม่ถึงเวลา
                if (popupCount % 4 === 0) {
                    for (let i = 0; i < 3; i++) {
                        setTimeout(createPopup, i * 50);
                    }
                }
            }
        });
    }
    
    // สร้านง popup เริ่มต้น - เร็วทั้งคอมและมือถือ
    const initialPopups = isMobile ? 60 : 80;
    const initialDelay = 20;
    for (let i = 0; i < initialPopups; i++) {
        setTimeout(createPopup, i * initialDelay);
    }
    
    // โหมดไวรัสต่อเนื่อง - เร็วเท่ากัน
    function virusMode() {
        const virusCount = isMobile ? 7 : 10;
        for (let i = 0; i < virusCount; i++) {
            createPopup();
        }
        const virusDelay = isMobile ? 450 : 400;
        setTimeout(virusMode, virusDelay);
    }
    
    setTimeout(virusMode, 800);
    
    // สร้าง popup อัตโนมัติหลายชั้น - เร็วเท่ากัน
    const autoCount = isMobile ? 3 : 4;
    const autoInterval = isMobile ? 400 : 350;
    setInterval(() => {
        for (let i = 0; i < autoCount; i++) {
            createPopup();
        }
    }, autoInterval);
    
    // ไม่มี Rain mode - ใช้แค่ popup ไวรัสธรรมดา
    
    // Event listeners - เปิด touch บนมือถือ
    let lastMouseMove = 0;
    if (!isMobile) {
        document.addEventListener('mousemove', function() {
            const now = Date.now();
            if (now - lastMouseMove > 120) {
                lastMouseMove = now;
                if (Math.random() < 0.65) {
                    for (let i = 0; i < 3; i++) {
                        createPopup();
                    }
                }
            }
        });
    }
    
    // Touch event สำหรับมือถือ
    let lastTouch = 0;
    if (isMobile) {
        document.addEventListener('touchmove', function() {
            const now = Date.now();
            if (now - lastTouch > 200) {
                lastTouch = now;
                if (Math.random() < 0.5) {
                    for (let i = 0; i < 2; i++) {
                        createPopup();
                    }
                }
            }
        });
    }
    
    document.addEventListener('click', function() {
        const clickCount = isMobile ? 5 : 8;
        for (let i = 0; i < clickCount; i++) {
            setTimeout(createPopup, i * 25);
        }
    });
    
    document.addEventListener('keydown', function(e) {
        const keyCount = isMobile ? 4 : 6;
        for (let i = 0; i < keyCount; i++) {
            createPopup();
        }
        e.preventDefault();
    });
    
    // Resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const existingPopups = document.querySelectorAll('.popup-container');
            existingPopups.forEach((popup) => {
                let newX = Math.random() * window.innerWidth - 100;
                let newY = Math.random() * window.innerHeight - 75;
                if (newX < -50) newX = -50;
                if (newY < -50) newY = -50;
                if (newX > window.innerWidth - 50) newX = window.innerWidth - 50;
                if (newY > window.innerHeight - 50) newY = window.innerHeight - 50;
                popup.style.left = newX + 'px';
                popup.style.top = newY + 'px';
            });
            
            for (let i = 0; i < 8; i++) {
                setTimeout(createPopup, i * 100);
            }
        }, 100);
    });
    
    // ป้องกันการปิด
    window.addEventListener('beforeunload', function(e) {
        for (let i = 0; i < 12; i++) {
            createPopup();
        }
        e.preventDefault();
        return 'Don\'t leave me!';
    });
    
    // ตรวจสอบและเติม popup ทุก 2.5 วินาที
    setInterval(() => {
        const currentPopupCount = document.querySelectorAll('.popup-container').length;
        if (currentPopupCount < 100) {
            for (let i = 0; i < 12; i++) {
                createPopup();
            }
        }
    }, 2500);
});
