#!/usr/bin/env node

const fs = require('fs'),
    path = require('path'),
    tpl = require(path.join(__dirname, 'template')),
    pluralize = require(path.join(__dirname, 'tools', 'pluralize.js')),
    pwd = process.cwd(),
    operation = process.argv[2] // new or delete

let mpkgName = process.argv[3], // 模块包名
    mName = process.argv[4], // 模块名称
    desc = process.argv[5] || '', // 模块描述
    pkgName, //项目包名
    entity, //对象名
    url; //url名称

// UserData -> userData
String.prototype.firstLowerCase = function() {
    return this.replace(/^[A-Z]/g, function(m) {
        return m.toLowerCase();
    });
}

// user -> User
String.prototype.firstUpperCase = function() {
    return this.replace(this.charAt(0), this.charAt(0).toUpperCase());
}

// UserData -> user_data
String.prototype.snakeStr = function(symbol) {
    return this.firstLowerCase().replace(/([A-Z])/g, `${symbol}$1`).toLowerCase();
}

// category -> categories || person -> people || words -> words
String.prototype.pluralize = function() {
    return pluralize.default(this);
}

// load web4j.json
try {
    let conf = require(path.join(pwd, 'web4j.json'));
    if (conf.pkgName == null || conf.pkgName == "") {
        console.error(`---> Package Name Can't be Empty!`);
        process.exit(2);
    } else {
        pkgName = conf.pkgName;
    }
} catch (e) {
    console.error(`---> Can't find web4j.json!`);
    process.exit(2);
}

if (!mpkgName) {
    console.error(`---> Module Package Can't be Empty!`);
    process.exit(2);
}

if (!mName) {
    console.error(`---> Module Name Can't be Empty!`);
    process.exit(2);
}

mName = mName.firstUpperCase();
entity = mName.firstLowerCase();
urlName = mName.snakeStr('-');

switch (operation) {
    case 'new':
        createModule();
        break;
    case 'del':
        deleteModule();
        break;
    default:
        usageInfo();
        break;
}

function usageInfo() {
    const usage = `Version:${require(path.join(__dirname, 'package.json')).version}\nUsage: web4j operation [new | delete] option [module_package] [module_name] [module_desc]\n\nExample:\n\t web4j new user User 用户 \t\t Create Controller,Service,Dao,VO files.\n\t web4j del user User \t\t Delete all the module files.`;
    console.log(usage);
}

async function createModule() {
    await createVO();
    await createDao();
    await createService();
    await createController();
}

async function createVO() {
    // 3.create vo_inlist
    await new Promise((resolve, reject) => {
        let voInList = tpl.voInList.replace(/\$pkgName/g, pkgName)
            .replace(/\$createAt/g, new Date())
            .replace(/\$mName/g, mName)
            .replace(/\$mpkgName/g, mpkgName);
        let pkgPath = ""
        pkgName.split('.').forEach((v) => { pkgPath += v + '/' });
        let dir = path.join(pwd, 'src', 'main', 'java', pkgPath, 'vo', 'input', mpkgName);
        let file = path.join(dir, 'Input' + mName + 'ListVO.java');
        var exist = fs.existsSync(dir);
        if (!exist) {
            fs.mkdir(dir, (err) => {
                if (err)
                    throw err;
                fs.writeFile(file, voInList, (err) => {
                    if (err)
                        throw err;
                    resolve();
                })
            });
        } else {
            fs.writeFile(file, voInList, (err) => {
                if (err)
                    throw err;
                resolve();
            })
        }
    });

    // 3.create vo_outlist
    await new Promise((resolve, reject) => {
        let voOutList = tpl.voOutList.replace(/\$pkgName/g, pkgName)
            .replace(/\$createAt/g, new Date())
            .replace(/\$mName/g, mName)
            .replace(/\$mpkgName/g, mpkgName);
        let pkgPath = ""
        pkgName.split('.').forEach((v) => { pkgPath += v + '/' });
        let dir = path.join(pwd, 'src', 'main', 'java', pkgPath, 'vo', 'output', mpkgName);
        let file = path.join(dir, 'Output' + mName + 'ListVO.java');
        var exist = fs.existsSync(dir);
        if (!exist) {
            fs.mkdir(dir, (err) => {
                if (err)
                    throw err;
                fs.writeFile(file, voOutList, (err) => {
                    if (err)
                        throw err;
                    resolve();
                })
            });
        } else {
            fs.writeFile(file, voOutList, (err) => {
                if (err)
                    throw err;
                resolve();
            })
        }
    });

    // 3.create vo_update
    await new Promise((resolve, reject) => {
        let voUpdate = tpl.voUpdate.replace(/\$pkgName/g, pkgName)
            .replace(/\$createAt/g, new Date())
            .replace(/\$mName/g, mName)
            .replace(/\$mpkgName/g, mpkgName);
        let pkgPath = ""
        pkgName.split('.').forEach((v) => { pkgPath += v + '/' });
        let dir = path.join(pwd, 'src', 'main', 'java', pkgPath, 'vo', 'input', mpkgName);
        let file = path.join(dir, 'InputUpdate' + mName + 'VO.java');
        var exist = fs.existsSync(dir);
        if (!exist) {
            fs.mkdir(dir, (err) => {
                if (err)
                    throw err;
                fs.writeFile(file, voUpdate, (err) => {
                    if (err)
                        throw err;
                    resolve();
                })
            });
        } else {
            fs.writeFile(file, voUpdate, (err) => {
                if (err)
                    throw err;
                resolve();
            })
        }
    });

    // 4.create vo_add
    await new Promise((resolve, reject) => {
        let voAdd = tpl.voAdd.replace(/\$pkgName/g, pkgName)
            .replace(/\$createAt/g, new Date())
            .replace(/\$mName/g, mName)
            .replace(/\$mpkgName/g, mpkgName);
        let pkgPath = ""
        pkgName.split('.').forEach((v) => { pkgPath += v + '/' });
        let dir = path.join(pwd, 'src', 'main', 'java', pkgPath, 'vo', 'input', mpkgName);
        let file = path.join(dir, 'InputAdd' + mName + 'VO.java');
        var exist = fs.existsSync(dir);
        if (!exist) {
            fs.mkdir(dir, (err) => {
                if (err)
                    throw err;
                fs.writeFile(file, voAdd, (err) => {
                    if (err)
                        throw err;
                    resolve();
                })
            });
        } else {
            fs.writeFile(file, voAdd, (err) => {
                if (err)
                    throw err;
                resolve();
            })
        }
    });
    console.log(` ---> Create VO\tsuccess...`);
}

