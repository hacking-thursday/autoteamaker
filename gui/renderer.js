var term = new Terminal();
term.open(document.getElementById('terminal'));

window.api.receive("terminal.incomingData", (data) => {
    term.write(data);
});

document.getElementById('up').onclick = () => { window.api.send("terminal.command", "./bin/stepper 1"); }
document.getElementById('down').onclick = () => { window.api.send("terminal.command", "./bin/stepper -1"); }
document.getElementById('tea01').onclick = () => { window.api.send("terminal.command", "./bin/tea 1 9"); }
document.getElementById('tea02').onclick = () => { window.api.send("terminal.command", "./bin/tea 2 9"); }
document.getElementById('tea03').onclick = () => { window.api.send("terminal.command", "./bin/tea 3 9"); }
document.getElementById('tea04').onclick = () => { window.api.send("terminal.command", "./bin/tea 4 9"); }
document.getElementById('tea05').onclick = () => { window.api.send("terminal.command", "./bin/tea 5 9"); }
document.getElementById('tea06').onclick = () => { window.api.send("terminal.command", "./bin/tea 6 9"); }
document.getElementById('tea07').onclick = () => { window.api.send("terminal.command", "./bin/tea 7 9"); }

/*
 * Reference: https://stackoverflow.com/a/494348
 */
function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}
