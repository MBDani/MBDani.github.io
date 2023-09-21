document.addEventListener("DOMContentLoaded", function () {
  /* Remarcar nav con scroll */
  var sectionId = "";
  function highlightNav() {
    var sections = document.querySelectorAll("section");
    sections.forEach(function (section) {
      var position = section.offsetTop * 0.9;
      var sectionHeight = section.offsetHeight;
      var scroll = window.scrollY;

      if (scroll >= position && scroll < position + sectionHeight) {
        sectionId = section.getAttribute("id");
        var links = document.querySelectorAll(".navbar-nav a");

        links.forEach(function (link) {
          link.classList.remove("section-active");
        });

        var targetLink = document.querySelector(
          '.navbar-nav a[href="#' + sectionId + '"]'
        );

        if (targetLink) {
          targetLink.classList.add("section-active");
        }
      }
    });
  }

  // Obtener todos los elementos con la clase "animation-element"
  var animationElements = document.querySelectorAll(".animation-element");

  // Mantén un registro de elementos animados
  var animatedElements = [];

  function checkIfInView() {
    var scrollThreshold = window.innerHeight * 0.1; // Umbral de desplazamiento
    var windowTopPosition = window.pageYOffset;
    var windowBottomPosition =
      windowTopPosition + window.innerHeight - scrollThreshold;

    animationElements.forEach(function (element) {
      var elementHeight = element.offsetHeight;
      var elementTopPosition =
        element.getBoundingClientRect().top + windowTopPosition;
      var elementBottomPosition = elementTopPosition + elementHeight;

      // Comprueba si este contenedor actual está dentro del viewport
      if (
        elementBottomPosition >= windowTopPosition &&
        elementTopPosition <= windowBottomPosition &&
        !animatedElements.includes(element)
      ) {
        element.classList.add("in-view");
        animatedElements.push(element); // Registra el elemento como animado
      }
    });
  }

  // Llama a la función inicialmente y en el evento de desplazamiento
  // highlightNav();

  /* Cerrar navbar versión móvil */
  var navLinks = document.getElementsByClassName("nav-link");
  var navCheckBox = document.getElementById("nav");
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function (event) {
      navCheckBox.click();
    });
  }

  window.addEventListener("scroll", () => {
    highlightNav();
    checkIfInView();
  });

  // window.addEventListener("resize", checkIfInView);
  window.addEventListener("load", () => {
    highlightNav();
    checkIfInView();
  });

  /* Dark mode - Ligth mode */
  const themeToggle = document.querySelector("#switch-theme");
  const root = document.documentElement;
  var wave = document.getElementsByClassName("wave");

  themeToggle.addEventListener("click", () => {
    document.body.classList.contains("light-theme")
      ? enableDarkMode()
      : enableLightMode();
  });

  function enableDarkMode() {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");

    root.style.setProperty("--background-color", "#0f0f0f");
    root.style.setProperty("--highlight", "gold");
    root.style.setProperty("--text-color", "white");
    root.style.setProperty("--background-color2", "#000000");

    for (let i = 0; i < wave.length; i++) {
      wave[i].style.filter = "brightness(0%)";
    }
  }

  function enableLightMode() {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");

    root.style.setProperty("--background-color", "#f5f5f5");
    root.style.setProperty("--highlight", "gold");
    root.style.setProperty("--text-color", "black");
    root.style.setProperty("--background-color2", "#ffffff");

    for (let i = 0; i < wave.length; i++) {
      wave[i].style.filter = "brightness(0%) invert(1)";
    }
  }

  /* Started Animations */
  var startAnimation = document.getElementById("start-animation");
  var navbar = document.getElementById("navbar");
  var socialIcons = document.getElementsByClassName("social-icons");
  var scrollDowns = document.getElementsByClassName("scroll-downs");
  startAnimation.addEventListener("animationend", function () {
    navbar.classList.add("fade-in");
    for (let i = 0; i < socialIcons.length; i++) {
      socialIcons[i].classList.add("fade-in");
    }
    for (let i = 0; i < scrollDowns.length; i++) {
      scrollDowns[i].classList.add("fade-in");
    }
  });
});

function sendMail(event) {
  /* Animated button submit */
  var wrapper = document.getElementById("contact-button-wrapper");
  if (!wrapper.classList.contains("checked")) {
    wrapper.classList.add("checked");
  }

  /* Send email */
  event.preventDefault(); // Detiene el comportamiento predeterminado del formulario
  var params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_uc6jjar";
  const templateID = "template_hrtslc9";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      setTimeout(function () {
        wrapper.classList.remove("checked");
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        console.log(res);
        alert("your message sent sucessfully");
      }, 5000);
    })
    .catch((err) => console.log(err));
}
