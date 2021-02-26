const ge_queryRepositoryImpl = (table) => {
    let base_package = 'com.winning.execution.mdm.service'
    let package = table.code.replaceAll('_', '').toLowerCase()
    
    // 表名
    let camelName = $.toCamelCase(table.code)
    let firstUpperCamelName = $.firstUpperCase(camelName)

    // 主键
    let pk = table.primaryKey
    let pkCamelName = $.toCamelCase(pk)
    let pkFirstUpperCamelName = $.firstUpperCase(pkCamelName)

    let queryConditionText = table.attrs
    .filter(attr => attr.code !== "SEQ_NO")
    .map(attr => {
        return `        // ${attr.name}
        ${attr.javaType} ${$.toCamelCase(attr.code)} = inputDO.get${$.firstUpperCase($.toCamelCase(attr.code))}();
        if (${$.toCamelCase(attr.code)} != null) {
            sqlQuery.append(" and a.${$.toCamelCase(attr.code)} = :${$.toCamelCase(attr.code)} ");
            conditions.put("${$.toCamelCase(attr.code)}", ${$.toCamelCase(attr.code)});
        }
   `
    }).join('\n')

    let template = `package ${base_package}.repository.impl;

import com.winning.base.akso.base.WinBaseQueryRequest;
import com.winning.base.akso.common.page.WinPagedList;
import com.winning.execution.mdm.common.constants.MdmConst;
import com.winning.execution.mdm.common.util.QueryUtil;
import ${base_package}.dto.${package}.Query${firstUpperCamelName}Input;
import ${base_package}.entity.${package}.${firstUpperCamelName}PO;
import ${base_package}.repository.${firstUpperCamelName}QueryRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * @author: CHENG
 * @date: ${new Date().toLocaleDateString()}
 * @version 1.0
 */
@Repository
public class ${firstUpperCamelName}QueryRepositoryImpl implements ${firstUpperCamelName}QueryRepository {

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public WinPagedList<${firstUpperCamelName}PO> queryByExample(Query${firstUpperCamelName}Input inputDO) {
        //查询sql
        String sql = " select DISTINCT a   ";

        //拼接条件sql
        Map<String, Object> conditions = new HashMap<>(16);
        StringBuilder sqlQuery = new StringBuilder();
        sqlQuery.append(" from ${firstUpperCamelName}PO a  ");
        sqlQuery.append(" where a.isDel = :isDel and a.hospitalSOID in :hospitalSOID ");
        conditions.put("hospitalSOID", Arrays.asList(inputDO.getSoid()));
        conditions.put("isDel", MdmConst.NOT_IS_DEL);
    
${queryConditionText}

        sqlQuery.append(" order by a.seqNo ");

        WinBaseQueryRequest request = new WinBaseQueryRequest();
        request.setPageNo(inputDO.getPageNo());
        request.setQueryPageType(inputDO.getQueryPageType());
        request.setPageSize(inputDO.getPageSize());
        return QueryUtil.pageQuery(${firstUpperCamelName}PO.class, entityManager, conditions, sqlQuery.toString(), sql, request);
    }
}
    `
    return template
}