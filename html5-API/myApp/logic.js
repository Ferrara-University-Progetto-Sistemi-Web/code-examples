function Town(n, p) {
	this.name= n;
	this.prov=p;
	this.toString=function() {return this.name;};
}

function GO() {
	var s="";
	for (var i=0;i<p.length;i++)
		s+= ("<div class='brick'>" + p[i] + "</div>");	
	return s;
}
