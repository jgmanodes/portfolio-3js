import { accelerate } from './scene.js';    // Function to move stars

// Function to set z-index on Main
function setMainZIndex(index) {
    const main = document.querySelector("main");
    main.style.zIndex = `${index}`;
}


// ---------------------
// TITLE AND NAV BUTTONS
// ---------------------

const nameTitle = document.querySelector("#name-title");
const nameArray = nameTitle.innerHTML.split("");       // Split title to make effect on each letter
const navElement = document.querySelector("nav");
const headerElement = document.querySelector('header');

// Initial animation on title and nav buttons
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        nameTitle.style.opacity = "1";
        navElement.style.opacity = "1";
    }, 1000);
});

// We change each letter for a span and join them into nameTitle
nameTitle.innerHTML = nameArray.map((letter) => `<span class="name-letter">${letter}</span>`).join('');
const spanLetters = nameTitle.querySelectorAll(".name-letter");

// We add styles for each letter
spanLetters.forEach((letter) => {
    letter.addEventListener('mouseenter', () => {
        letter.style.color = 'var(--color-secondary)';
        letter.style.textShadow = '0px 0px 8px var(--color-secondary)';
        letter.style.transition = 'color 0.3s linear, text-shadow 0.3s linear';
    });
    letter.addEventListener('mouseleave', () => {
        letter.style.color = 'var(--color-primary)';
        letter.style.textShadow = 'none';
        letter.style.transition = 'color 2s linear, text-shadow 2s linear';
    });
});





// ---------------------------
// ABOUT AND PROJECTS SECTIONS
// ---------------------------

const aboutButton = document.getElementById('about-button');
const projectsButton = document.getElementById('projects-button');
const aboutSection = document.getElementById('about');
const projectSection = document.getElementById("projects");

// We add click event for each button to call navButtons()
aboutButton.addEventListener('click', () => {
    navButtons(aboutSection, projectSection);
});
projectsButton.addEventListener('click', () => {
    navButtons(projectSection, aboutSection);
});

// Function to move into and between sections 
function navButtons(nextSection, actualSection) {
    setMainZIndex(0)

    if (actualSection.className === 'container section-on' && nextSection.className === 'container') {   // If we are in a section
        // We accelerate and add closing animation to actual section
        accelerate();
        actualSection.classList.add('section-off-animation');
        setTimeout(() => {
            // Add class names to display next section and remove the actual section class names
            nextSection.classList.add('section-on', 'section-on-animation');
            actualSection.classList.remove('section-on', 'section-off-animation');
        }, 1200);
        setTimeout(() => {
            // Remove the display animation from next section
            nextSection.classList.remove('section-on-animation');
        }, 1500);
    } else if (nextSection.className === "container" && actualSection.className === 'container') {     // If we are in Home
        // We accelerate and add closing and opening animation to title and navbar
        accelerate();
        nameTitle.className = 'header-animation';
        navElement.className = 'header-animation';
        setTimeout(() => {
            // While animation is running, we add class names to header, title and navbar, so they can be seen on top
            // And make the next clicked section display
            headerElement.classList.add('header-top');
            nameTitle.classList.add('title-top');
            navElement.classList.add('nav-top');
            nextSection.classList.add('section-on', 'section-on-animation');
        }, 1200)
        setTimeout(() => {
            // We remove the animation from title and navbar
            nameTitle.classList.remove('header-animation');
            navElement.classList.remove('header-animation');
        }, 1500);
        setTimeout(() => {
            // Remove the animation from next section
            nextSection.classList.remove('section-on-animation');
        }, 2000);
    } else if (nextSection.className = "container section-on") { // If we are in the same section
        // Add buzz animation
        nextSection.classList.add('animation-zumbido');
        setTimeout(() => {
            // Remove buzz animation
            nextSection.classList.remove('animation-zumbido');
        }, 350);
    }
}




// -------------
// CONTACT MODAL
// -------------

const contactButton = document.getElementById('contact-button');
const contactSection = document.getElementById("contact");
const contactModal = document.querySelector(".modal");
const closeModalButton = document.querySelector("#close-modal");

// Contact open button
contactButton.addEventListener('click', () => {
    contactSection.classList.add('section-on'); // #contact: display on

    // Full-div with opacity 75%;
    let firstChild = contactSection.children[0]; // get first child for verification
    if (firstChild.className === "modal") { // if its className is modal, to avoid the creation of more than one full-div
        const newDiv = document.createElement('div');
        newDiv.className = 'full-div full-div-on';
        contactSection.insertBefore(newDiv, contactSection.children[0]);
    }


    // Timeout for full-div animation (0.5s)
    setTimeout(() => {
        contactModal.classList.add("section-on-animation", "section-on"); // display on and animation of contactModal
        setTimeout(() => {
            contactModal.classList.remove("section-on-animation") // remove animation after finishing
        }, 300);
    }, 500);

    // Conditions
    
    if (nameTitle.className === "") { // if we are in Home 
        setMainZIndex(1); // zIndex of Main set to 1, in front of header (full height) 
    } else { // if we are in a section (about, project)
        contactSection.style.zIndex = "1";  // so that contactSection is above another section
        contactSection.style.top = "-80px"; // this will ignore the 100px header-top
    }
})


// Contact closing button
closeModalButton.addEventListener("click", () => {
    contactModal.classList.add('section-off-animation'); // closing animation of modal

    // Timeout for modal closing animation
    setTimeout(() => {
        contactModal.classList.remove('section-off-animation', 'section-on'); // deleting animation off and section on from modal

        let firstChild = contactSection.children[0]; // get first child for verification
        if (firstChild.className === "full-div full-div-on") { // if its className is full-div
            firstChild.classList.add('full-div-off'); // closing animation for full-div

            // Timeout for closing animation from full-div
            setTimeout(() => {
                contactSection.removeChild(firstChild); // delete full-div
                contactSection.classList.remove('section-on'); // delete className section-on from #contact

                if (nameTitle.className !== "") { // if we are in another section
                    contactSection.style.top = "0"; // reset position of main
                } else { // if we are in Home
                    setMainZIndex(-1); // reset zIndex of main to -1
                }
            }, 700);
        }
    }, 300);
})





// ---------------------
// CONTACT SUBMIT BUTTON 
// ---------------------

const submitButton = document.querySelector('.submit-button');
