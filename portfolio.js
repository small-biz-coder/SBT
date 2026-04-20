const decks = document.querySelector('#port-decks-btn');
const garages = document.querySelector('#port-garages-btn');
const additions = document.querySelector('#port-additions-btn');
const misc = document.querySelector('#port-misc-btn');
const body = document.querySelector('body');

const toggleGarages = () => {
  body.classList.add('port-garages');
  if (body.classList.contains("port-additions") ||
    body.classList.contains('port-misc')) {
    body.classList.remove('port-additions', 'port-misc');
  }
}
const toggleAdditions = () => {
  body.classList.add('port-additions');
  if (body.classList.contains("port-garages") ||
    body.classList.contains('port-misc')) {
    body.classList.remove('port-garages', 'port-misc');
  }
}
const toggleMisc = () => {
  body.classList.add('port-misc');
  if (body.classList.contains("port-garages") ||
    body.classList.contains('port-additions')) {
    body.classList.remove('port-garages', 'port-additions');
  }
}
const toggleDecks = () => {
  body.classList.remove('port-additions', 'port-garages', 'port-misc');
}
decks.addEventListener('click', toggleDecks);

garages.addEventListener('click', toggleGarages);

additions.addEventListener('click', toggleAdditions);

misc.addEventListener('click', toggleMisc);

window.addEventListener('load', async () => {
  try {
    const [decks, garages, additions, misc] = await Promise.all([
    	fetchDecks(),
    	fetchGarages(),
    	fetchAdditions(),
    	fetchMisc()
    ]);

    renderPortfolio(decks,
    	document.querySelector('.decks-gallery'),
    	'deck');
    renderPortfolio(garages,
    	document.querySelector('.garages-gallery'),
    	'garage');
    renderPortfolio(additions,
    	document.querySelector('.additions-gallery'),
    	'addition');
    renderPortfolio(misc,
    	document.querySelector('.misc-gallery'),
    	'misc');
    const params = new URLSearchParams(window.location.search);
    const targetCategory = params.get('category');
    const targetProject = parseInt(params.get('project'));

    if (targetCategory && targetProject) {
      const categoryMap = {
        decks: { toggle: toggleDecks, selector: '.decks-gallery' },
        garages: { toggle: toggleGarages, selector: '.garages-gallery' },
        additions: { toggle: toggleAdditions, selector: '.additions-gallery' },
      };
      const entry = categoryMap[targetCategory];
      if (entry) {
        entry.toggle();
        const gallery = document.querySelector(entry.selector);
        const projectDiv = gallery?.querySelector(`.project-${targetProject}`);
        const jsBtn = projectDiv?.querySelector('.project-btn');

        if (jsBtn) {
          jsBtn.click();

          setTimeout(() => {
            projectDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    }
  } catch (err) {
    console.error('Error loading api\'s', err);
  }
});

function renderPortfolio(wpProjects, container, spanTxt = '') {
  let openProject = null;

  wpProjects.forEach((project, index) => {
    const projNumber = index + 1;
    const section = document.createElement('div');
    section.classList.add(`project-${projNumber}`, 'project');
    const newH3 = document.createElement('h3');
    newH3.textContent = project.title.textContent;
    section.appendChild(newH3);

    const firstImg = project.gallery.querySelectorAll('img')[0];
    if (firstImg) section.appendChild(firstImg.cloneNode(true));

    const category = document.createElement('span');
    category.innerText = spanTxt;
    section.appendChild(category);

    const closeXBox = document.createElement('div');
    closeXBox.classList.add('close-x-box');
    project.gallery.appendChild(closeXBox)
    const closeX1 = document.createElement('span');
    closeX1.classList.add('close-gallery-top1');
    closeXBox.appendChild(closeX1);
    const closeX2 = document.createElement('span');
    closeX2.classList.add('close-gallery-top2');
    closeXBox.appendChild(closeX2);

    if (project.description) section.appendChild(project.description);

    container.appendChild(section);
    section.appendChild(project.gallery);


    if (project.description !== null) section.appendChild(project.description);

    project.gallery.classList.add('hidden');

    // View Project button
    const btn = document.createElement('button');
    btn.innerHTML = `<span>View Project</span><img src="btn-arrow.svg" alt="" width="20px" height="20px">`;
    btn.classList.add('project-btn');
    section.appendChild(btn);
    const btnText = btn.querySelector('span');
    project.btn = btn;

    let viewProject = false;

    const livePortfolioHeight = () => {
      const rect = section.getBoundingClientRect();
      document.documentElement.style.setProperty('--portfolioHeight', rect.height + 'px');
    };

    const btnEvent = () => {
      livePortfolioHeight();
      viewProject = !viewProject;

      if (viewProject) {
        if (openProject && openProject !== project) {
          openProject.gallery.classList.add('hidden');
          openProject.btn.classList.remove('portfolio-open');
          openProject.btn.querySelector('span').textContent = 'View Project';
          openProject.viewProject = false;
        }
        openProject = project;
        project.gallery.classList.remove('hidden');
        btnText.textContent = 'Close Project';
        btn.classList.add('portfolio-open');
      } else {
        openProject = null;
        project.gallery.classList.add('hidden');
        btn.classList.remove('portfolio-open');
        btnText.textContent = 'View Project';
      }
    };

    btn.addEventListener('click', btnEvent);

    // Close button inside gallery
    const bottomBtn = document.createElement('button');
    bottomBtn.innerHTML = `<img src="bottom-btn-arrow.svg" alt="" width="20px" height="20px"> Close Project`;
    bottomBtn.classList.add('bottom-btn');
    project.gallery.appendChild(bottomBtn);
    bottomBtn.addEventListener('click', btnEvent);
    closeXBox.addEventListener('click', btnEvent);

    // Resize observer
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (viewProject) {
          document.documentElement.style.setProperty('--portfolioHeight', `${entry.contentRect.height}px`);
        }
      }
    });
    resizeObserver.observe(section);
  });
}

