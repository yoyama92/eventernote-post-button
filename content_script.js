function createElement(element, props, ...children) {
  const el = document.createElement(element);
  Object.keys(props || {}).forEach(x => el.setAttribute(x, props[x]));
  el.append(...children);
  return el;
}

if (/^\/events\/\d+$/.test(location.pathname)) {
  const noteDeleteBtn = document.querySelector("a.note-delete-btn").parentElement;
  if (noteDeleteBtn && noteDeleteBtn.style.display !== "none") {
    const lastRow = document.querySelector(".gb_events_info_table * > tr:last-child")
    let hashtags = [
      "eventernote"
    ]
    if (lastRow.children[0].textContent === "Twitterハッシュタグ") {
      // #は不要
      const eventTags = lastRow.children[1].textContent.split(" ").map(tag => tag.replaceAll("#", ""))
      hashtags = [
        ...hashtags,
        ...eventTags
      ]
    }
    const title = document.querySelector(".gb_events_detail_title").textContent.trim();
    const url = location.href;
    const text = `${title}に参加します`
    const aTag = createElement("a", {
      href: `https://twitter.com/share?text=${encodeURI(text)}&url=${encodeURI(url)}&hashtags=${hashtags.join(",")}`,
      class: "btn btn-large btn-primary",
      target: "_blank"
    });
    aTag.innerHTML = '<i class="icon icon-share icon-white"></i>参加ポストする';
    const postBtn = createElement("p", { class: "center note-edit-area" }, aTag)
    noteDeleteBtn.before(postBtn);
  }
}