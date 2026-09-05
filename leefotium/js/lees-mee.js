/* Otium: het Lees-mee-formulier. Bespoke, in de pagina; de engine
   blijft onaangeroerd. Post naar de eigen backend (/api/inschrijven,
   interesse "nieuwsbrief"); zonder JavaScript blijft de eerlijke
   mailto-regel staan. */
(function () {
  "use strict";

  var ENDPOINT = "/api/inschrijven/";

  var form = document.getElementById("lees-mee");
  var mailto = document.getElementById("lees-mee-mailto");
  var ok = document.getElementById("lees-mee-ok");

  if (!form) { return; }

  form.hidden = false;
  if (mailto) { mailto.hidden = true; }

  /* Focus verhuist alleen op de eindpaden; bij een fout blijft hij op het
     veld en meldt role="status" de boodschap één keer. */
  function toon(bericht, verplaatsFocus) {
    if (ok) {
      ok.textContent = bericht;
      if (verplaatsFocus) { ok.focus(); }
    }
  }

  function klaar() {
    form.querySelector("input").disabled = true;
    form.querySelector("button").disabled = true;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.reportValidity()) { return; }
    var knop = form.querySelector("button");
    if (knop.disabled) { return; }
    knop.disabled = true;
    var email = form.querySelector("input").value.trim();
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        interesse: "ebook",
        website: form.querySelector('[name="website"]').value
      })
    })
      .then(function (res) {
        if (res.ok) {
          klaar();
          toon("Dank je. Het boek is onderweg. Als je wilt praten, antwoord op die mail.", true);
          return;
        }
        if (res.status === 409) {
          klaar();
          toon("Dank je. Het boek gaat opnieuw. Als je wilt praten, antwoord op die mail.", true);
          return;
        }
        return res.json().catch(function () { return null; }).then(function (data) {
          knop.disabled = false;
          toon((data && data.fout) || "Dat lukte niet. Probeer het straks opnieuw.");
        });
      })
      .catch(function () {
        knop.disabled = false;
        toon("Dat lukte niet. Probeer het straks opnieuw.");
      });
  });
})();
