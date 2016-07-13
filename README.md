Fetch actual names of Github users from a list of usernames.

To use the script, open the index.html file from a browser and choose a .csv file that contains a list of Github usernames.

For the users who has not set their actual name in their Github account, 'null' will be shown.

The script only works for .csv files. If you want to use some other file type having a different mode of delimitation, you can change the delimiter value in the following line of code to suit what you have.

var usernames = contents.split('DELIMETER').map(function(s) {return decodeURI(s.trim())});