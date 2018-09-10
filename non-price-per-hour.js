
var timeoutHandle = window.setTimeout(error, 20 * 1000);
var doneModify = false;

$('.aws-plc-content').on("DOMSubtreeModified", function () {


    if (!doneModify) {
        window.clearTimeout(timeoutHandle);
        timeoutHandle = window.setTimeout(modifyTable, 3 * 1000);
    }
});

function modifyTable() {
    if (!doneModify) {
        $($($($(".aws-controls")[0]).find('.button'))[0].children).click(function () {
            if ($(this).attr('class') != "js-active") {
                window.clearTimeout(timeoutHandle);
                timeoutHandle = window.setTimeout(modifyTable, 3 * 1000);
            }
        });
    }
    doneModify = true

    /*
    var fields = $('.aws-plc-content');
    $.each(fields, function(index, value){
        let table = value.children[0].children[0]
        let thead = table.children[0]
        let tr_test = thead.children[0]
        console.log($(thead).find('Price Per Hour'))
        
        if ($(tr_test).find('Price Per Hour').length >0){
            tr_test.innerHTML = tr_test.innerHTML + '<th>Price Per Month</th>'
        }
    })
    */

   var table_headers = $('tr:contains("Price Per Hour")')
   $.each(table_headers, function(index, value){
    value.innerHTML = value.innerHTML + '<th>Price Per Month</th>'
    table = $(value.parentNode.parentNode)[0]
    console.log(table)

   })



    
    /*
    const cells = Array.prototype.slice.call(document.querySelectorAll('tr[data-plc-offer-id] > td:last-child'), 0);
    const pattern = new RegExp("^\\$(\\d+\\.\\d+) $");
    //console.log(cells);
    $.each(cells, function (index, value) {
        var message = value.innerText;
        let matches = pattern.exec(message);
        if (matches != null && matches.length > 1) {
            let cost = parseFloat(matches[1]);
            let monthlyCost = (cost * 24 * 30.5).toFixed(2);
            value.innerText = value.innerText + ' | $' + monthlyCost + ' per Month';
        }
    });
    */
}

function error() {
    console.log("error loading table")
}



