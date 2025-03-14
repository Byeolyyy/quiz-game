console.log("🔥 fireworks.js 加载成功！");

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

// 画布大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 监听窗口大小变化
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// 粒子类（烟花粒子）
class Particle {
    constructor(x, y, color, velocity) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1; // 透明度
        this.size = Math.random() * 4 + 2;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.02; // 逐渐消失
    }
}

let fireworks = [];

function createFirework(x, y) {
    console.log("🎇 生成烟花！");
    const colors = ["red", "yellow", "blue", "green", "purple", "orange"];
    for (let i = 0; i < 50; i++) {
        const angle = (Math.PI * 2 * i) / 50;
        const speed = Math.random() * 3 + 2;
        fireworks.push(
            new Particle(x, y, colors[Math.floor(Math.random() * colors.length)], {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed,
            })
        );
    }
}

function animateFireworks() {
    requestAnimationFrame(animateFireworks);
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((particle, index) => {
        if (particle.alpha <= 0) {
            fireworks.splice(index, 1);
        } else {
            particle.update();
            particle.draw();
        }
    });
}

// **点击蛋糕后触发烟花**
function triggerFireworks() {
    console.log("🎆 triggerFireworks() 被调用！");
    let message = document.getElementById("birthday-message");
    let cake = document.getElementById("cake");

    // 在蛋糕附近生成烟花
    const rect = cake.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top - 50;

    for (let i = 0; i < 3; i++) {
        setTimeout(() => createFirework(x, y), i * 500);
    }

    // 1.5 秒后显示 "生日快乐，尧姐！"
    setTimeout(() => {
        message.classList.remove("hidden");
        message.classList.add("fade-in");
    }, 1500);
}

// 启动动画
animateFireworks();
