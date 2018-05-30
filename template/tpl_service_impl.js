module.exports = `package $pkgName.service.$mpkgName.impl;

import com.github.pagehelper.Page;
import $pkgName.dao.$mpkgName.$mNameDao;
import $pkgName.framework.Result;
import $pkgName.framework.ResultUtil;
import $pkgName.service.$mpkgName.$mNameService;
import $pkgName.vo.input.$mpkgName.InputUpdate$mNameVO;
import $pkgName.vo.input.$mpkgName.InputAdd$mNameVO;
import $pkgName.vo.output.$mpkgName.Output$mNameListVO;
import $pkgName.vo.output.$mpkgName.Output$mNameDetailVO;
import $pkgName.entity.$mpkgName.$mName;
import $pkgName.vo.input.$mpkgName.Input$mNameListVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by web4j on $createAt
 */
@Service
public class $mNameServiceImpl implements $mNameService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private $mNameDao $entityDao;

    @Override
    public Result findById(Integer id) throws GlobalException {
        $mName $entity = $entityDao.selectByKey(id);
        return ResultUtil.success($entity, Output$mNameDetailVO.class);
    }

    @Override
    public Result findByPage(Input$mNameListVO input$mNameListVO) throws GlobalException {
        Page<$mName> page = $entityDao.findByPage(input$mNameListVO);
        return ResultUtil.successPage(page.getResult(), Output$mNameListVO.class, page.getTotal());
    }


    @Override
    public Result deleteById(Integer id) throws GlobalException {
        $entityDao.deleteById(id);
        return ResultUtil.success();
    }

    @Override
    public Result updateById(InputUpdate$mNameVO inputUpdate$mNameVO) throws GlobalException {
        $mName $entity = new $mName();
        BeanUtils.copyProperties(inputUpdate$mNameVO, $entity);
        $entityDao.updateById($entity);
        return ResultUtil.success();
    }

    @Override
    public Result insert(InputAdd$mNameVO inputAdd$mNameVO) throws GlobalException {
        $mName $entity = new $mName();
        BeanUtils.copyProperties(inputAdd$mNameVO, $entity);
        $entityDao.insert($entity);
        return ResultUtil.success();
    }
}
`