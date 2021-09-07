module.exports = {
    format_time: (date) => {
        return date.toLocaleTimeString();
    },
    format_date: (date) => {
        return formatDate(date);
    },
    print_today: (aaa) => {
        let date = new Date();
        return formatDate(date);
    },


};

function formatDate(date) {
    let d = new Date(date),
        monthx = '' + (d.getMonth()),
        day = '' + d.getDate(),
        year = d.getFullYear();


    let month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    let  n  = month[monthx];

    return [day, n, year].join('-');
}
  




