document.addEventListener('DOMContentLoaded', function() {
  // Références des curseurs
  const cursor = document.getElementById('cursor');
  const cursorBig = document.getElementById('cursorBig');

  // Variables pour la latence et la position
  let mouseX = 0;
  let mouseY = 0;
  let cursorBigX = 0;
  let cursorBigY = 0;
  let latencyFactor = 0.1;  // Facteur de latence pour le grand curseur (valeur entre 0 et 1)

  // Suivi de la souris
  document.addEventListener('mousemove', function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;

    // Mise à jour immédiate du petit curseur
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  // Suivi du grand curseur avec un effet de latence fluide (lerp)
  function updateBigCursor() {
    // Calcul de la position du grand curseur en fonction de la position de la souris avec un effet de latence
    cursorBigX += (mouseX - cursorBigX) * latencyFactor;
    cursorBigY += (mouseY - cursorBigY) * latencyFactor;

    // Mise à jour de la position du grand curseur
    cursorBig.style.left = `${cursorBigX}px`;
    cursorBig.style.top = `${cursorBigY}px`;

    // Appel de la fonction de mise à jour pour l'animation
    requestAnimationFrame(updateBigCursor);
  }

  // Démarrage de l'animation
  updateBigCursor();
});


function openAPropos() {
  var apropos = document.getElementById("apropos");
  var aproposOverlay = document.getElementById("aproposOverlay");
  apropos.style.left = "0vw";
  aproposOverlay.style.display = "block";
}

function closeAPropos() {
  var apropos = document.getElementById("apropos");
  var aproposOverlay = document.getElementById("aproposOverlay");
  apropos.style.left = "calc(var(--aproposSize)*-1)";
  aproposOverlay.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "experiences.json", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var xps = JSON.parse(xhr.responseText);
      var xpList = document.getElementById("experiences");

      xps.forEach(function (xp) {
        var xpItem = document.createElement("div");
        xpItem.classList.add("timeline");
        xpItem.innerHTML = "<div class=\"xp-header\"><img src=\""+xp.img+"\"><div><p class=\"xp-date\">" + xp.date + "</p><p class=\"xp-poste\">" + xp.poste +" </p><p class=\"xp-entreprise\"> "+ xp.entreprise +" </p></div></div><p> " + xp.desc + " </p><div class=\"xp-note\"> " + xp.note + " </div>";
        xpList.appendChild(xpItem);
      });
    }
  };
  xhr.send();
});

document.addEventListener("DOMContentLoaded", function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "formations.json", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var forms = JSON.parse(xhr.responseText);
      var formList = document.getElementById("formations");

      forms.forEach(function (form) {
        var formItem = document.createElement("div");
        formItem.classList.add("timeline");
        formItem.innerHTML = "<div class=\"xp-header\"><img src=\""+form.img+"\"><div><p class=\"xp-date\">" + form.type + "</p><p class=\"xp-poste\">" + form.nom +" </p><p class=\"xp-entreprise\"> "+ form.lieu +" </p></div></div><p> " + form.desc + " </p><div class=\"xp-note\"> " + form.date + " </div>";
        formList.appendChild(formItem);
      });
    }
  };
  xhr.send();
});

//afficher les ressources

document.addEventListener("DOMContentLoaded", function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "ressources.json", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var res = JSON.parse(xhr.responseText);
      var resList = document.getElementById("ressourcesListe");

      res.forEach(function (res) {
        var resItem = document.createElement("a");
        resItem.classList.add("ressource");
        resItem.setAttribute("href", res.link);
        resItem.setAttribute("target", "_blank");
        resItem.innerHTML = "<img src=\"ressources/" + res.img + "\"><div><h3>" + res.nom + "</h3><p class=\"badge\">" + res.tag + "</p></div>";
        resList.appendChild(resItem);
      });
    }
  };
  xhr.send();
});

//afficher les projets

var projects = []; // Variable globale pour stocker les projets

document.addEventListener("DOMContentLoaded", function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "projects.json", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      projects = JSON.parse(xhr.responseText);
      var projectList = document.getElementById("liste-projets");

      projects.forEach(function (project) {
        var projectElement = document.createElement("div");
        projectElement.classList.add("projet");
        projectElement.classList.add("projet");
        var tagsList = "<ul>";
        project.tags.forEach(function (tag) {
          tagsList += "<li>" + tag + "</li>";
        });
        tagsList += "</ul>";
        projectElement.innerHTML = "<div class=\"imgContainer\"><img src=\"covers/" + project.cover + "\" alt=\"\"></div><h3>" + project.title + "</h3>" + tagsList;
        projectElement.addEventListener("click", function () {
          displayProjectDetails(project);
        });
        projectList.appendChild(projectElement);
      });
    }
  };
  xhr.send();
});

