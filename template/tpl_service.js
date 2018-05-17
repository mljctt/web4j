module.exports = `package $pkgName.service.$mpkgName;

import $pkgName.framework.Result;
import $pkgName.vo.input.$mpkgName.InputUpdate$mNameVO;
import $pkgName.vo.input.$mpkgName.InputAdd$mNameVO;
import $pkgName.vo.input.$mpkgName.Input$mNameListVO;

/**
 * Created by web4j on $createAt
 */
public interface $mNameService {

    Result findById(Integer id);

    Result findByPage(Input$mNameListVO input$mNameListVO);

    Result deleteById(Integer id);

    Result updateById(InputUpdate$mNameVO inputUpdate$mNameVO);

    Result insert(InputAdd$mNameVO inputAdd$mNameVO);
}
`