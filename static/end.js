
window.addEventListener("load", () => {
    confetti({
        particleCount: 1000,
        startVelocity: 100,
        spread: 180,
        origin: {
            x: 0 ,
            y: 1
        }
    });
    var score = sessionStorage.getItem("score");
    document.getElementById("final_score").textContent = "Final score: " + score;
});