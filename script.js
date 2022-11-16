const mask = document.querySelector(".mask");
document.addEventListener('DOMContentLoaded', ()=> {
    mask.classList.add('hide');
    setTimeout(()=>{
        mask.remove();
    }, 600)

    const toggleBtn = document.querySelector(".toggleBtn");
    const menu = document.querySelector(".menu");

    // Menu animation
    const tlMenu = new TimelineMax({paused: true});
    tlMenu.to(".menu-icon", 0.6, {
        opacity: 0,
        rotation: 180
    })

    tlMenu.to(".close-icon", 0.6, {
        opacity: 1,
        rotation: 180
    }, "-=0.2")

    tlMenu.to(".menu", 0.3, {
        scale: 1,
    }, "-=0.2")

    tlMenu.from(".menu li", 0.35, {
        opacity: 0,
        x: -100,
        stagger: .25
    })

    tlMenu.reverse();


        //REVERSE MENU ANIMATION
        function reverseMenuAnimation() {
            tlMenu.reversed(!tlMenu.reversed());
            
        }
    
        toggleBtn.addEventListener("click", reverseMenuAnimation);
        // toggleBtn.addEventListener("mouseleave", () => {
        //     toggleBtn.style.width = "30px";
        //     toggleBtn.style.height = "30px";
        //     document.querySelector('.menu-icon').style.height = "15px";
        //     document.querySelector('.close-icon').style.height = "10px";
        //     toggleBtn.style.opacity = "0.6"
        // })
    
        menu.addEventListener('mouseleave', () => {
                if (!tlMenu.reversed()) reverseMenuAnimation()
            })


    //FRONT_PAGE ANIMATION
    gsap.from(".frontPage > *", 2, {
        opacity: 0,
        duration: 1.5, 
        stagger: 0.6
    })
    gsap.from(".toggleBtn", 1, {
        x: -150,
        y: -150,
        duration: 3.5,
        delay: 4.2, 
    })

    //Skills Timeline Animation
    let skillsTl = gsap.timeline({repeat: -1});
    function skillsAnimation(){
        gsap.set(".use", {autoAlpha: 1, delay: 4.2})
        skillsTl.from(".use span", {x: 80, opacity: 0, stagger: 1.5})
        .to(".use span", {x: -80, opacity: 0, stagger: 1.5}, 1.5)
    }
    skillsAnimation();


    

    // CERT ANIMATION
    const cert_buttons = document.querySelectorAll("[data-carousel-button]")

    cert_buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1
        const slides = button
        .closest("[data-carousel]")
        .querySelector("[data-slides]")

        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset
        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
    })
    })




    






    const tl = gsap.timeline({defaults: {duration: .6, ease: "power2.inOut"}})
    tl.from(".bg", {x: "-100%", opacity: 0})
    .from(".descr", {opacity: 0}, "-=0.3")
    .from("h2", {opacity: 0, y: "30px"}, "-=0.3")
    .from(".btn", {opacity: 0, y: "-40px"}, "-=0.8")

    // function to restart animation
    const animate = () => tl.restart()






    const slider = document.querySelector(".slider")


    let projectSlides = document.querySelectorAll(".box");
    const dots = document.querySelectorAll(".dot");

    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");

    prev.addEventListener("click", (n) => {
        plusSlides(-1);
        animate();
        

    })

    next.addEventListener("click", (n) => {
        plusSlides(1);
        animate();

        console.log(currentSlide)
    })

    

    let slideIndex = 1;
    showSlides(slideIndex);


    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {

        let i;

        if (n > projectSlides.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = projectSlides.length
        }

        for (i=0; i < projectSlides.length; i++) {
            projectSlides[i].style.display = "none"
        }

        for (i=0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
            dots[i].addEventListener("click", () => {

                // НЕ РАБОТАЕТ ПЕРЕКЛЮЧЕНИЕ slidов на DOTS
                currentSlide(slideIndex);
            })
        }

        projectSlides[slideIndex-1].style.display = "flex";
        dots[slideIndex-1].className += " active";
    }
})