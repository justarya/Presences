const presence = new Presence({
  clientId: "833689728774832168"
});

let videoData: {
  duration: number;
  paused: boolean;
  currentTime: number;
};

presence.on("iFrameData", (data: typeof videoData) => {
  videoData = data;
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "animetube"
  };

  if (document.location.pathname === "/") {
    presenceData.details = "| Startseite";
    presenceData.state = "Starrt auf die neuen Sachen";
  } else if (document.location.pathname.startsWith("/anime/list")) {
    presenceData.details = "| Suche";
    presenceData.state = "Sucht nach einem neuen Lieblingsanime";
  } else if (
    document.location.pathname.startsWith("/anime") &&
    !document.location.pathname.includes("/watch")
  ) {
    const titleSplit = document.title.split("›").map(s => s.trim());

    presenceData.details = "| Übersicht";
    [, , presenceData.state] = titleSplit;
  } else if (document.location.pathname === "/static/calendar") {
    presenceData.details = "| Kalendar";
    presenceData.state = "Schaut sich die neuen Releases an";
  } else if (document.URL.includes("/user/me?page=delete")) {
    presenceData.details = "| Account Löschen";
    presenceData.state = "Eine Straftat begehen";
  } else if (document.location.pathname.includes("/user/me")) {
    presenceData.details = "| Einstellungen";
    presenceData.state = "Macht irgendwas kaputt";
  } else if (document.location.pathname.includes("/user/")) {
    const titleSplit = document.title.split("Profil von ");
    presenceData.details = "| Benutzerinfo";
    presenceData.state = `Profil von ${titleSplit[1]}`;
  } else if (document.location.pathname === "/easteregg") {
    presenceData.details = "| Easteregg?";
    presenceData.state = "Jup, Easeregg!";
  } else if (document.location.pathname.startsWith("/static/")) {
    presenceData.details = "| Hilfe & Infos";
    presenceData.state = "Ließt intensiv durch die Infoseiten";
  } else if (
    document.location.pathname.includes("/anime") &&
    document.location.pathname.includes("/watch")
  ) {
    const titleSplit = document.title.split("›").map(s => s.trim()),
      [, , animeName, episode] = titleSplit;

    presenceData.details = `| schaut ${animeName}`;
    presenceData.state = episode;

    if (videoData) {
      presenceData.smallImageKey = videoData.paused ? "pause" : "play";
      presenceData.smallImageText = videoData.paused ? "Pausiert" : "Spielt";

      [, presenceData.endTimestamp] = presence.getTimestamps(
        videoData.currentTime,
        videoData.duration
      );

      if (videoData.paused) delete presenceData.endTimestamp;
    }
  } else if (document.location.pathname === "/login") {
    presenceData.details = "| Login";
    presenceData.state = "Willkommen zurück!";
  } else if (document.location.pathname === "/register") {
    presenceData.details = "| Registrieren";
    presenceData.state = "Ein neuer User!";
  } else {
    presenceData.details = "| Error";
    presenceData.state = "Wie bist du hier gelandet?";
  }

  presence.setActivity(presenceData);
});