//ouvrir un projet

function displayProjectDetails(project) {
  var pdetails = document.getElementById("p-details");
  var poverlay = document.getElementById("p-overlay");
  var ptitle = document.getElementById("p-title");
  var pcategory = document.getElementById("p-category");
  var pdate = document.getElementById("p-date");
  var pcontext = document.getElementById("p-context");
  var pchallenge = document.getElementById("p-challenge");
  var pactions = document.getElementById("p-actions");
  var closeButton = document.getElementById("close-button");
  var projetButton = document.getElementById("projet-button");
  var pfi = document.getElementById("p-fi");
  var pimages = document.getElementById("p-images");
  var pprev = document.getElementById("p-prev");
  var pnext = document.getElementById("p-next");
  


  ptitle.textContent = project.title;
  pcategory.textContent = project.category;
  pdate.textContent = project.date;
  pfi.setAttribute("src", "imgProjet/fi-" + project.cover);
  pcontext.innerHTML = project.context;
  pchallenge.innerHTML = project.challenge;
  pactions.innerHTML = project.actions;

  pimages.innerHTML = "";
  project.images.forEach(function(image) {
      var container;

      if (project.imageLiens && project.imageLiens[image]) {
          container = document.createElement("a");
          container.setAttribute("href", project.imageLiens[image]);
          container.setAttribute("target", "_blank");
          container.classList.add("p-image-container");
      } else {
          container = document.createElement("div");
          container.classList.add("p-image-container");
      }

      var img = document.createElement("img");
      img.setAttribute("src", "imgProjet/" + image);
      img.setAttribute("alt", "Project Image");

      container.appendChild(img);

      // Ajouter une description sous l'image si elle est disponible dans le projet
      if (project.imageDescriptions && project.imageDescriptions[image]) {
          var imgDescription = document.createElement("p");
          imgDescription.textContent = project.imageDescriptions[image];
          container.appendChild(imgDescription);
      }

      pimages.appendChild(container);
  });

  // Afficher les projets précédent et suivant
  var currentIndex = projects.indexOf(project);
  var prevIndex = (currentIndex - 1 + projects.length) % projects.length;
  var nextIndex = (currentIndex + 1) % projects.length;

  pprev.innerHTML = `
      <div onclick="displayProjectDetails(projects[${prevIndex}])">
        <p>←</p>
        <p >${projects[prevIndex].title}</p>
      </div>
  `;

  pnext.innerHTML = `
    <div onclick="displayProjectDetails(projects[${nextIndex}])">
      <p>${projects[nextIndex].title}</p>
      <p>→</p>
    </div>
  `;

  var adjustment = window.innerWidth * 3.5 / 100; // Calcule 3.5vw
  pdetails.scrollTo({
    top: pdetails.offsetTop - adjustment,
    behavior: "instant"
  });

  pdetails.style.display = "block";
  poverlay.style.display = "block";

  closeButton.addEventListener("click", closeProject);
  projetButton.addEventListener("click", closeProject);
  poverlay.addEventListener("click", closeProject);
}

function closeProject() {
  var pdetails = document.getElementById("p-details");
  var poverlay = document.getElementById("p-overlay");
  pdetails.style.display = "none";
  poverlay.style.display = "none";
}

//afficher les archives

document.addEventListener("DOMContentLoaded", function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "archives.json", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var arc = JSON.parse(xhr.responseText);
      var arcList = document.getElementById("archivesListe");

      arc.forEach(function (arc) {
        var arcItem = document.createElement("a");
        arcItem.classList.add("archive");
        var tagsList = "";
        arc.tags.forEach(function (tag) {
<<<<<<< HEAD
          tagsList += "<p class=\"badge-light\">" + tag + "</p>";
=======
          tagsList += "<p class=\"badge\">" + tag + "</p>";
>>>>>>> cac33c9 ([git-ftp] remotely untracked modifications)
        });
        arcItem.innerHTML = "<img class=\"a-img\" src=\"archives/" + arc.cover + "\"> <h3>" + arc.title + "</h3> <div> <a class=\"badge lien\" target=\"_blank\" href=\"" + arc.clientweb + "\">" + arc.client + "</a>" + tagsList +"</div>";
        arcItem.addEventListener("click", function () {
          displayArchiveDetails(arc);
        });
        arcList.appendChild(arcItem);
      });
    }
  };
  xhr.send();
});

