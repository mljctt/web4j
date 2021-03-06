module.exports = `package $pkgName.controller.$mpkgName;

import $pkgName.controller.BaseController;
import $pkgName.service.$mpkgName.$mNameService;
import $pkgName.vo.input.$mpkgName.InputUpdate$mNameVO;
import $pkgName.vo.input.$mpkgName.InputAdd$mNameVO;
import $pkgName.framework.GlobalException;
import $pkgName.framework.Result;
import $pkgName.framework.ResultCode;
import $pkgName.vo.input.$mpkgName.Input$mNameListVO;
import $pkgName.vo.output.$mpkgName.Output$mNameListVO;
import $pkgName.vo.output.$mpkgName.Output$mNameDetailVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.perf4j.aop.Profiled;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by web4j on $createAt
 */
@Api(value = "$urlName", description = "$desc")
@RestController
@RequestMapping("/$urlName")
@CrossOrigin
public class $mNameController extends BaseController {

    @Autowired
    private $mNameService $entityService;

    @ApiOperation(value = "查询$desc", response = Output$mNameListVO.class)
    @GetMapping("")
    @Profiled
    public Result list(@ModelAttribute Input$mNameListVO input$mNameListVO) throws GlobalException {
        return $entityService.findByPage(input$mNameListVO);
    }

    @ApiOperation(value = "$desc详情", response = Output$mNameDetailVO.class)
    @GetMapping("/{id}")
    @Profiled
    public Result detail(@PathVariable int id) throws GlobalException {
        return $entityService.findById(id);
    }

    @ApiOperation(value = "删除$desc", response = Result.class)
    @DeleteMapping("/{id}")
    @Profiled
    public Result delete(@PathVariable int id) throws GlobalException {
        return $entityService.deleteById(id);
    }

    @ApiOperation(value = "更新$desc", response = Result.class)
    @PutMapping
    @Profiled
    public Result update(@RequestBody InputUpdate$mNameVO inputUpdate$mNameVO) throws GlobalException {
        if (inputUpdate$mNameVO.getId() == null) {
            throw new GlobalException(ResultCode.ERROR);
        }
        return $entityService.updateById(inputUpdate$mNameVO);
    }

    @ApiOperation(value = "新增$desc", response = Result.class)
    @PostMapping
    @Profiled
    public Result insert(@RequestBody InputAdd$mNameVO inputAdd$mNameVO) throws GlobalException {
        return $entityService.insert(inputAdd$mNameVO);
    }

}
`