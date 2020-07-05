async function fetchData() {
    let response = await fetch('data.json');
    let data = await response.json();
 
    let html = '';

    data.map(job => {
      const languages = job.languages.map(language => `
        <p class="card-text right-text language d-inline skill">${language}</p>
      `);

      const tools = job.tools.map(tool => `
        <p class="card-text right-text tools d-inline mr-2 tool">${tool}</p>
      `);

        let htmlSegment = `<div class="card d-inline-block w-100">
                           <div class="card-body">
                           <img class="card-image float-left" src="${job.logo}" alt="${job.company} Image">
                           <div class="title-badges">
                           <p class="card-title">${job.company}</p>
                           <span class="badge badge-pill badge-primary ml-4 ${job.new ? 'new' : ''}">New!</span>
                           <span class="badge badge-pill badge-dark ${job.featured ? 'featured' : ''}">Featured</span></span>
                           </div>
                           <div class="jobPosition">
                           <h5 class="card-text">${job.position}</h5>
                           <p class="card-text sub-text">${job.postedAt}</p>
                           <p class="card-text sub-text"><i class="fa fa-circle" aria-hidden="true"></i>${job.contract}</p>
                           <p class="card-text sub-text"><i class="fa fa-circle" aria-hidden="true"></i>${job.location}</p>
                           </div>
                           <div class="languagesAndTools float-right mr-2">
                           <p class="card-text right-text d-inline skill">${job.role}</p> 
                           <p class="card-text right-text d-inline skill">${job.level}</p>
                           ${languages ? languages.join('') : ''}
                           ${tools ? tools.join('') : ''}
                           </div>
                           </div>
                           </div>`;
        
        html += htmlSegment;

    });

  let cardBody = document.querySelector('.container');
  cardBody.innerHTML = html;

  console.log(data);

  filterData();
}

// Filter skill tags
const filterData = () => {
  const tagsToFilterBy = [];
  let tags = '';
  let tagContent = '';
  let filterContent = '';
  
  Array.from(document.querySelectorAll('.skill')).forEach(tagEl => {
    if (!tagsToFilterBy.includes(tagEl.textContent)) {
      tagsToFilterBy.push(tagEl.textContent);
    }
    return tagsToFilterBy;
  });


  for (let i = 0; i < tagsToFilterBy.length; i++) {
    tags = tagsToFilterBy[i];
    filterContent = filterContent + `
    <li><span class="tag">${tagsToFilterBy[i]}</span></li>
    `;
  }

  let clearTag = document.createElement('p');
  clearTag.classList.add('clear');
  clearTag.innerHTML = 'Reset';

  document.querySelector('.search-container').appendChild(clearTag);
    
  let searchBody = document.querySelector('.search-container .tags');
  
  searchBody.innerHTML = filterContent;

  removeSkill();
  resetFilter();

}

// Remove skill from filter and remove job from main display

const removeSkill = () => {
  let clickedJob = '';
  let clickedTag = document.querySelectorAll('.tag').forEach(clickedTag => {

    clickedTag.addEventListener('click', e => {
      let jobCards = document.querySelectorAll('.skill').forEach(clickedJob => {
        if (clickedJob.textContent === e.target.textContent) {
          clickedJob.parentNode.parentNode.parentNode.remove();
        }        
      });
      e.target.style.display = 'none';
    });
  });

}

// Filter reset

const resetFilter = () => {
  let clearTag = document.querySelector('.clear');
  clearTag.addEventListener('click', () => {
    fetchData();
  });
}


fetchData();