const decks = document.querySelector('#decks-btn');
const garages = document.querySelector('#garages-btn');
const additions = document.querySelector('#additions-btn');
const body = document.querySelector('body');

const toggleGarages = () => {
  body.classList.toggle('show-garages');
  if (body.classList.contains("show-additions")) {
    body.classList.remove("show-additions");
  }
}
const toggleAdditions = () => {
  body.classList.toggle('show-additions');
  if (body.classList.contains("show-garages")) {
    body.classList.remove("show-garages");
  }
}
const toggleDecks = () => {
  body.classList.remove('show-additions', 'show-garages');
}
decks.addEventListener('click', toggleDecks);

garages.addEventListener('click', toggleGarages);

additions.addEventListener('click', toggleAdditions);




window.addEventListener('load', async () => {
  try {
    const [decks, garages, additions] = await Promise.all([
      fetchDecks(),
      fetchGarages(),
      fetchAdditions()
    ]);
    renderPortfolio(decks,
      document.querySelector('.services-decks'),
      'decks'
    );
    renderPortfolio(garages,
      document.querySelector('.services-garages'),
      'garages'
    );
    renderPortfolio(additions,
      document.querySelector('.services-additions'),
      'additions'
    );

  } catch (err) {
    console.error('Error loading portfolio', err);
  }
});

function renderPortfolio(wpProjects, container, categoryKey = '', hrefs = '') {
  wpProjects.forEach((project, index) => {
    const projNumber = index + 1;

    // wrapper div for each project
    const section = document.createElement('div');
    section.classList.add(`project-${projNumber}`, 'project');

    const newH3 = document.createElement('h3');
    newH3.textContent = project.title.textContent;
    section.appendChild(newH3);
    
    const firstImg = project.gallery.querySelectorAll('img')[0];
    if (firstImg) section.appendChild(firstImg.cloneNode(true));
    if (project.description) section.appendChild(project.description);

    const btn = document.createElement('button');
    const link = document.createElement('a');
    link.href = `portfolio.html?category=${categoryKey}&project=${projNumber}`;
    link.innerHTML = `<span>View Project Gallery</span><img src="btn-arrow.svg" alt="" width="20px" height="20px">`;
    btn.classList.add('project-btn');
    btn.appendChild(link);
    section.appendChild(btn);
    container.appendChild(section);

  });
}
