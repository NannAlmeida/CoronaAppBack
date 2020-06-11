const api = require('../../services/api');

function getImageOfStates(stateName) {

    // Deixando as palavras minúsculas
    const stateNameLower = stateName.toLowerCase();
    
    // Tira a assentuação
    const transformName = stateNameLower.normalize('NFKD');
    const newStateName = transformName.replace(/[\u0300-\u036f]/g, "");
    
    // Verificando se o nome do estado é composto
    const searchSpaceInBetween = newStateName.indexOf(' ');

    // Caso houver ele não adiciona _
    if(searchSpaceInBetween === -1) {
        const url = `http://www.quatrocantos.com/clipart/bandeiras/bandeiras_estados_brasileiros/${newStateName}.gif`;
        return url;
    }

    const stateNameForUrl = newStateName.replace(/\s/g, '_');
    const url = `http://www.quatrocantos.com/clipart/bandeiras/bandeiras_estados_brasileiros/${stateNameForUrl}.gif`;

    return url;
}

module.exports = {
    async index (request, response) {
        const getStates = (await api.get('/report/v1')).data;

        const states = getStates.data;
        const statesInfos = [];

        // Organizando estados por ordem alfabética
        const sortStates = states.sort((a, b) => {
            return (a.state > b.state) ? 1 : ((b.state > a.state) ? -1 : 0);
        });

        for(let i = 0; i < sortStates.length; i++) {
            const id = parseInt(i) + 1;
            const stateName = sortStates[i].state;
            const stateUF = sortStates[i].uf;
            const casesForState = sortStates[i].cases;
            const deathsForState = sortStates[i].deaths;
            const casesSuspectsForState = sortStates[i].suspects;
            const refusesCasesForState = sortStates[i].refuses;
            const getImage = getImageOfStates(stateName);
            
            // Convertendo data e horário
            const dateTime = new Date(sortStates[i].datetime);
            const formatDateTime = `${dateTime.getDate()}-${parseInt(dateTime.getMonth()) + 1}-${dateTime.getFullYear()} ${dateTime.getHours()}:${dateTime.getMinutes()}`;

            statesInfos.push({
                id: id.toString(),
                state: stateName,
                uf: stateUF,
                cases: casesForState,
                deaths: deathsForState,
                suspects: casesSuspectsForState,
                refuses: refusesCasesForState,
                flag: getImage,
                updated: formatDateTime
            });
        }

        response.send(statesInfos);
    }
};