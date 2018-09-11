
var timeoutHandle = window.setTimeout(error, 20 * 1000);
var doneModify = false;
var regionsUsed = new Set();
var prevRegion = '';
var first = true;
var runOnce = true

$('.aws-plc-content').on("DOMSubtreeModified", function () {


    if (!doneModify) {
        window.clearTimeout(timeoutHandle);
        timeoutHandle = window.setTimeout(modifyTable, 3 * 1000);
    }
});

function modifyTable() {
    /*
    if (!doneModify) {
        if (first) {
            let x = ($($($($(".aws-controls")[0]).find('.button'))[0].children))
            $.each(x, function (index, value) {
                console.log("val")
                if ($(this).attr('class') == "js-active") {
                    prevRegion = this.innerText
                    regionsUsed.add(prevRegion);
                    first = false;
                    console.log("First")
                    console.log(regionsUsed)
                }
            })

        }
    
        
        let x = $(".aws-controls");
        $.each(x, function (index, value) {
            $($($(value).find('.button'))[0].children).click(function () {
                if (prevRegion != this.innerHTML) {
                    prevRegion == this.innerHTML
                    if ($(this).attr('class') != "js-active") {
                        if (!regionsUsed.has(this.innerText) & runOnce) {
                            runOnce = true;
                            console.log('inside')
                            regionsUsed.add(this.innerText)
                            window.clearTimeout(timeoutHandle);
                            timeoutHandle = window.setTimeout(modifyTable, 3 * 1000);
                        }
                        console.log(regionsUsed)
                    }
                }
            })
        });
    }
    */
    if (!doneModify) {
        let x = $(".aws-controls");
        $.each(x, function (index, value) {
            $($($(value).find('.button'))[0].children).click(function () {

                if ($(this).attr('class') != "js-active") {
                    window.clearTimeout(timeoutHandle);
                    timeoutHandle = window.setTimeout(modifyTable, 3 * 1000);
                }

            })
        });
    }
    doneModify = true

    var table_headers = $('tr:contains("Price Per Hour")')
    let removeIndicies = []
    $.each(table_headers, function (index, value) {
        if (value.innerText.indexOf('Price Per Month') >= 0) {
            removeIndicies.push(index)
        } else {
            value.innerHTML = value.innerHTML + '<th>Price Per Month</th>';
        }
    });

    var cells = table_headers.parent().parent().find('tr[data-plc-offer-id]');
    console.log(cells)
    var pattern = new RegExp("^\\$(\\d+\\.\\d+)$");
    $.each(cells, function (index, value) {
        var message = $(value).find('td:last-child')[0].innerText;
        let matches = pattern.exec(message);
        if (matches != null && matches.length > 1 && value.innerHTML.split("<td>").length <= 3) {
            let cost = parseFloat(matches[1]);
            let monthlyCost = (cost * 24 * 30.5).toFixed(2);
            value.innerHTML = value.innerHTML + '<td>$' + monthlyCost + '</td>';
        }
    });
}

function error() {
    console.log("error loading table")
}



