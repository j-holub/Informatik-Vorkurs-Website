# Informatik Vorkurs Website

Diese Website soll dabei helfen den Inforamtik Vorkurs zu organisieren. Die Funktionalität soll folgendes umfassen:

* Anleitung zum Einrichten von Robocode & Eclipse
* Hoch- und Runterladen von Robotern
* Turnierverwaltung
* Code Schnipsel
* Download von Cheatsheets und ähnlichem


Die Website wurde bisher noch nicht eingesetzt und ist auch noch nicht komplett funktionsfähig

## Technologie

Die Website im [Meteor](www.meteor.com) Framework geschrieben. Das Framework basiert auf [nodeJs](http://nodejs.org) und ist in JavaScript geschrieben.

Es erlaubt einem mit sehr wenig Aufwand reaktive UIs zu basteln, heißt die Dinge passieren in Echtzeit.

Desweiteren kommen folgende Technologien zum einsatz:

* **[sass](http://sass-lang.com)** - CSS Preprocessing
* **[Materializecss Grid](http://materializecss.com)** - CSS Grid aus besagtem Framework
* **[VagueJs](https://gianlucaguarini.github.io/Vague.js)** - JavaScript Bibliothek zum *blurren* von Elementen

## Dokumentation

Bisher gibt es nur eine Doku in TeX. Die Doku umfasst bisher folgendes:

* Datenbank Entitäten
* Verwendete Meteor Pakete
* Beschreibung der URL Routen

Die Doku ist im Ordner *Dokumentation* als TeX Datei zu finden und sollte mit jeder üblichen TeX Distribution kompilierbar sein

## Einrichtung

### Installieren

Zuerst muss das [Meteor](www.meteor.com) Framework eingerichtet werden

#### OS X / Linux

```
curl https://install.meteor.com/ | sh
```

####  Windows

[Installer](https://install.meteor.com/windows) herunterladen und installieren

### NPM Dependencies installieren

```
meteor npm install --save
```

### Starten

Danach navigiert man mit de Konsole einfach in den Ordner der Informatik Vorkurs Website und startet den Development Server mit

```
meteor
```

Die Website ist dann unter `localhost:3000`zu erreichen



## Contributing

Wer Lust hat mit zu helfen, einfach das Repo klonen, etwas dazu beitragen, **testen** und einen Merge Request öffnen