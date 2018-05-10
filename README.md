# web4j

Scaffold for Spring Boot.

Spring Boot 项目的脚手架，自动生成三层架构的文件。

### Usage

```shell
Version:1.0.0
Usage: web4j [new | delete] [module_package] [module_name] [module_desc]

Example:
         web4j new user User 用户            Create Controller,Service,Dao,VO.
         web4j del user User                Delete all the module files.
```

在项目根目录下创建配置文件 `web4j.json`,读取包名:

```json
{
    "pkgName": "com.marvin"
}
```

如果配置了包名,则可以直接使用:  `web4j new User`