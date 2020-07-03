async function fetchData() {
    let response = await fetch('data.json');
    let data = await response.json();
 
    let html = '';

    data.map(job => {
      const languages = job.languages.map(language => `
        <p class="card-text right-text language d-inline skill">${language}</p>
      `);

      const tools = job.tools.map(tool => `
        <p class="card-text right-text tools d-inline mr-2">${tool}</p>
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
}

fetchData();