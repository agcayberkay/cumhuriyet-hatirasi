window.downloadCardAsImage = function () {
    const node = document.querySelector("#hatira-card");
    html2canvas(node, { scale: 2 }).then(canvas => {
        const a = document.createElement("a");
        a.download = "CumhuriyetHatirasi.png";
        a.href = canvas.toDataURL("image/png");
        a.click();
    });
}
