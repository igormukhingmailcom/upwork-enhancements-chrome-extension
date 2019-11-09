$().ready(function(){
    var table = $('.tab-pane.active timesheet:first table:first');

    var dailyEarnings = new Array(
        0,0,0,0,0,0,0
    );

    $('tbody tr.clickable-row', table).each(function(){
        // Parsing rate
        var rate = $('td:eq(9)', this).text().trim();

        if (rate == 'N/A') {
            return;
        }

        rate = rate.substr(1); // Cut dollar sign
        rate = rate.substr(0, rate.length-3); // Cut "/hr"
        rate = parseFloat(rate);

        // Add per-cell earnings
        $('td:gt(0):lt(7):not(.state-future)', this).each(function(index){
            var workedHours = $('a span', this).text().trim();
            if (workedHours) {
                var aWorkedHours = workedHours.split(':');
                iWorkedHours = parseInt(aWorkedHours[0]) + parseInt(aWorkedHours[1])/60;
                earned = Number(iWorkedHours * rate, 2).toFixed(2);
                $("<div class='extension-per-cell-earnings'>$" + earned + "</div>").appendTo(this);

                // Collect daily earnings
                dailyEarnings[index] += 1*earned;
            }
        });
    });

    // Print daily earnings
    var html = '';
    for (index in dailyEarnings) {
        var earnings = dailyEarnings[index] ? '$'+Number(dailyEarnings[index]).toFixed(2) : '';
        html += "<td class='extension-daily-earnings text-center'>"+earnings+"</td>";
    }
    $('tr td[colspan=7]', table).replaceWith(html);
});
