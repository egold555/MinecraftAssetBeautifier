/*

Minecraft Asset Beautifier v1
Created @ 3/4/2020 by Eric Golde

*/

//settings
const ASSET_VERSION = "1.16";
const EXPORT_DIRECTORY_NAME = "export"
//end settings

var fs = require('fs-extra');
const chalk = require('chalk');
const log = console.log;

var dir_appdata = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share");
var dir_dotMinecraft = dir_appdata + "/.minecraft";
var dir_assets = dir_dotMinecraft + "/assets";
var dir_indexes = dir_assets + "/indexes";
var dir_objects = dir_assets + "/objects";
var dir_export = EXPORT_DIRECTORY_NAME;

var jsonFileLocation = dir_indexes + "/" + ASSET_VERSION + ".json";


var jsonRaw = JSON.parse(fs.readFileSync(jsonFileLocation, 'utf8'));
var objects = jsonRaw.objects;
var keys = Object.keys(objects);

//delete and create new folder
fs.removeSync(dir_export);
fs.mkdirpSync(dir_export);

for (var i = 0; i < keys.length; i++) {
    var fileName = keys[i];
    var internalJson = objects[fileName];
    var hash = internalJson.hash;
    var sourceFile = dir_objects + "/" + hash.substring(0, 2) + "/" + hash;
    //mkdirp.sync("export/" + newFolderName);

    fs.copySync(sourceFile, dir_export + "/" + fileName);
    log("Exported: " + chalk.yellow(hash) + chalk.white(' to ') + chalk.cyan(fileName));
}

log(chalk.green("Successfully exported " + keys.length + " files."))
