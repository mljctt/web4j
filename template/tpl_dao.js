module.exports = `package $pkgName.dao.$mpkgName;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import $pkgName.dao.impl.BaseDao;
import $pkgName.entity.$mpkgName.$mName;
import $pkgName.vo.input.$mpkgName.Input$mNameListVO;
import org.springframework.stereotype.Repository;
import tk.mybatis.mapper.entity.Example;


/**
 * Created by web4j on $createAt
 */
@Repository
public class $mNameDao extends BaseDao<$mName> {

    public $mName findById(Integer id) {
        return selectByKey(id);
    }

    public Page<$mName> findByPage(Input$mNameListVO input$mNameListVO) {
        Example example = new Example($mName.class);
        example.setOrderByClause("id desc");
        //        Example.Criteria criteria = example.createCriteria();
        //分页查询
        PageHelper.startPage(input$mNameListVO.getPageNo(), input$mNameListVO.getPageSize());
        return (Page<$mName>) selectByExample(example);
    }

    public void deleteById(Integer id) {
        deleteByKey(id);
    }

    public void updateById($mName $entity) {
        updateByKeyNotNull($entity);
    }

    public void insert($mName $entity) {
        saveNotNull($entity);
    }
}
`