//ouvrir une archive

function displayArchiveDetails(archive) {
  var adetails = document.getElementById("a-details");
  var aoverlay = document.getElementById("a-overlay");
  var atitle = document.getElementById("a-title");
  var acategory = document.getElementById("a-category");
  var adate = document.getElementById("a-date");
  var adescription = document.getElementById("a-description");
  var aclient = document.getElementById("a-client");
  var closeButton = document.getElementById("a-close-button");
  var afi = document.getElementById("a-fi");
  var aimages = document.getElementById("a-images");

  atitle.textContent = archive.title;
  var tagsList = "";
        archive.tags.forEach(function (tag) {
<<<<<<< HEAD
          tagsList += "<span class=\"badge-light\">" + tag + "</span>";
=======
          tagsList += "<span class=\"badge\">" + tag + "</span>";
>>>>>>> cac33c9 ([git-ftp] remotely untracked modifications)
        });
  acategory.innerHTML = tagsList;
  adate.textContent = archive.date;
  afi.setAttribute("src", "archives/" + archive.cover);
  adescription.innerHTML = archive.description;
  aclient.innerHTML = archive.client;
  aclient.setAttribute("href", archive.clientweb);
  aclient.setAttribute("target", "_blank");


  aimages.innerHTML = "";
  archive.images.forEach(function(image) {
      var container;

      if (archive.imageLiens && archive.imageLiens[image]) {
          container = document.createElement("a");
          container.setAttribute("href", archive.imageLiens[image]);
          container.setAttribute("target", "_blank");
          container.classList.add("a-image-container");
      } else {
          container = document.createElement("div");
          container.classList.add("a-image-container");
      }

      var img = document.createElement("img");
      img.setAttribute("src", "archives/" + image);
      img.setAttribute("alt", "Archive Image");

      container.appendChild(img);

      // Ajouter une description sous l'image si elle est disponible dans le projet
      if (archive.imageDescriptions && archive.imageDescriptions[image]) {
          var imgDescription = document.createElement("p");
          imgDescription.textContent = archive.imageDescriptions[image];
          container.appendChild(imgDescription);
      }

      aimages.appendChild(container);
  });

  if (window.innerWidth > 768) {
    afi.onload = function() {
      resizeAFi();
    };
  }

  adetails.style.display = "block";
  aoverlay.style.display = "block";

  

  var adjustment = window.innerWidth * 4 / 100; // Calcule 4vw
  adetails.scrollTo({
    top: adetails.offsetTop - adjustment,
    behavior: "instant"
  });

  closeButton.addEventListener("click", closeArchive);
  aoverlay.addEventListener("click", closeArchive);
}


function closeArchive() {
  var adetails = document.getElementById("a-details");
  var aoverlay = document.getElementById("a-overlay");
  adetails.style.display = "none";
  aoverlay.style.display = "none";
}

function resizeAFi() {
  // Récupérer l'élément de l'image
  const imageElement = document.getElementById('a-fi');
    
  // Récupérer l'élément de la description
  const descriptionContainer = document.querySelector('.a-text > div');
  
  // Récupérer la hauteur de l'image
  const imageHeight = imageElement.offsetHeight;
  console.log(imageHeight);
  
  // Appliquer cette hauteur à .a-text > div
  descriptionContainer.style.height = `${imageHeight}px`;
}


//faire bouger les badges

document.addEventListener("DOMContentLoaded", function () {
  var maxRotation = 3;
  var listItems = document.querySelectorAll('#badges *');

  listItems.forEach(function (item) {
    item.addEventListener("mouseover", function () {
      applyRotation(item);
    });
  });

  function applyRotation(element) {
    var rotation = Math.random() * (2 * maxRotation) - maxRotation;
    element.style.transform = "rotate(" + rotation + "deg)";
  }
});

//anim navbar

document.addEventListener("DOMContentLoaded", function () {
  var navbar = document.getElementById('nav');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });
});




