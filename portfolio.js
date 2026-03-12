
//wordPress api script for photos of projects


const projects = document.querySelector('#portfolio');



window.addEventListener('load', () => {
	fetch('https://harvestclicks.com/wpbackend/wp-json/wp/v2/pages/15')
	.then(res => res.json())
	.then(data => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(data.content.rendered, 'text/html');
		const elements = Array.from(doc.body.children);
		// console.log('full el\'s', elements)
		
		const wpProjects = [];
		let currentProject = null;

		elements.forEach(el => {
			if (el.tagName === 'H2') {
				currentProject = { title: el, gallery: null, description: null }
				wpProjects.push(currentProject)
			} else if (el.classList.contains('wp-block-gallery') && currentProject) {
				currentProject.gallery = el 
			} else if (el.tagName === 'P' && currentProject) {
				currentProject.description = el
			}
		})
		// console.log(wpProjects)

		let openProject = null;

		wpProjects.forEach((project, index) => {
			const projNumber = index + 1;

			const section = document.createElement('div');
			section.classList.add(`project-${projNumber}`);
			section.classList.add('project');
			section.appendChild(project.title);

			const firstImg = project.gallery.querySelectorAll('img')[0];
			if (firstImg) section.appendChild(firstImg.cloneNode(true));

			if (project.description) section.appendChild(project.description);
			projects.appendChild(section);
			section.appendChild(project.gallery);
			if (project.description !== null) {
			    section.appendChild(project.description);
			}

		    // Hide them initially
			project.gallery.classList.add('hidden');

			// create first btn
			const btn = document.createElement('button');
			btn.innerHTML = `<span>View Project</span><img src="btn-arrow.svg" alt="" width="20px" height="20px">`;
			btn.classList.add('project-btn');
			section.appendChild(btn);
			const btnText = btn.querySelector('span');
			project.btn = btn;


			let viewProject = false;

			const btnEvent = () => {
				livePortfolioHeight()
			    viewProject = !viewProject;
			    if (viewProject) {
			    	// close current project if one is open
			    	if (openProject && openProject !== project) {
			    		openProject.gallery.classList.add('hidden');
			    		btn.classList.remove('portfolio-open');
			    		openProject.btn.querySelector('span').textContent = 'View Project';
			    		openProject.viewProject = false;
			    	}
			    	openProject = project;
			    	project.gallery.classList.remove('hidden');
			    	// btn.classList.add('portfolio-open');
			    	btnText.textContent = 'Close Project';
			    } else {
			    	openProject = null;
			    	// project.gallery.style.display = 'none';
			    	project.gallery.classList.add('hidden');
			    	btn.classList.remove('portfolio-open');
			    	btnText.textContent = 'View Project';
			    }
			    if (viewProject) {
			    btn.classList.add('portfolio-open')
			}
			};
			btn.addEventListener('click', btnEvent);

			// create second btn
			const bottomBtn = document.createElement('button');
			bottomBtn.innerHTML = `<img src="bottom-btn-arrow.svg" alt="" width="20px" height="20px"> Close Project`;
			bottomBtn.classList.add('bottom-btn');
			project.gallery.appendChild(bottomBtn);

			// project positioning
			const livePortfolioHeight = () => {
				const rect = section.getBoundingClientRect();
				const projectHeight = rect.height + 'px';
			    document.documentElement.style.setProperty('--portfolioHeight', projectHeight);
			}

			bottomBtn.addEventListener('click', btnEvent);
			const resizeObserver = new ResizeObserver(entries => {
				for (let entry of entries) {
					const newHeight = entry.contentRect.height;
					if (viewProject) {
						document.documentElement.style.setProperty('--portfolioHeight', `${newHeight}px`);
					}
				}
			});
			resizeObserver.observe(section);
		});
	})
	.catch(err => console.error('Error', err))
});





	