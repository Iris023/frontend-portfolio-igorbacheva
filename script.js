const mask = document.querySelector(".mask");
document.addEventListener('DOMContentLoaded', ()=> {
    mask.classList.add('hide');
    setTimeout(()=>{
        mask.remove();
    }, 600)


    window.addEventListener('scroll', reveal);
    function reveal() {
        let reveals = document.querySelectorAll(".reveal");
        for(let i=0; i< reveals.length; i++) {
            let windowHeight = window.innerHeight;
            let revealTop = reveals[i].getBoundingClientRect().top;
            let revealPoint = 150;

            if (revealTop < windowHeight - revealPoint) {
                reveals[i].classList.add( 'triggered')
            }
            else {
                reveals[i].classList.remove( 'triggered')
            }
        }
    }


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
    gsap.from(".about > *", 2, {
        opacity: 0,
        duration: 1.5, 
        stagger: 0.6
    })
    gsap.to(".toggleBtn", 1, {
        x: 0,
        y: 0,
        duration: .5,
        delay: 4.2,
        opacity: 1 
    })


    // if (window.innerWidth <= 1024){ 

    //     gsap.to(".first", {
    //         delay: .5,
    //         opacity: 1,
    //         duration: 2.5,
    //         scrollTrigger: {
    //             triiger: ".first",
    //             start: "top center"
    //         }
    //     })
    //     gsap.to(".second", {
    //         delay: .5,
    //         opacity: 1,
    //         duration: 2.5,
    //         scrollTrigger: {
    //             triiger: ".second",
    //             start: "top center"
    //         }
    //     })
    //     gsap.to(".third", {
    //         delay: .5,
    //         opacity: 1,
    //         duration: 2.5,
    //         scrollTrigger: {
    //             triiger: ".third",
    //             start: "top center"
    //         }
    //     })    
    // }


    let skillsTl = gsap.timeline({repeat: -1});
    function skillsAnimation(){
        gsap.set(".use", {autoAlpha: 1, delay: 4.2})
        skillsTl.from(".use span", {x: 80, opacity: 0, stagger: 1.5})
        .to(".use span", {x: -80, opacity: 0, stagger: 1.5}, 1.5)
    }
    skillsAnimation();




    //CERTIFICATES SLIDER
    setInterval(showCertSlides, 5000);
    const cert_prev_btn = document.querySelector(".cert_prev_btn");
    const cert_next_btn = document.querySelector(".cert_next_btn");
    const cert_slides = document.querySelectorAll(".cert_slide");        
    let certIndex = 1;

    function showCertSlides(n) {
        if (n > cert_slides.length) {
            certIndex = 1;
        }
        if (n < 1) {
            certIndex = cert_slides.length;
        }
        for (i = 0; i < cert_slides.length; i++) {
            cert_slides[i].style.display = "none";
        }
        cert_slides[certIndex-1].style.display = "flex";
        function changeCertSlide() {
            certIndex++;
            if (certIndex > cert_slides.length) {
                    certIndex = 1;
                }
            }
        setInterval(changeCertSlide, 1000);
    }

    function nextCert(n) {            
        showCertSlides(certIndex +=n)
    }

    cert_prev_btn.addEventListener('click', (n) => {
        nextCert(-1);
    })
    
    cert_next_btn.addEventListener('click', (n) => {
        nextCert(1);
    })
    

    showCertSlides();







//PROJECTS SLIDER
    const slide_tl = gsap.timeline({defaults: {duration: .6, ease: "power2.inOut"}})
    slide_tl.from(".bg", {x: "-100%", opacity: 0})
    .from(".descr", {opacity: 0}, "-=0.3")
    .from("h2", {opacity: 0, y: "30px"}, "-=0.3")
    .from(".btn", {opacity: 0, y: "-40px"}, "-=0.8")
    const slide_animate = () => slide_tl.restart();

    const projectSlides = document.querySelectorAll(".box");
    const dots = document.querySelectorAll(".dot");
    let slideIndex = 1;

    dots.forEach( (dot, dotIndex) => {
        dot.addEventListener('click', () => {
            slideIndex = dotIndex+1;
            showSlides(slideIndex);
            slide_animate();
        })
    })

    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
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
        }

        projectSlides[slideIndex-1].style.display = "flex";
        dots[slideIndex-1].className += " active";
    }

    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");

    prev.addEventListener("click", (n) => {
        plusSlides(-1);
        slide_animate();
    })

    next.addEventListener("click", (n) => {
        plusSlides(1);
        slide_animate();
    })
})