async function createDao() {
    await new Promise((resolve, reject) => {
        let dao = tpl.dao.replace(/\$pkgName/g, pkgName)
            .replace(/\$createAt/g, new Date())
            .replace(/\$mName/g, mName)
            .replace(/\$entity/g, entity)
            .replace(/\$mpkgName/g, mpkgName);
        let pkgPath = ""
        pkgName.split('.').forEach((v) => { pkgPath += v + '/' });
        let dir = path.join(pwd, 'src', 'main', 'java', pkgPath, 'dao', mpkgName);
        let file = path.join(dir, mName + 'Dao.java');
        var exist = fs.existsSync(dir);
        if (!exist) {
            fs.mkdir(dir, (err) => {
                if (err)
                    throw err;
                fs.writeFile(file, dao, (err) => {
                    if (err)
                        throw err;
                    console.log(` ---> Create Dao\tsuccess...`);
                    resolve();
                })
            });
        } else {
            fs.writeFile(file, dao, (err) => {
                if (err)
                    throw err;
                console.log(` ---> Create Dao\tsuccess...`);
                resolve();
            })
        }
    });
}

async function createService() {
    //create service
    await new Promise((resolve, reject) => {
        let service = tpl.service.replace(/\$pkgName/g, pkgName)
            .replace(/\$createAt/g, new Date())
            .replace(/\$mName/g, mName)
            .replace(/\$mpkgName/g, mpkgName);
        let pkgPath = ""
        pkgName.split('.').forEach((v) => { pkgPath += v + '/' });
        let dir = path.join(pwd, 'src', 'main', 'java', pkgPath, 'service', mpkgName);
        let file = path.join(dir, mName + 'Service.java');
        var exist = fs.existsSync(dir);
        if (!exist) {
            fs.mkdir(dir, (err) => {
                if (err)
                    throw err;
                fs.writeFile(file, service, (err) => {
                    if (err)
                        throw err;
                    console.log(` ---> Create Service\tsuccess...`);
                    resolve();
                })
            });
        } else {
            fs.writeFile(file, service, (err) => {
                if (err)
                    throw err;
                console.log(` ---> Create Service\tsuccess...`);
                resolve();
            })
        }
    });

    //create service_impl
    await new Promise((resolve, reject) => {
        let serviceImpl = tpl.serviceImpl.replace(/\$pkgName/g, pkgName)
            .replace(/\$createAt/g, new Date())
            .replace(/\$mName/g, mName)
            .replace(/\$entity/g, entity)
            .replace(/\$mpkgName/g, mpkgName);
        let pkgPath = ""
        pkgName.split('.').forEach((v) => { pkgPath += v + '/' });
        let dir = path.join(pwd, 'src', 'main', 'java', pkgPath, 'service', mpkgName, 'impl');
        let file = path.join(dir, mName + 'ServiceImpl.java');
        var exist = fs.existsSync(dir);
        if (!exist) {
            fs.mkdir(dir, (err) => {
                if (err)
                    throw err;
                fs.writeFile(file, serviceImpl, (err) => {
                    if (err)
                        throw err;
                    console.log(` ---> Create ServiceImpl\tsuccess...`);
                    resolve();
                })
            });
        } else {
            fs.writeFile(file, serviceImpl, (err) => {
                if (err)
                    throw err;
                console.log(` ---> Create ServiceImpl\tsuccess...`);
                resolve();
            })
        }
    });
}

