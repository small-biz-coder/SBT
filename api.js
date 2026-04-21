//decks
async function fetchDecks() {
  const res = await fetch('https://southbranchtrades.com/sbt-projects//wp-json/wp/v2/pages/9');
  if (!res.ok) throw new Error('Failed to fetch decks');
  return parseWPProjects(await res.json());
}
//garages
async function fetchGarages() {
  const res = await fetch('https://southbranchtrades.com/sbt-projects//wp-json/wp/v2/pages/27');
  if (!res.ok) throw new Error('Failed to fetch garages');
  return parseWPProjects(await res.json());
}
//additions
async function fetchAdditions() {
  const res = await fetch('https://southbranchtrades.com/sbt-projects//wp-json/wp/v2/pages/35');
  if (!res.ok) throw new Error('Failed to fetch additions');
  return parseWPProjects(await res.json());
}
//misc
async function fetchMisc() {
  const res = await fetch('https://southbranchtrades.com/sbt-projects//wp-json/wp/v2/pages/43');
  if (!res.ok) throw new Error('Failed to fetch misc');
  return parseWPProjects(await res.json());
}


function parseWPProjects(data) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data.content.rendered, 'text/html');
  const elements = Array.from(doc.body.children);

  const wpProjects = [];
  let currentProject = null;

  elements.forEach(el => {
    if (el.tagName === 'H2') {
      currentProject = { title: el, gallery: null, description: null };
      wpProjects.push(currentProject);
    } else if (el.classList.contains('wp-block-gallery') && currentProject) {
      currentProject.gallery = el;
    } else if (el.tagName === 'P' && currentProject) {
      currentProject.description = el;
    }
  });

  return wpProjects;
};
