const presence = new Presence({
    clientId: "702978839722197012"
  }),
  strings = presence.getStrings({
    browsing: "presence.activity.browsing"
  });

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "instantgaming"
  };
  try {
    let productPlatform = document.querySelector(
      "div.subinfos > a.platform"
    ).textContent;
    if (productPlatform.startsWith("Other")) productPlatform = "N/A";

    presenceData.details = "Viewing a product:";
    presenceData.state = `[${productPlatform}] ${
      document.querySelector(
        "div.product > div.infos > div.shadow.mainshadow > div.title > h1"
      ).textContent
    } (${document.querySelector("div.price").textContent})`;
  } catch {
    if (window.location.pathname.includes("/user/")) {
      presenceData.details = "Viewing a profile:";
      presenceData.state = document.querySelector(
        "div.ig-profile-info-nick > span"
      ).textContent;
    } else presenceData.details = (await strings).browsing;
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
