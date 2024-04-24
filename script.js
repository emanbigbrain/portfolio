import featured from "./featured.json" with { type: 'json' };

let carousel = document.querySelector('.carousel');
let prevBtn = document.querySelector('.prev-btn');
let nextBtn = document.querySelector('.next-btn');
let projectLink = document.querySelector('.project-link');
let counterIndex = document.querySelector('.index');
let counterTotal = document.querySelector('.total');

let counter = 1;

function updateCounter(index) {
    counterIndex.innerHTML = `${index}`
    counterTotal.innerHTML = `${carouselProjects.length}`
}

let carouselProjects = featured;

for (let i = 0; i < carouselProjects.length; i++) {
    let projectWrapper = document.createElement('a')
    projectWrapper.href = carouselProjects[i].url
    projectWrapper.target = "_blank"
    projectWrapper.classList.add('project-wrapper')

    let projectImage = document.createElement('img')
    projectImage.classList.add('project-image')
    projectImage.src = `./static/${carouselProjects[i].image}`

    projectWrapper.appendChild(projectImage)

    updateCounter("1")

    carousel.appendChild(projectWrapper)
}

// clone last item for infinite scroll effect
carousel.prepend(carousel.children[carouselProjects.length - 1].cloneNode(true))

nextBtn.addEventListener('click', () => {
    // clearInterval(timer)

    if (counter < carouselProjects.length) {
        counter++;

        gsap.to(carousel, {
            x: -window.innerWidth * counter,
            duration: 1,
            ease: "expo.inOut",
            onComplete: () => {
                if (counter === carouselProjects.length) {
                    gsap.to(carousel, {
                        x: 0,
                        duration: 0
                    })
                    counter = 0;
                }
            }
        })
    } else if (counter === carouselProjects.length) {
        counter = 1;

        gsap.to(carousel, {
            x: 0,
            duration: 0,
            onComplete: () => {
                gsap.to(carousel, {
                    x: -window.innerWidth * counter,
                    duration: 1,
                    ease: "expo.inOut",
                })
            }
        })
    }

    if (counter === 0) {
        updateCounter(carouselProjects.length)
    } else {
        updateCounter(counter)
    }
})

prevBtn.addEventListener('click', () => {
    // clearInterval(timer)

    if (counter > 0) {
        counter--;

        gsap.to(carousel, {
            x: -window.innerWidth * counter,
            duration: 1,
            ease: "expo.inOut",
            onComplete: () => {
                if (counter === 0) {
                    gsap.to(carousel, {
                        x: -window.innerWidth * (carouselProjects.length),
                        duration: 0
                    })
                }

            }
        })
    } else if (counter === 0) {
        counter = carouselProjects.length - 1;

        gsap.to(carousel, {
            x: -window.innerWidth * (carouselProjects.length),
            duration: 0,
            onComplete: () => {
                gsap.to(carousel, {
                    x: -window.innerWidth * counter,
                    duration: 1,
                    ease: "expo.inOut",
                })
            }
        })
    }

    if (counter === 0) {
        updateCounter(carouselProjects.length)
    } else {
        updateCounter(counter)
    }
})

// timer switch 
// let timer = setInterval(() => {
//     nextBtn.click()
// }, 5000)