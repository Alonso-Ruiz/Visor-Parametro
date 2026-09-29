// Este control se registra antes que el mapa para que el ingreso funcione
      // incluso si el equipo no dispone de aceleración 3D.
      document.getElementById("enterButton").addEventListener("click", function () {
        document.getElementById("welcomeModal").classList.add("is-hidden");
      });
      document.getElementById("closeWelcome").addEventListener("click", function () {
        document.getElementById("welcomeModal").classList.add("is-hidden");
      });
