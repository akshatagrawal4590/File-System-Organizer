let fs = require("fs");
let path = require("path");

let types = {
    Media: ["mp4", "mkv", "mp3"],
    Archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    Documents: ["docx", "doc", "pdf", "xlsx", "xls", "odt", "ods", "odp", "odg", "odf", "txt", "ps", "tex"],
    Apps: ["exe", "dmg", "pkg", "deb"],
    Images: ["png", "jpg"]
};

function organizeFn(dirPath) {
    //1) Input the directory path
    //2) Create a organized_files directory
    //3) Idntify categories of all the files present in the given directory
    //4) Copy/Cut the files in the organized_files directory
    if(dirPath === undefined) {
        dirPath = process.cwd();
        let destPath = path.join(dirPath, "Organized-Files");
        if(fs.existsSync(destPath) === false) {
            fs.mkdirSync(destPath);
        }
        organizeHelper(dirPath, destPath);
        return;
    }
    else {
        let doesExist = fs.existsSync(dirPath);
        if(doesExist) {
            let destPath = path.join(dirPath, "Organized-Files");
            if(fs.existsSync(destPath) === false) {
                fs.mkdirSync(destPath);
            }
            organizeHelper(dirPath, destPath);
        }
        else {
            console.log("Please enter a correct path.");
            return;
        }
    }
}

function organizeHelper(src, dest) {
    let childNames = fs.readdirSync(src);
    //console.log(childNames);
    for(let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile) {
            let category = getCategory(childNames[i]);
            //console.log(childNames[i], " belongs to ", category);
            sendFile(childAddress, dest, category);
        }
    }
}

function sendFile(srcFilePath, dest, category) {
    let categoryPath = path.join(dest, category);
    if(fs.existsSync(categoryPath) === false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath); //Copy mai pehle OS ek file banaega destination address pe aur fir source file ka content destination file mai copy hoga
    //fs.unlinkSync(srcFilePath); Write this to cut files  
}

function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);
    for(let type in types) {
        let typeArr = types[type];
        for(let i = 0; i < typeArr.length; i++) {
            if(ext === typeArr[i]) {
                return type;
            }
        }
    }
    return "Other";
}

module.exports = {
    organizeKey: organizeFn
}