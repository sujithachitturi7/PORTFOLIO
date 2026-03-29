const nav = document.querySelector("nav");


const menuIcon = document.createElement("div");
menuIcon.innerHTML = '<i class="fa-solid fa-bars"></i>';
menuIcon.style.fontSize = "2.5rem";
menuIcon.style.cursor = "pointer";
menuIcon.style.display = "none";

document.querySelector("header").appendChild(menuIcon);

window.addEventListener("scroll", () => {
    let scrollTop = document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (scrollTop / height) * 100;

    document.getElementById("progressBar").style.width = scrolled + "%";
});
function handleResize() {
    if (window.innerWidth <= 995) {
        menuIcon.style.display = "block";
    } else {
        menuIcon.style.display = "none";
        nav.classList.remove("active");
    }
}
window.addEventListener("resize", handleResize);
handleResize();


menuIcon.addEventListener("click", () => {
    nav.classList.toggle("active");
});


document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        targetSection.scrollIntoView({
            behavior: "smooth"
        });

    
        nav.classList.remove("active");
    });
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


const revealElements = document.querySelectorAll(".section, .home");

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
}

revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    el.style.transition = "all 0.8s ease";
});

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


const hireBtn = document.getElementById("hireBtn");

hireBtn.addEventListener("click", () => {
    hireBtn.innerText = "Hire me!";
});
function sendMessage(event){
    event.preventDefault();
    document.getElementById("userName").value="";
    document.getElementById("userEmail").value="";
    document.getElementById("userMessage").value="";
    alert("Message sent successfully!");
    
}
document.querySelectorAll(".click").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
    });
});


document.querySelector(".logo").addEventListener("dblclick", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


const greeting = document.querySelector(".home-content h1");

const hour = new Date().getHours();

if (hour < 12) {
    greeting.innerHTML = "Good Morning, It's <span>Sujitha</span>";
} else if (hour < 18) {
    greeting.innerHTML = "Good Afternoon, It's <span>Sujitha</span>";
} else {
    greeting.innerHTML = "Good Evening, It's <span>Sujitha</span>";
}
