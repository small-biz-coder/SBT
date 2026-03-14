

window.addEventListener('load', async () => {
  try {
    const [decks, garages, additions] = await Promise.all([
      fetchDecks(),
      fetchGarages(),
      fetchAdditions()
    ]);
    renderPortfolio(decks,
      document.querySelector('.services-decks'),
      'portfolio.html#decks-gallery'
    );
    renderPortfolio(garages,
      document.querySelector('.services-garages'),
      'portfolio.html#garages-gallery'
    );
    renderPortfolio(additions,
      document.querySelector('.services-additions'),
      'portfolio.html#additions-gallery'
    );

  } catch (err) {
    console.error('Error loading portfolio', err);
  }
});

function renderPortfolio(wpProjects, container, hrefs = '') {
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
    link.href = hrefs || 'portfolio.html';
    link.innerHTML = `<span>View Project Gallery</span><img src="btn-arrow.svg" alt="" width="20px" height="20px">`;
    btn.classList.add('project-btn');
    btn.appendChild(link);
    section.appendChild(btn);
    container.appendChild(section);

  });
}
