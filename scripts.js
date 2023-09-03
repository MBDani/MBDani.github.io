document.addEventListener("DOMContentLoaded", function () {
  /* Remarcar nav con scroll */
  var sectionId = "";
  function highlightNav() {
    var sections = document.querySelectorAll("section");
    sections.forEach(function (section) {
      var position = section.offsetTop;
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

    /* Creamos bg en el navbar cuando hacemos scroll */
    const nav = document.querySelector(".navbar");
    const sectionDark = ["about", "experience"];
    const sectionLigth = ["projects", "contact"];
    if (sectionId == "home") {
      nav.classList.remove("navbar-section-black");
      nav.classList.remove("navbar-section-light");
    } else if (sectionLigth.includes(sectionId)) {
      nav.classList.add("navbar-section-black");
      nav.classList.remove("navbar-section-light");
    } else if (sectionDark.includes(sectionId)) {
      nav.classList.remove("navbar-section-black");
      nav.classList.add("navbar-section-light");
    }
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
});

function sendMail() {
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
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
      console.log(res);
      alert("your message sent sucessfully");
    })
    .catch((err) => console.log(err));
}