document.addEventListener("DOMContentLoaded", function () {
  const logo = document.querySelector(".logo-container");
  const nav = document.querySelector(".nav-header");
  const topxa = document.querySelector(".top");
  const headerxa = document.querySelector("header.header");
  const form = document.querySelector("form");

  function changeNavPosition() {
    if (window.scrollY > 5) {
      headerxa.style.paddingTop = topxa.getBoundingClientRect().height + "px";
      topxa.classList.add("fixed");
    } else {
      topxa.classList.remove("fixed");
      headerxa.style.paddingTop = "0";
    }
  }

  function switchLogo() {
    const logo = document.querySelector('img[alt="logo"]');
    if (window.innerWidth <= 600) {
      logo.src = "./assets/favico.png";
      logo.classList.add("mobileLogo");
    } else {
      logo.src = "./assets/logo.png";
      logo.classList.remove("mobileLogo");
      // logo.style.width = "unset";
    }
  }

  document.addEventListener("scroll", changeNavPosition);
  window.addEventListener("resize", switchLogo);
  switchLogo();

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const firstName = document.querySelector('input[name="name"]');
    const lastName = document.querySelector('input[name="lastName"]');
    const email = document.querySelector('input[name="email"]');
    const phone = document.querySelector('input[name="phone"]');

    const btn = document.querySelector("form button[type='submit']");
    btn.innerHTML = '<div class="loading"></div>';
    fetch(
      "https://script.google.com/macros/s/AKfycbwbZCOYhvjjVxar35EvLBhTCSz07A7VhsT-sKOlVZZBe8LGBchildvdCthsSUv6OkYK/exec",
      {
        method: "POST",
        mode: "no-cors",
        redirect: "follow",
        cache: "no-cache",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          phone: phone.value,
          site: "myeasyslots",
        }),
      }
    )
      .then(() => {
        btn.innerHTML = "✓";
      })
      .finally(() => {
        setTimeout(() => {
          btn.innerHTML = "SUBMIT";
          phone.value = null;
          email.value = null;
          lastName.value = null;
          firstName.value = null;
        }, 1500);
      });
  });

  const modalsContainers = ["privacy-modal", "terms-modal", "cookie-modal"].map(
    (id) => document.getElementById(id)
  );
  const modalButtons = ["privacy-btn", "terms-btn", "cookies-btn"].map((id) =>
    document.getElementById(id)
  );
  const cancelButton = document.querySelectorAll(".cancelModal");

  modalButtons.forEach((el, idx) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      modalsContainers[idx].showModal();
      modalsContainers[idx].scroll({ top: 0 });
    })
  );

  modalsContainers.forEach((el) => {
    el.querySelector(".modal-content").addEventListener("click", (e) =>
      e.stopPropagation()
    );
    el.addEventListener("click", () => el.close());
  });

  cancelButton.forEach((el) =>
    el.addEventListener("click", () => {
      modalsContainers.forEach((el) => el.close("animalNotChosen"));
    })
  );

  document
    .querySelectorAll("span.domain")
    .forEach((el) => void (el.innerText = window.location.hostname));

  document
    .querySelectorAll("span.hostname")
    .forEach((el) => void (el.innerText = window.location.hostname));
});
