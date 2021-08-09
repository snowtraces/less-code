// let config = {
//     scope: {
//         SERVICE: 'service',
//         RESOURCE: 'criticalvalue',
//     },
//     base_package: 'com.winning.execution.mdm',
//     annotation: `/**
//  *
//  * @author CHENG
//  * @date ${new Date().toLocaleDateString()}
//  * @version 1.0
//  */`
// }


let config = {
    scope: {
        SERVICE: 'domain',
        RESOURCE: 'criticalvalue',
    },
    base_package: 'com.winning.clinical.mdm.shiftchange',
    path: './js/template/execution_bmts_report/',
    needs: ['deleteInputDto',
    'domainService',
    'domainServiceImpl',
    'dto',
    'inputDto',
    'outputDo',
    'jpa',
    'po',
    'inputDo',
    'queryInputDto',
    'queryInputVo',
    'repository',
    'repositoryImpl',
    'rpcService',
    'rpcServiceImpl',
    'service',
    'serviceImpl',
    'vo']

}

{
    let keys = Object.keys(config)
    keys.forEach(key => {
        window[key] = config[key]
    });
    annotation = `/**
 *
 * @author CHENG
 * @date ${new Date().toLocaleDateString()}
 * @version 1.0
 */`
}