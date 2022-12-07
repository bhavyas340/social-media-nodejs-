module.exports.home =function(req,res){
    return res.end('<h1>Express is up for Codeial!!</h1>');
};

module.exports.about = function(req,res){
    return res.end(
        '<p>Name : Bhavya </p>'+'<p>I am from Udaipur</p>' //this is how we can use html
);
}