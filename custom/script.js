const scrolly = d3.select('#scrolly')
const figure = scrolly.select('figure')
const article = scrolly.select('article')
const steps = article.selectAll('.step')

const scroller = scrollama()

const handleResize = () => {
    const stepHeight = Math.floor(window.innerHeight * 0.75)
    steps.style('height', `${stepHeight}px`)

    const figureHeight = window.innerHeight / 2
    const figureMarginTop = (window.innerHeight - figureHeight) / 2

    figure
        .style('height', `${figureHeight}px`)
        .style('top', `${figureMarginTop}px`)


    console.log('Step:', stepHeight);
    console.log('Figure Height:', figureHeight);
    console.log('Figure Margin:', figureMarginTop);

    d3.select('#outro').style('height', `${stepHeight}px`)

    scroller.resize()
}

const handleStepEnter = (response) => {
    console.log(response)
    steps.classed('is-active', (_, i) => i === response.index)

    figure.select('p').text(response.index + 1)
}

const handleStepExit = (response) => {
    console.log(response)
}

const handleStepProgress = (response) => {
    console.log(response)
    const el = d3.select(response.element)
    el.style('background-color', `rgba(218, 165, 32, ${response.progress})`)
    el.select('.progress').text(d3.format('.1%')(response.progress))
}

const init = () => {
    handleResize()

    scroller
        .setup({
            step: '#scrolly article .step',
            debug: true,
            progress: true,
            offset: 0.5
        })
        .onStepEnter(handleStepEnter)
        .onStepExit(handleStepExit)
        .onStepProgress(handleStepProgress)

    window.addEventListener('resize', handleResize())
}

init()