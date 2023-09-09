const fs = require('fs')

const CSS_CONTENT = (() => {
    try {
        return fs.readFileSync('./src/style.css', 'utf-8')
    } catch (error) {
        console.error('Failed to read CSS file:', error)
        return ''
    }
})()

const SCRIPT = `
    <script>
        window.onload = function() {
            const container = document.querySelector('.container')
            document.body.style.height = container.offsetHeight + "px"
            document.documentElement.style.height = container.offsetHeight + "px"
        }
    </script>
`

function generateServerRows(servers) {
    return servers.map(server => `
        <tr>
            <td>${server.name}</td>
            <td>${server.players} / ${server.maxPlayers}</td>
            <td>${server.ip}</td>
        </tr>
    `).join('')
}

function generateHtml(data) {
    const serversArray = Object.entries(data.servers).map(([key, value]) => {
        return { ...value, ip: key }
    })
    serversArray.sort((a, b) => parseInt(b.players) - parseInt(a.players))

    const top5Servers = serversArray.slice(0, 5)
    const totalPlayers = serversArray.reduce((sum, server) => sum + parseInt(server.players), 0)
    const totalCapacity = serversArray.reduce((sum, server) => sum + parseInt(server.maxPlayers), 0)
    const capacityPercentage = ((totalPlayers / totalCapacity) * 100).toFixed(2)

    return `
        <html>
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Play&display=swap" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet">            
                <style>${CSS_CONTENT}</style>
            </head>
            <body>
                <div class="container">
                    <h2 class="title">PAX+ Top 5 Servers</h2>
                    <table class="servers-table">
                        <thead class="servers-table-header">
                            <tr>
                                <th>Name</th>
                                <th>Players</th>
                                <th>IP Address</th>
                            </tr>
                        </thead>
                        <tbody class="servers-table-rows">
                            ${generateServerRows(top5Servers)}
                        </tbody>
                    </table>
                    <div class="spacer"></div>
                    <table class="stats-table">    
                        <tbody class="stats-table-rows">            
                            <tr>
                                <td>Total Players: ${totalPlayers}</td>
                                <td>${capacityPercentage}% Capacity</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="spacer"></div>
                </div>
                ${SCRIPT}
            </body>
        </html>
    `
}


module.exports = { generateHtml }