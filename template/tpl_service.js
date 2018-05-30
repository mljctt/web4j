module.exports = `package $pkgName.service.$mpkgName;

import $pkgName.framework.Result;
import $pkgName.vo.input.$mpkgName.InputUpdate$mNameVO;
import $pkgName.vo.input.$mpkgName.InputAdd$mNameVO;
import $pkgName.vo.input.$mpkgName.Input$mNameListVO;

/**
 * Created by web4j on $createAt
 */
public interface $mNameService {

    Result findById(Integer id) throws GlobalException;

    Result findByPage(Input$mNameListVO input$mNameListVO) throws GlobalException;

    Result deleteById(Integer id) throws GlobalException;

    Result updateById(InputUpdate$mNameVO inputUpdate$mNameVO) throws GlobalException;

    Result insert(InputAdd$mNameVO inputAdd$mNameVO) throws GlobalException;
}
`