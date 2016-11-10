// Case-insensitive contains()
$.expr[":"].Contains = function (a, i, m) {
	return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};

function Filter(form, list) {
	this.el = list;
	// Filter input
	var input = form.find("input[type=text]:first");
	// Filter function
	var self = this;
	$(input).change(function () {
		var filter = $(this).val();
		if (filter) {
			$(self.el).find("a:not(:Contains(" + filter + "))").parent().hide();
			$(self.el).find("a:Contains(" + filter + ")").parent().show();
		} else {
			$(self.el).find("li").show();
		}

		// Hide titles when group is empty
		$(self.el).find("ul").each(function () {
			if (!$(this).find("li:visible").length) {
				$(this).prev("h4", "h3", "h2", "h1").hide();
			} else {
				$(this).prev("h4", "h3", "h2", "h1").show();
			}
		});
		return false;
	}).keyup(function () {
		$(this).change();
	});

	return this;
}

$(".api-body").hide();
$("a.collapse-expand-link").click(function () {
	$('.api-body').toggle();
	return false;
});

// Collapsible articles
$("article").each(function () {
	var that = $(this);
	var header = that.children("a");
	var body = that.children(".api-body");
	header.click(function (argument) {
		body.toggle();
		return false;
	});
});

// Expanding the article on link click and scrolling down to it
$("#sidebar a").each(function () {
	var that = $(this);
	var id = that.attr("href").substring(that.attr("href").indexOf("#") + 1);
	that.click(function (e) {
		var header = $("a#" + id);
		if (header) {
			$("html, body").animate({scrollTop: header.offset().top}, "fast");
		}
	});
});

// Making our navigation sticky
new Filter($("#filter-form"), $("#sidebar > ul"));
