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

  // Llama a la función inicialmente y en el evento de desplazamiento
  highlightNav();

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
  });

  /* Dark mode - Ligth mode */
  const themeToggle = document.querySelector("#switch-theme");
  const root = document.documentElement;

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
  }

  function enableLightMode() {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");

    root.style.setProperty("--background-color", "#f5f5f5");
    root.style.setProperty("--highlight", "gold");
    root.style.setProperty("--text-color", "black");
    root.style.setProperty("--background-color2", "#ffffff");
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
