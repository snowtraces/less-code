const ge_queryRepositoryImpl = (table) => {
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

    let template = `package ${base_package}.${scope.SERVICE}.repository.impl;

import com.winning.base.akso.base.WinBaseQueryRequest;
import com.winning.base.akso.common.page.WinPagedList;
import ${base_package}.common.constants.MdmConst;
import ${base_package}.common.util.QueryUtil;
import ${base_package}.dto.${table.lowerName}.Query${table.camelNameUpper}Input;
import ${base_package}.entity.${table.lowerName}.${table.camelNameUpper}PO;
import ${base_package}.repository.${table.camelNameUpper}QueryRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

${annotation}
@Repository
public class ${table.camelNameUpper}QueryRepositoryImpl implements ${table.camelNameUpper}QueryRepository {

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public WinPagedList<${table.camelNameUpper}PO> queryByExample(Query${table.camelNameUpper}Input inputDO) {
        //查询sql
        String sql = " select DISTINCT a   ";

        //拼接条件sql
        Map<String, Object> conditions = new HashMap<>(16);
        StringBuilder sqlQuery = new StringBuilder();
        sqlQuery.append(" from ${table.camelNameUpper}PO a  ");
        sqlQuery.append(" where a.isDel = :isDel and a.hospitalSOID in :hospitalSOID ");
        conditions.put("hospitalSOID", Arrays.asList(inputDO.getSoid()));
        conditions.put("isDel", MdmConst.NOT_IS_DEL);
    
${queryConditionText}

        sqlQuery.append(" order by a.seqNo ");

        WinBaseQueryRequest request = new WinBaseQueryRequest();
        request.setPageNo(inputDO.getPageNo());
        request.setQueryPageType(inputDO.getQueryPageType());
        request.setPageSize(inputDO.getPageSize());
        return QueryUtil.pageQuery(${table.camelNameUpper}PO.class, entityManager, conditions, sqlQuery.toString(), sql, request);
    }
}
    `
    return template
}