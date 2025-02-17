const presence = new Presence({
  clientId: "777146104117854230"
});

let stream: { duration: number; currentTime: number; paused: boolean };
presence.on(
  "iFrameData",
  (data: { duration: number; currentTime: number; paused: boolean }) =>
    (stream = data)
);

presence.on("UpdateData", async () => {
  const path: string = document.location.pathname,
    presenceData: PresenceData = {
      largeImageKey: "dizimag"
    };
  if (path.startsWith("/uye-ol")) {
    presenceData.details = "Bir sayfaya bakıyor:";
    presenceData.state = "Üye Ol";
    presenceData.startTimestamp = Date.now();
  } else if (path.startsWith("/profil")) {
    const name: string = document.querySelector("span.text-medium").textContent;
    presenceData.details = "Profilini inceliyor:";
    presenceData.state = name || "Bulunamadı";
    presenceData.startTimestamp = Date.now();
  } else if (path === "/") {
    presenceData.details = "Bir sayfaya bakıyor:";
    presenceData.state = "Ana Sayfa";
    presenceData.startTimestamp = Date.now();
  } else if (path.startsWith("/yabanci-diziler")) {
    presenceData.details = "Bir sayfaya bakıyor:";
    presenceData.state = "Yabancı Diziler";
    presenceData.startTimestamp = Date.now();
  } else if (path.startsWith("/iletisim")) {
    presenceData.details = "Bir sayfaya bakıyor:";
    presenceData.state = "İletişim";
    presenceData.startTimestamp = Date.now();
  } else if (path.startsWith("/gelisme-sureci")) {
    presenceData.details = "Bir sayfaya bakıyor:";
    presenceData.state = "Gelişme Süreci";
    presenceData.startTimestamp = Date.now();
  } else if (path.startsWith("/ne-izlesem")) {
    presenceData.details = "Bir sayfaya bakıyor:";
    presenceData.state = "Ne İzlesem?";
    presenceData.startTimestamp = Date.now();
  } else if (path.startsWith("/trend")) {
    presenceData.details = "Bir sayfaya bakıyor:";
    presenceData.state = "Trendler";
    presenceData.startTimestamp = Date.now();
  } else if (path.startsWith("/uye")) {
    const name: string = document.querySelector("span.text-white").textContent;
    presenceData.details = "Bir profile bakıyor:";
    presenceData.state = name;
    presenceData.startTimestamp = Date.now();
  } else if (path.startsWith("/oyuncu")) {
    const name: string = document.querySelector(
      "div.text-orange > div.pull-left"
    ).textContent;
    presenceData.details = "Bir oyuncuya bakıyor:";
    presenceData.state = name || "Bulunamadı";
    presenceData.startTimestamp = Date.now();
  } else if (path.startsWith("/dizi") && path.split("/")[3] === "") {
    const name: string = document.querySelector("h1.text-nowrap").textContent;
    presenceData.details = "Bir diziye bakıyor:";
    presenceData.state = name || "Bulunamadı";
    presenceData.startTimestamp = Date.now();
  } else if (
    !isNaN(stream.duration) &&
    !isNaN(stream.currentTime) &&
    typeof stream.paused === "boolean"
  ) {
    const name: string[] = document
      .querySelector("h1.text-sans > a")
      .textContent.split("-");
    // let name1: string = document.querySelector("span.text-orange").textContent;
    presenceData.details = name[0] || "Bulunamadı";
    presenceData.state = name[1] || "Bulunamadı";

    if (stream.paused === true) {
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText = "Durduruldu";
      presenceData.buttons = [
        { label: "İzle", url: document.location.href },
        {
          label: "Diziyi Görüntüle",
          url: `${document.location.origin}/${
            document.location.pathname.split("/")[1]
          }/${document.location.pathname.split("/")[2]}`
        }
      ];
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    } else {
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = "Oynatılıyor";
      presenceData.buttons = [
        { label: "İzle", url: document.location.href },
        {
          label: "Diziyi Görüntüle",
          url: `${document.location.origin}/${
            document.location.pathname.split("/")[1]
          }/${document.location.pathname.split("/")[2]}`
        }
      ];
      [presenceData.startTimestamp, presenceData.endTimestamp] =
        presence.getTimestamps(
          Math.floor(stream.currentTime),
          Math.floor(stream.duration)
        );
    }
  }

  presence.setActivity(presenceData);
});
