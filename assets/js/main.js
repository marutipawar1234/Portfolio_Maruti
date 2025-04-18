/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
    var menuBtn = document.getElementById("myNavMenu");
  
    if (menuBtn.className === "nav-menu") {
      menuBtn.className += " responsive";
    } else {
      menuBtn.className = "nav-menu";
    }
  }
  
  /* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
  window.onscroll = function () {
    headerShadow();
    scrollActive();
  };
  
  function headerShadow() {
    const navHeader = document.getElementById("header");
  
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
      navHeader.style.height = "70px";
      navHeader.style.lineHeight = "70px";
    } else {
      navHeader.style.boxShadow = "none";
      navHeader.style.height = "90px";
      navHeader.style.lineHeight = "90px";
    }
  }
  
  /* ----- TYPING EFFECT ----- */
  var typingEffect = new Typed(".typedText", {
    strings: ["Developer"],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 2000,
  });
  
  /* ----- SCROLL REVEAL ANIMATION ----- */
  const sr = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 2000,
    reset: true,
  });
  
  sr.reveal(".featured-text-card", {});
  sr.reveal(".featured-name", { delay: 100 });
  sr.reveal(".featured-text-info", { delay: 200 });
  sr.reveal(".featured-text-btn", { delay: 200 });
  sr.reveal(".social_icons", { delay: 200 });
  sr.reveal(".featured-image", { delay: 300 });
  sr.reveal(".project-box", { interval: 200 });
  sr.reveal(".top-header", {});
  
  const srLeft = ScrollReveal({
    origin: "left",
    distance: "80px",
    duration: 2000,
    reset: true,
  });
  srLeft.reveal(".about-info", { delay: 100 });
  srLeft.reveal(".contact-info", { delay: 100 });
  
  const srRight = ScrollReveal({
    origin: "right",
    distance: "80px",
    duration: 2000,
    reset: true,
  });
  srRight.reveal(".skills-box", { delay: 100 });
  srRight.reveal(".form-control", { delay: 100 });
  
  /* ----- ACTIVE NAV LINK ON SCROLL ----- */
  const sections = document.querySelectorAll("section[id]");
  
  function scrollActive() {
    const scrollY = window.pageYOffset;
  
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute("id");
  
      const link = document.querySelector(".nav-menu a[href*=" + sectionId + "]");
  
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add("active-link");
      } else {
        link.classList.remove("active-link");
      }
    });
  }
  
  /* ----- CONTACT FORM TO GOOGLE SHEET ----- */
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbySNQ_6zDflX7HoFLcQ9A8MC8uZ3kJcwF-rMLDaNWrcMTdSFMfgk0NHK0zLmj8d8Pd6/exec";
  const form = document.forms["submit-to-google-sheet"];
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        alert("Message sent successfully!");
        form.reset();
      })
      .catch((error) => {
        alert("Something went wrong. Please try again.");
        console.error("Error!", error.message);
      });
  });
 
  function doPost(e) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Log the incoming parameters for debugging
    Logger.log(JSON.stringify(e.parameter));
    
    // Ensure the parameters match the form field names exactly
    var name = e.parameter.Name;
    var email = e.parameter.Email;
    var message = e.parameter.Message;
    
    // Append the data to the sheet
    sheet.appendRow([new Date(), name, email, message]);
    
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  }
  