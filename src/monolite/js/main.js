// Case-insensitive contains()
$.expr[":"].Contains = function(a,i,m){
    return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
};

function Filter(form, list) {
    this.el = list;
    // Filter input
    var input = form.find("input[type=text]:first");
    // Filter function
    var self = this;
    $(input).change(function () {
        var filter = $(this).val();
        if(filter) {
            $(self.el).find("a:not(:Contains(" + filter + "))").parent().hide();
            $(self.el).find("a:Contains(" + filter + ")").parent().show();
        } else {
            $(self.el).find("li").show();
        }

        // Hide titles when group is empty
        $(self.el).find("ul").each(function () {
            if (!$(this).find("li:visible").length) {
                $(this).prev("h2").hide();
            } else {
                $(this).prev("h2").show();
            }
        });
        return false;
    }).keyup( function () { $(this).change(); });

    return this;
}

// Collapsible articles
$("article").each(function () {
    var that = $(this);
    var header = that.children("a");
    var body = that.children(".body");
    header.click(function(argument) {
		body.toggle();
		return false;
    });
});

// Expanding the article on link click and scrolling down to it
$("#sidebar a").each(function () {
    var that = $(this);
    var id = that.attr("href").substring(1);
    that.click(function (e) {
        var header = $("a#"+ id);
        $("html, body").animate({ scrollTop: header.offset().top}, "fast");
    });
});

// Making our navigation sticky
new Filter($("#filter-form"), $("#sidebar > ul"));
