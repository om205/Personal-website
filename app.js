const $projects = document.getElementById('project-list')
const $toggler = document.getElementById('side-pane-toggle')
const $sidePane = document.getElementById('side-pane')
const $projectList = document.getElementById('project-list')
const $model = document.getElementById('project-description')
const $modelName = document.getElementById('model-name')
const $modelImage = document.getElementById('model-image')
const $modelDescription = document.getElementById('model-description')
const $modelCodeBtn = document.getElementById('model-code-btn')
const $modelLiveBtn = document.getElementById('model-live-btn')

let projects

function togglePane() {
    if(getComputedStyle($toggler).display === 'none') return
    const displayValue = getComputedStyle($sidePane).display
    if(displayValue === 'block')
    $sidePane.style.display = 'none'
    if(displayValue === 'none')
    $sidePane.style.display = 'block'
}

function setupProjects() {
    Array.from(projects).forEach( (project, index) => {
        const { name, image, about } = project
        const html = `
        <div class="project-card" id="${index}">
            <div class="project-image">
                <img src="${image}" alt="project-image">
            </div>
            <div class="project-name">${name}</div>
            <div class="project-about">${about}</div>
        </div>
        `
        $projectList.innerHTML += html
    })
}

function showProjectDetails(id) {
    const { name, image, description, hosted, code } = projects[id]
    $modelName.innerText = name
    $modelImage.setAttribute("src",image)
    $modelDescription.innerText = description
    $modelLiveBtn.setAttribute("href",hosted)
    $modelCodeBtn.setAttribute("href",code)
    $model.style.display = 'block'
}

function closeModel() {
    $model.style.display = 'none'
}

$projects.addEventListener('click', e => {
    const classes = e.target.className
    if(!(classes == 'project-card' || classes == 'project-image' || classes == 'project-name' || classes == 'project-about'))return
    const elementID = e.target.closest('.project-card').id
    showProjectDetails(elementID)
})

$toggler.children[0].addEventListener('click', togglePane)

const fetchProjects = async () => {
    const res = await fetch('https://docs.google.com/document/d/1npvm-sttrPq1WbTG8A9zupxyLg41m1t5JHopjbdCN4Q/export?format=txt')
    const txt = await res.text()
    projects = JSON.parse(txt)
    setupProjects()
}
fetchProjects()