async function createController() {
    await new Promise((resolve, reject) => {
        let controller = tpl.controller.replace(/\$pkgName/g, pkgName)
            .replace(/\$createAt/g, new Date())
            .replace(/\$mName/g, mName)
            .replace(/\$entity/g, entity)
            .replace(/\$desc/g, desc)
            .replace(/\$urlName/g, urlName)
            .replace(/\$mpkgName/g, mpkgName);
        let pkgPath = ""
        pkgName.split('.').forEach((v) => { pkgPath += v + '/' });
        let dir = path.join(pwd, 'src', 'main', 'java', pkgPath, 'controller', mpkgName);
        let file = path.join(dir, mName + 'Controller.java');
        var exist = fs.existsSync(dir);
        if (!exist) {
            fs.mkdir(dir, (err) => {
                if (err)
                    throw err;
                fs.writeFile(file, controller, (err) => {
                    if (err)
                        throw err;
                    console.log(` ---> Create Controller\tsuccess...`);
                    resolve();
                })
            });
        } else {
            fs.writeFile(file, controller, (err) => {
                if (err)
                    throw err;
                console.log(` ---> Create Controller\tsuccess...`);
                resolve();
            })
        }
    })
}



async function deleteModule() {
    let pkgPath = ""
    pkgName.split('.').forEach((v) => { pkgPath = pkgPath + v + '/' })
        // 3.delete vo_inlist
    await new Promise((resolve, reject) => {
        fs.unlink(path.join(pwd, 'src', 'main', 'java', pkgPath, 'vo', 'input', mpkgName, 'Input' + mName + 'ListVO.java'), (err) => { // asynchronous delete
            if (err != null)
                console.error(err);
            resolve();
        });
    });
    // 3.delete vo_update
    await new Promise((resolve, reject) => {
        fs.unlink(path.join(pwd, 'src', 'main', 'java', pkgPath, 'vo', 'input', mpkgName, 'InputUpdate' + mName + 'VO.java'), (err) => { // asynchronous delete
            if (err != null)
                console.error(err);
            resolve();
        });
    });
    // 3.delete vo_add
    await new Promise((resolve, reject) => {
        fs.unlink(path.join(pwd, 'src', 'main', 'java', pkgPath, 'vo', 'input', mpkgName, 'InputAdd' + mName + 'VO.java'), (err) => { // asynchronous delete
            if (err != null)
                console.error(err);
            resolve();
        });
    });
    // 3.delete vo_outlist
    await new Promise((resolve, reject) => {
        fs.unlink(path.join(pwd, 'src', 'main', 'java', pkgPath, 'vo', 'output', mpkgName, 'Output' + mName + 'ListVO.java'), (err) => { // asynchronous delete
            if (err != null)
                console.error(err);
            resolve();
        });
    });
    console.log(` ---> Delete VO\tsuccess...`);
    // 4.delete dao
    await new Promise((resolve, reject) => {
        fs.unlink(path.join(pwd, 'src', 'main', 'java', pkgPath, 'dao', mpkgName, mName + 'Dao.java'), (err) => { // asynchronous delete
            if (err != null)
                console.error(err);
            else
                console.log(` ---> Delete Dao\tsuccess...`);
            resolve();
        });
    });
    // 7.delete service
    await new Promise((resolve, reject) => {
        fs.unlink(path.join(pwd, 'src', 'main', 'java', pkgPath, 'service', mpkgName, mName + 'Service.java'), (err) => { // asynchronous delete
            if (err != null)
                console.error(err);
            else
                console.log(` ---> Delete Service\tsuccess...`);
            resolve();
        });
    });
    // 7.delete service_impl
    await new Promise((resolve, reject) => {
        fs.unlink(path.join(pwd, 'src', 'main', 'java', pkgPath, 'service', mpkgName, 'impl', mName + 'ServiceImpl.java'), (err) => { // asynchronous delete
            if (err != null)
                console.error(err);
            else
                console.log(` ---> Delete ServiceImpl\tsuccess...`);
            resolve();
        });
    });
    // 8.delete controller
    await new Promise((resolve, reject) => {
        fs.unlink(path.join(pwd, 'src', 'main', 'java', pkgPath, 'controller', mpkgName, mName + 'Controller.java'), (err) => { // asynchronous delete
            if (err != null)
                console.error(err);
            else
                console.log(` ---> Delete Controller\tsuccess...`);
            resolve();
        });
    });
}