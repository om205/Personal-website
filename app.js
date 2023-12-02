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
const $downloadResumeBtn = document.getElementById('resume-download-btn')
const $resumeFrame = document.getElementById('resume-frame')
const $address = document.getElementById('address')

let projects, resumeLink

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

$address.addEventListener('click', e => {
    // click to copy
    const text = e.target.innerText
    navigator.clipboard.writeText(text)
    alert('Address Copied')
})

$downloadResumeBtn.addEventListener('click', e => {
    e.preventDefault()
    window.open(resumeLink)
})

$toggler.children[0].addEventListener('click', togglePane)

const fetchProjects = async () => {
    const res = await fetch('https://docs.google.com/document/d/1npvm-sttrPq1WbTG8A9zupxyLg41m1t5JHopjbdCN4Q/export?format=txt')
    const txt = await res.text()
    projects = JSON.parse(txt)
    setupProjects()
}
fetchProjects()

const fetchResume = async () => {
    const res = await fetch('https://docs.google.com/document/d/1p5MCbIWK-esIlpyDgy85uvXKkoYvoyGfTCcdVTPvpNs/export?format=txt')
    const txt = await res.text()
    resumeLink = JSON.parse(txt).resume
    $resumeFrame.setAttribute("src",resumeLink)
}
fetchResume()

function typeWriter(text, index, interval) {
    if (index < text.length) {
        document.getElementById('typing-container').innerHTML += text.charAt(index);
        index++;
        setTimeout(function () {
            typeWriter(text, index, interval);
        }, interval);
    }
}

function startTypingAnimation() {
    let container = document.getElementById('typing-container');
    let text = ['Competitive Programmer.', 'exploring new opportunities.', 'Full Stack Web Developer.'];
    let i = 2;    
    container.innerHTML = '';
    typeWriter(text[i], 0, 150);
    i = 0;

    setInterval(function () {
        container.innerHTML = '';
        typeWriter(text[i], 0, 150);
        i++;
        if (i >= text.length) i = 0;
    }, 5000);
}
startTypingAnimation();


console.log("%cHey there, Welcome to console! 👋", "font-size: 1.25rem; color: #fff; background-color: #7A1DA1; padding: 0.5rem; border-radius: 0.5rem;")
console.log("%cTip: If some links and images do not work then try opening the website in incognito mode!", "font-size: 1.25rem; color: #eee; background-color: #7A1DA1; padding: 0.5rem; border-radius: 0.5rem;")