document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("nameInput");
    const createBtn = document.getElementById("createBtn");
    const cardWrap = document.getElementById("cardWrap");
    const displayName = document.getElementById("displayName");
    const qrcodeEl = document.getElementById("qrcode");
    const downloadBtn = document.getElementById("downloadBtn");
    const newBtn = document.getElementById("newBtn");
    const shareButtons = document.getElementById("shareButtons");
    const shareTwitter = document.getElementById("shareTwitter");
    const shareFacebook = document.getElementById("shareFacebook");
    const shareInstagram = document.getElementById("shareInstagram");

    // 🎆 Uzun süreli konfeti efekti
    function burst() {
        const N = 250; // 🎊 Parçacık sayısı biraz arttı (daha yoğun görünüm)
        for (let i = 0; i < N; i++) {
            const s = document.createElement("span");
            s.style.position = "fixed";
            s.style.left = (Math.random() * window.innerWidth) + "px";
            s.style.top = (Math.random() * window.innerHeight / 2) + "px";
            s.style.width = s.style.height = (3 + Math.random() * 5) + "px";
            s.style.background = `hsl(${Math.random() * 360}, 90%, 60%)`;
            s.style.borderRadius = "50%";
            s.style.pointerEvents = "none";
            s.style.opacity = "0.9";
            s.style.zIndex = "9999";
            document.body.appendChild(s);

            let x = parseFloat(s.style.left);
            let y = parseFloat(s.style.top);
            let vx = (Math.random() - 0.5) * 5;     // yatay hız biraz azaltıldı, daha dengeli
            let vy = Math.random() * 1.5;           // dikey hız azaldı, daha yavaş düşüyor
            let gravity = 0.03 + Math.random() * 0.03; // düşüş daha yumuşak
            let life = 600 + Math.random() * 300;   // 🔥 ömür süresi arttı (600–900 frame ≈ 10–12sn)

            (function loop() {
                if (life-- < 0) { s.remove(); return; }
                vy += gravity;
                x += vx;
                y += vy;
                s.style.transform = `translate(${x}px, ${y}px) rotate(${life * 2}deg)`;
                s.style.opacity = Math.max(0, life / 900).toFixed(2);
                requestAnimationFrame(loop);
            })();
        }
    }


    // 🧾 Kart oluşturma
    createBtn.addEventListener("click", () => {
        const name = nameInput.value.trim();
        if (!name) return alert("Lütfen adını yaz 😊");

        cardWrap.classList.remove("hidden");
        displayName.textContent = name;
        qrcodeEl.innerHTML = "";

        // 🎯 Yönlendirilecek link 
        const link = "https://www.youtube.com/watch?v=Y5kz-5M9bWY";

        // 🔳 QR oluştur
        new QRCode(qrcodeEl, {
            text: link,
            width: 200,
            height: 200,
            colorDark: "#e30a17",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.M
        });

        burst();

        // 🌍 Paylaşım bağlantılarını ayarla
        const currentUrl = window.location.origin;
        const shareText = encodeURIComponent(`Cumhuriyetimizin 102. yılına özel dijital hatıramı oluşturdum! 🇹🇷`);
        const shareUrl = encodeURIComponent(currentUrl);

        shareTwitter.href = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
        shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        shareInstagram.href = `https://www.instagram.com/`;

        // Butonları göster
        shareButtons.classList.remove("hidden");

        setTimeout(() => window.scrollTo({ top: cardWrap.offsetTop - 20, behavior: "smooth" }), 100);
    });

    // 💾 PNG olarak indir
    downloadBtn.addEventListener("click", () => {
        const card = document.getElementById("hatira-card");

        html2canvas(card, {
            backgroundColor: null,
            scale: 3,
        }).then(canvas => {
            const link = document.createElement("a");
            link.download = `Cumhuriyet-Hatirasi-${displayName.textContent}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    });

    // 🔄 Yeni kart
    newBtn.addEventListener("click", () => {
        nameInput.value = "";
        cardWrap.classList.add("hidden");
        shareButtons.classList.add("hidden");
        nameInput.focus();
    });
});
